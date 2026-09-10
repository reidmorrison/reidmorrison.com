// Builds data/advisories.json, the published advisory database /eol/ matches a
// dropped Gemfile.lock against.
//
//   node script/advisories.mjs        # from the repository root
//
// No dependencies. It shallow-clones rubysec/ruby-advisory-db, the database
// bundler-audit reads, and reduces it to the fields the page needs. Commit the
// output: GitHub Pages builds the site, not this script.
//
// WHY THE DATA IS BAKED IN RATHER THAN FETCHED FROM AN API
//
// The obvious alternative is to look each gem up on rubygems.org from the
// browser. It was measured and rejected on 2026-09-09:
//
//   - There is no bulk endpoint. The Dependency API is gone (it answers 404
//     with a deprecation notice) and the compact index sends no CORS header,
//     so a browser cannot read it. That leaves one request per gem, and a real
//     Rails lockfile holds 150 to 450 of them.
//   - The documented limit is 10 requests per second per client IP, which puts
//     a large lockfile at 15 to 45 seconds of spinner.
//   - It would ship the visitor's dependency inventory to a third party from
//     the page that sells this practice's security posture, and it would break
//     the claim on /privacy.html that this page computes everything locally.
//   - RubyGems does not answer the question anyway. It knows latest versions
//     and release dates, not which advisory names a pinned version.
//
// The whole database reduces to about 200KB, which is 50KB over the wire, so
// there is nothing to gain by asking the network at page load either. It is
// fetched from this origin on first drop and never before.
//
// WHAT IS DELIBERATELY LEFT OUT
//
// `description`, which is several paragraphs per advisory and would multiply
// the file size for text the page does not show. The `url` on each row is the
// upstream advisory, which is where a reader who wants the detail should go.
//
// RE-RUN IT ON A SCHEDULE. An advisory database is stale the day after it is
// built, and the page prints the date it was generated, so a stale file is
// visible rather than silent.

import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, appendFileSync, existsSync, rmSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "data", "advisories.json");
const SOURCE = "https://github.com/rubysec/ruby-advisory-db";

const work = mkdtempSync(join(tmpdir(), "advdb-"));

try {
  process.stderr.write(`cloning ${SOURCE}\n`);
  execFileSync("git", ["clone", "--depth", "1", "--quiet", SOURCE, work], { stdio: ["ignore", "ignore", "inherit"] });

  const commit = execFileSync("git", ["-C", work, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();

  // Parsed by Ruby rather than by a YAML library, for the same reason
  // test/helpers/data.mjs does it: Psych is the parser the Ruby ecosystem
  // wrote these files against, and Ruby is present by definition here.
  //
  // A requirement string can hold more than one constraint ("~> 7.0.8, >= 7.0.8.5",
  // 142 of them at the time of writing), so they are passed through verbatim
  // and split in the browser. Do not "tidy" them into single constraints.
  const ruby = `
    require "yaml"
    require "json"
    # Explicitly, and not incidentally. An advisory's \`date:\` parses to a Date,
    # so it has to be in permitted_classes. Psych pulls \`date\` in on some Rubies
    # and not others: this passed on 3.4 for a week and failed the first time
    # the scheduled refresh ran it on 3.3, with "uninitialized constant Date".
    require "date"
    gems = Hash.new { |h, k| h[k] = [] }
    total = 0
    Dir.glob(File.join(ARGV[0], "gems", "*", "*.yml")).sort.each do |file|
      a = YAML.safe_load(File.read(file), permitted_classes: [Date])
      next unless a["gem"]
      total += 1
      gems[a["gem"]] << {
        "id"         => a["cve"] ? "CVE-#{a["cve"]}" : a["ghsa"] ? "GHSA-#{a["ghsa"]}" : File.basename(file, ".yml"),
        "title"      => a["title"].to_s.strip.gsub(/\\s+/, " "),
        "date"       => a["date"].to_s,
        "cvss"       => a["cvss_v4"] || a["cvss_v3"] || a["cvss_v2"],
        "url"        => a["url"],
        "patched"    => a["patched_versions"] || [],
        "unaffected" => a["unaffected_versions"] || []
      }
    end
    gems.each_value { |list| list.sort_by! { |x| [-(x["cvss"] || 0), x["date"]] } }
    print JSON.generate("total" => total, "gems" => gems.sort.to_h)
  `;

  const parsed = JSON.parse(execFileSync("ruby", ["-e", ruby, work], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));

  const db = {
    source: SOURCE,
    commit,
    generated: new Date().toISOString().slice(0, 10),
    advisories: parsed.total,
    gems: parsed.gems,
  };

  // WHAT COUNTS AS A CHANGE, and why it is not "the file differs".
  //
  // `generated` is today and `commit` is whatever upstream last pushed, so the
  // file differs on every single run even when not one advisory moved. A
  // scheduled refresh that opened a pull request on that basis would ask for a
  // review every week to approve a new date, and the reviews that mattered
  // would be lost among them.
  //
  // So the comparison is on the advisories alone. When they are identical the
  // file is left exactly as it was, which also leaves the date the page prints
  // saying when the data was last actually rebuilt.
  const before = existsSync(out) ? JSON.parse(readFileSync(out, "utf8")) : null;
  const changed = JSON.stringify(before?.gems) !== JSON.stringify(db.gems);

  const report = [];
  if (!changed) {
    report.push(`No advisory changed. \`data/advisories.json\` left as it was, built ${before.generated}.`);
  } else {
    writeFileSync(out, JSON.stringify(db));

    const key = (o) => Object.entries(o?.gems ?? {}).flatMap(([g, l]) => l.map((a) => [`${g} ${a.id}`, { gem: g, ...a }]));
    const wasMap = new Map(key(before));
    const nowMap = new Map(key(db));
    const added = [...nowMap].filter(([k]) => !wasMap.has(k)).map(([, a]) => a);
    const removed = [...wasMap].filter(([k]) => !nowMap.has(k)).map(([, a]) => a);

    const list = (rows, cap = 30) =>
      rows
        .sort((p, q) => (q.cvss || -1) - (p.cvss || -1) || p.gem.localeCompare(q.gem))
        .slice(0, cap)
        .map((a) => `- \`${a.gem}\` ${a.cvss == null ? "" : `**${a.cvss.toFixed(1)}** `}[${a.id}](${a.url}) ${a.title}`)
        .concat(rows.length > cap ? [`- ...and ${rows.length - cap} more`] : []);

    report.push(
      before
        ? `${db.advisories.toLocaleString()} advisories across ${Object.keys(db.gems).length} gems, ` +
          `up from ${before.advisories.toLocaleString()} across ${Object.keys(before.gems).length}.`
        : `${db.advisories.toLocaleString()} advisories across ${Object.keys(db.gems).length} gems.`
    );
    if (added.length) report.push("", `### ${added.length} new`, ...list(added));
    if (removed.length) report.push("", `### ${removed.length} withdrawn or amended`, ...list(removed));
  }

  // stdout is the report, for a pull request body. Diagnostics go to stderr so
  // one can be captured without the other.
  process.stdout.write(report.join("\n") + "\n");

  const bytes = statSync(out).size;
  const gz = gzipSync(readFileSync(out), { level: 9 }).length;
  process.stderr.write(
    `${changed ? "wrote" : "left"} data/advisories.json\n` +
      `  ${db.advisories} advisories across ${Object.keys(db.gems).length} gems\n` +
      `  ${(bytes / 1024).toFixed(0)}KB raw, ${(gz / 1024).toFixed(0)}KB gzipped\n` +
      `  upstream ${commit.slice(0, 12)}\n`
  );

  // For the scheduled refresh in .github/workflows/advisories.yml.
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
