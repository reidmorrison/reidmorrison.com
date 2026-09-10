/* The Gemfile.lock drop zone, and the advisories it matches.
 *
 * Two halves, and they fail for different reasons. The first is the lockfile
 * grammar and RubyGems' version rules, which are fixed and are tested against
 * hand-written fixtures. The second is the shipped data/advisories.json, which
 * changes every time script/advisories.mjs is re-run, so nothing here names an
 * advisory, a gem or a version out of it: the cases derive what they need from
 * the file itself and keep holding after a refresh.
 *
 * Why this is worth testing at all: a version comparison that is subtly wrong
 * shows a client a vulnerability they patched last year, or hides one they did
 * not. Both are worse than showing nothing, on a page whose whole business is
 * being right in front of an auditor.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { eolData, cmp, utc, ROOT } from "./helpers/data.mjs";
import { loadCalculator, blockTitled, hasBlockTitled, text } from "./helpers/calculator.mjs";

const data = eolData();
const NOW = utc(data.verified);
const load = () => loadCalculator(NOW);

const db = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "advisories.json"), "utf8"));

/* A lockfile with whatever specs are asked for, in the shape bundler writes:
   sections in column 1, resolved specs at four spaces, their dependencies at
   six. The dependency lines matter as much as the specs, because telling the
   two apart is the whole job of the parser. */
function lockfile(specs, { ruby = null, extra = "" } = {}) {
  const body = specs.map(([n, v]) => `    ${n} (${v})\n      some-dependency (>= 1.0)`).join("\n");
  return (
    "GEM\n  remote: https://rubygems.org/\n  specs:\n" +
    body +
    "\n\nPLATFORMS\n  ruby\n\nDEPENDENCIES\n  " +
    specs.map(([n]) => n).join("\n  ") +
    "\n" +
    extra +
    (ruby ? `\nRUBY VERSION\n   ruby ${ruby}\n` : "") +
    "\nBUNDLED WITH\n   2.5.6\n"
  );
}

/* ---------------------------------------------------------------- parsing */

test("reads resolved specs and ignores the dependency lines under them", () => {
  const { parseLock } = load();
  const lock = parseLock(lockfile([["rails", "7.0.10"], ["puma", "6.4.2"]]));

  assert.deepEqual(
    lock.gems.map((g) => `${g.name} ${g.version}`).sort(),
    ["puma 6.4.2", "rails 7.0.10"]
  );
  /* "some-dependency" sits at six spaces under every spec. A parser that took
     it would report a constraint as an installed version. */
  assert.equal(lock.gems.some((g) => g.name === "some-dependency"), false);
});

test("ignores CHECKSUMS, which look like specs and are not", () => {
  const { parseLock } = load();
  const checksums = "\nCHECKSUMS\n  rails (7.0.10) sha256=abc123\n  puma (6.4.2) sha256=def456\n";
  const lock = parseLock(lockfile([["rails", "7.0.10"]], { extra: checksums }));

  assert.equal(lock.gems.length, 1);
});

test("strips the platform suffix and folds the duplicates it creates", () => {
  const { parseLock } = load();
  const lock = parseLock(
    lockfile([
      ["ffi", "1.17.4"],
      ["ffi", "1.17.4-arm64-darwin"],
      ["ffi", "1.17.4-x86_64-linux-gnu"],
      ["nokogiri", "1.16.0-java"],
    ])
  );

  /* One gem version, however many builds of it the lockfile carries: an
     advisory names a version, not a build. */
  assert.deepEqual(
    lock.gems.map((g) => `${g.name} ${g.version}`).sort(),
    ["ffi 1.17.4", "nokogiri 1.16.0"]
  );
});

test("a prerelease is not mistaken for a platform suffix", () => {
  const { parseLock } = load();
  /* Bundler writes prereleases with a dot, "7.1.0.beta1", so stripping at the
     dash cannot reach one. The case is here because the day that changes, this
     is what breaks. */
  const lock = parseLock(lockfile([["rails", "7.1.0.beta1"]]));

  assert.equal(lock.gems[0].version, "7.1.0.beta1");
});

test("RUBY VERSION is read when bundler wrote one, and is absent when it did not", () => {
  const { parseLock } = load();

  assert.equal(parseLock(lockfile([["rails", "7.0.10"]], { ruby: "3.1.4p223" })).ruby, "3.1.4p223");
  /* The common case. Bundler only writes the section when the Gemfile pins a
     Ruby, so a lockfile usually cannot answer the second question this page
     asks, and the page has to say so rather than guess. */
  assert.equal(parseLock(lockfile([["rails", "7.0.10"]])).ruby, null);
});

test("a lockfile version resolves to the series this page lists, however long", async () => {
  const page = load();

  /* Derived, and it covers the case that broke: nearly every series name is
     two segments, but the data file carries at least one that is not, and
     slicing two segments off "1.9.3p551" yields "1.9", which is listed
     nowhere. Every series must round-trip from a realistic release string. */
  for (const rec of data.ruby) {
    const release = `${rec.v}.4p551`;
    await page.drop(lockfile([["rails", `${data.target_rails}.0`]], { ruby: release }));
    assert.equal(
      page.selected().ruby,
      rec.v,
      `${release} should select Ruby ${rec.v}`
    );
  }
});

test("a version from a series this page does not list leaves the selection alone", async () => {
  const page = load();
  const before = page.selected();

  await page.drop(lockfile([["rails", "99.9.0"]], { ruby: "99.9.0" }));

  assert.deepEqual(page.selected(), before, "an unlisted series must not move the dropdowns");
  /* And it says what the file held, so the disagreement is visible rather
     than silent. */
  assert.match(text(page.dropStatus()), /the file has 99\.9\.0/);
});

test("the notice follows the dropdowns after the file has been read", async () => {
  const page = load();
  const rails = data.rails.filter((r) => r.v !== data.target_rails).pop();
  /* A lockfile with no RUBY VERSION, which is the common case: the notice
     then names whichever Ruby is selected. */
  await page.drop(lockfile([["rails", `${rails.v}.3`]]));

  const first = page.selected().ruby;
  assert.match(text(page.dropStatus()), new RegExp(`using Ruby ${first} as selected`));

  const next = data.ruby.find((u) => u.v !== first);
  page.check(rails.v, next.v);

  /* The bug this guards: the notice was written once when the file landed and
     never revisited, so it went on naming the Ruby the visitor started on
     while the finding, the letterhead and the printed link all showed the new
     one. A confident wrong statement on a document headed for an auditor. */
  assert.match(text(page.dropStatus()), new RegExp(`using Ruby ${next.v} as selected`));
  assert.equal(
    text(page.dropStatus()).includes(`using Ruby ${first} as selected`),
    false,
    "the superseded Ruby must be gone from the notice"
  );
});

test("changing away from a version the file settled says so", async () => {
  const page = load();
  const rails = data.rails.filter((r) => r.v !== data.target_rails).pop();
  const ruby = data.ruby.find((u) => cmp(u.v, rails.min) >= 0 && cmp(u.v, rails.max) <= 0);

  await page.drop(lockfile([["rails", `${rails.v}.3`]], { ruby: `${ruby.v}.4` }));
  assert.match(text(page.dropStatus()), /from the file/);

  const other = data.rails.find((r) => r.v !== rails.v);
  page.check(other.v, ruby.v);

  /* Not "Rails x from the file" any more, because it is not. */
  assert.match(text(page.dropStatus()), new RegExp(`Using Rails ${other.v} as selected`));
  assert.match(text(page.dropStatus()), new RegExp(`the file has ${rails.v}\\.3`));
});

test("Back also brings the notice with it", async () => {
  const page = load();
  const rails = data.rails.filter((r) => r.v !== data.target_rails).pop();
  await page.drop(lockfile([["rails", `${rails.v}.3`]]));
  const first = page.selected().ruby;

  const next = data.ruby.find((u) => u.v !== first);
  page.check(rails.v, next.v);
  page.back();

  /* popstate calls render() directly rather than going through the change
     listener, so a notice hung off the listener would be stale here. */
  assert.match(text(page.dropStatus()), new RegExp(`using Ruby ${first} as selected`));
});

test("gems from git and path are counted, never version-matched", () => {
  const { parseLock } = load();
  const git =
    "\nGIT\n  remote: https://github.com/example/thing.git\n  revision: 0ff1ce\n  specs:\n    thing (1.2.3)\n" +
    "\nPATH\n  remote: engines/billing\n  specs:\n    billing (0.1.0)\n";
  const lock = parseLock(lockfile([["rails", "7.0.10"]], { extra: git }));

  /* The version beside a git revision is whatever that gemspec claimed. It
     says nothing about the commit checked out, so reporting it clean would be
     a guess dressed as a finding. */
  assert.deepEqual(lock.gems.map((g) => g.name), ["rails"]);
  assert.equal(lock.external, 2);
});

test("reads a lockfile with Windows line endings", () => {
  const { parseLock } = load();
  const lock = parseLock(lockfile([["rails", "7.0.10"]], { ruby: "3.1.4" }).replace(/\n/g, "\r\n"));

  assert.equal(lock.gems.length, 1);
  assert.equal(lock.ruby, "3.1.4");
});

/* ------------------------------------------------- RubyGems version rules */

test("versions compare by segment, not as strings", () => {
  const { vcmp } = load();

  assert.equal(vcmp("1.10.0", "1.9.0") > 0, true, "1.10 is after 1.9");
  assert.equal(vcmp("7.0.10", "7.0.9") > 0, true);
  assert.equal(vcmp("2.0.0", "10.0.0") < 0, true);
});

test("a missing segment counts as zero", () => {
  const { vcmp } = load();

  assert.equal(vcmp("7.0", "7.0.0"), 0);
  assert.equal(vcmp("7.0.1", "7.0"), 1);
});

test("a prerelease sorts before the release it precedes", () => {
  const { vcmp } = load();

  /* Gem::Version puts an alphabetic segment before a numeric one, which is the
     one rule that is not intuitive and the one that decides whether somebody
     running a beta is told they are patched. */
  assert.equal(vcmp("1.0.0.beta", "1.0.0") < 0, true);
  assert.equal(vcmp("1.0.0.beta1", "1.0.0.beta2") < 0, true);
  assert.equal(vcmp("1.0.0.rc1", "1.0.0.beta1") > 0, true);
});

test("the pessimistic operator is bounded where Gem::Version#bump puts it", () => {
  const { meets } = load();

  /* "~> 6.1.7.3" is ">= 6.1.7.3, < 6.1.8": it admits another patch release and
     refuses the next minor. Getting the bound wrong by one segment is the
     classic way to mark a patched application vulnerable. */
  assert.equal(meets("6.1.7.3", "~> 6.1.7.3"), true);
  assert.equal(meets("6.1.7.9", "~> 6.1.7.3"), true);
  assert.equal(meets("6.1.7.2", "~> 6.1.7.3"), false);
  assert.equal(meets("6.1.8", "~> 6.1.7.3"), false);

  assert.equal(meets("6.2.0", "~> 6.1"), true);
  assert.equal(meets("7.0.0", "~> 6.1"), false);
});

test("a comma inside one requirement is an AND", () => {
  const { meets } = load();

  /* 142 entries in the shipped database look like this. Split into two
     entries they would be ORed, and every version at or above 7.0.8.5 would
     read as patched, including the 7.1 series the advisory does not cover. */
  const req = "~> 7.0.8, >= 7.0.8.5";
  assert.equal(meets("7.0.8.5", req), true);
  assert.equal(meets("7.0.8.4", req), false);
  assert.equal(meets("7.1.0", req), false);
});

test("every comparison operator the database uses is understood", () => {
  const { meets } = load();

  assert.equal(meets("2.0.0", ">= 2.0.0"), true);
  assert.equal(meets("2.0.0", "> 2.0.0"), false);
  assert.equal(meets("2.0.0", "<= 2.0.0"), true);
  assert.equal(meets("2.0.0", "< 2.0.0"), false);
  assert.equal(meets("2.0.0", "= 2.0.0"), true);
  assert.equal(meets("2.0.0", "2.0.0"), true, "a bare version means equality");
});

/* -------------------------------------------------- the vulnerability rule */

test("a patched or unaffected version is not reported", () => {
  const { affected } = load();
  const advisory = { patched: [">= 7.0.4.3"], unaffected: ["< 5.0.0"] };

  assert.equal(affected("7.0.4.3", advisory), false, "patched");
  assert.equal(affected("4.2.11", advisory), false, "never affected");
  assert.equal(affected("7.0.4.2", advisory), true, "between the two");
});

test("an advisory with no published fix matches every version", () => {
  const { affected } = load();
  const advisory = { patched: [], unaffected: [] };

  /* 99 advisories in the shipped database are in this state. Treating an empty
     patched list as "nothing is affected" would silently drop all of them,
     and they are the ones a client can do least about. */
  assert.equal(affected("1.0.0", advisory), true);
  assert.equal(affected("99.0.0", advisory), true);
});

/* ------------------------------------------- against the shipped database */

test("the shipped database has the shape the page reads", () => {
  assert.equal(typeof db.source, "string");
  assert.equal(typeof db.commit, "string");
  assert.match(db.generated, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(db.advisories > 0, true);
  assert.equal(Object.keys(db.gems).length > 0, true);

  const rows = Object.values(db.gems).flat();
  assert.equal(rows.length, db.advisories);
  for (const a of rows) {
    assert.equal(typeof a.id, "string");
    assert.equal(typeof a.title, "string");
    assert.equal(Array.isArray(a.patched), true);
    assert.equal(Array.isArray(a.unaffected), true);
  }
});

test("every requirement string in the shipped database parses", () => {
  const { meets } = load();

  /* The property that holds for all of them without naming any: the version
     named inside a lower-bound requirement satisfies that requirement. If an
     operator or a spacing the parser does not understand ever lands in the
     database, `meets` returns false here and this fails on the day of the
     refresh rather than in front of a client. */
  let checked = 0;
  for (const list of Object.values(db.gems)) {
    for (const a of list) {
      for (const req of [...a.patched, ...a.unaffected]) {
        for (const part of req.split(",")) {
          const m = part.trim().match(/^(>=|~>|=)?\s*(\S+)$/);
          if (!m) continue;
          assert.equal(meets(m[2], part.trim()), true, `${part.trim()} should admit ${m[2]}`);
          checked++;
        }
      }
    }
  }
  assert.equal(checked > 1000, true, `expected to have checked a lot of requirements, checked ${checked}`);
});

/* ------------------------------------------------------ through the page */

/* A gem and a version the shipped database must report, derived rather than
   named: an advisory whose only statement is a lower bound has no unaffected
   range, so every version below that bound is affected, and "0" is below every
   bound the database carries. */
function certainlyAffected() {
  for (const [gem, list] of Object.entries(db.gems)) {
    for (const a of list) {
      if (a.unaffected.length === 0 && a.patched.length === 1 && /^>=\s*\S+$/.test(a.patched[0])) {
        return { gem, advisory: a };
      }
    }
  }
  throw new Error("no advisory in data/advisories.json states a single lower bound");
}

test("a dropped lockfile reports the advisories naming its pinned versions", async () => {
  const page = load();
  const { gem, advisory } = certainlyAffected();

  const html = await page.drop(lockfile([[gem, "0"], ["rails", "7.0.10"]]));
  const block = blockTitled(html, "Published advisories in your dependencies");

  assert.notEqual(block, undefined, "the advisories block should render");
  assert.match(text(block), new RegExp(gem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(block, new RegExp(advisory.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("a lockfile no advisory names says so, and says what that does not mean", async () => {
  const page = load();

  /* A gem name the database cannot hold, so the result is clean by
     construction rather than by luck. */
  const html = await page.drop(lockfile([["not-a-real-gem-a1b2c3", "1.0.0"]]));
  const block = blockTitled(html, "Your dependencies");

  assert.match(text(block), /No published advisory names any of/);
  assert.match(text(block), /not a clean bill of health/i);
});

test("the lockfile sets the Rails dropdown and says which versions it settled", async () => {
  const page = load();
  /* Derived: the newest series the data file lists that is not the target, so
     the assertion is that the file moved the selection, whatever the data
     says today. */
  const series = data.rails.filter((r) => r.v !== data.target_rails).pop();

  await page.drop(lockfile([["rails", `${series.v}.3`]], { ruby: null }));

  assert.equal(page.selected().rails, series.v);
  assert.match(text(page.dropStatus()), new RegExp(`Rails ${series.v}\\.3`));
  /* No RUBY VERSION section, so the page must say which Ruby it is using and
     must NOT read as an instruction to go and fix something: nothing is
     wrong, the file simply does not carry one. */
  assert.match(text(page.dropStatus()), /No Ruby version detected/);
  assert.match(text(page.dropStatus()), new RegExp(`using Ruby ${page.selected().ruby} as selected`));
});

test("a lockfile carrying a Ruby sets both dropdowns", async () => {
  const page = load();
  const rails = data.rails.filter((r) => r.v !== data.target_rails).pop();
  const ruby = data.ruby.find((u) => cmp(u.v, rails.min) >= 0 && cmp(u.v, rails.max) <= 0);

  await page.drop(lockfile([["rails", `${rails.v}.3`]], { ruby: `${ruby.v}.4p223` }));

  assert.deepEqual(page.selected(), { rails: rails.v, ruby: ruby.v });
});

test("a file that is not a lockfile is refused and changes nothing", async () => {
  const page = load();
  const before = page.render(data.target_rails, data.target_ruby);

  await page.drop("just some text\nand another line\n", "notes.txt");

  assert.match(text(page.dropStatus()), /does not read as a/);
  assert.equal(
    page.render(data.target_rails, data.target_ruby),
    before,
    "a refused file must not leave a dependency block behind"
  );
});

test("an oversized file is never read", async () => {
  const page = load();

  await page.dropFile({ name: "huge.lock", size: 9e6, text: lockfile([["rails", "7.0.10"]]) });

  assert.match(text(page.dropStatus()), /too large/);
  assert.equal(hasBlockTitled(page.render(data.target_rails, data.target_ruby), "Your dependencies"), false);
});

test("the file input path reads the file and renders the finding", async () => {
  const page = load();
  const { gem } = certainlyAffected();

  /* The same journey as drop(), but through the change handler and FileReader,
     which is what a visitor who clicks rather than drags actually runs. */
  const html = await page.dropFile({
    name: "Gemfile.lock",
    size: 400,
    text: lockfile([[gem, "0"], ["rails", "7.0.10"]]),
  });

  assert.match(text(page.dropStatus()), /2 gems read/);
  assert.equal(hasBlockTitled(html, "Published advisories in your dependencies"), true);
});

test("a visitor who drops nothing sees exactly the page that shipped before", () => {
  const page = load();

  /* The regression guard for the whole feature. The drop zone is additive: it
     may not change a single byte of the finding for somebody who only picks
     two versions from the dropdowns. */
  const html = page.render(data.target_rails, data.target_ruby);

  assert.equal(hasBlockTitled(html, "Your dependencies"), false);
  assert.equal(hasBlockTitled(html, "Published advisories in your dependencies"), false);
});

test("the finding is ordered for the buyer, not the engineer", async () => {
  const page = load();
  const { gem } = certainlyAffected();

  /* A structurally trapped starting point, derived: the oldest series whose
     Ruby ceiling sits below what the newest series requires, paired with a
     Ruby it actually runs. That produces all four blocks at once, which is
     what makes their order assertable. */
  const floor = data.rails.find((r) => r.v === data.target_rails).min;
  const rails = data.rails.find(
    (r) => cmp(r.max, floor) < 0 && data.ruby.some((u) => cmp(u.v, r.min) >= 0 && cmp(u.v, r.max) <= 0)
  );
  const ruby = data.ruby.find((u) => cmp(u.v, rails.min) >= 0 && cmp(u.v, rails.max) <= 0);

  /* Dropped for the advisories, then rendered at the trapped pair directly.
     Routing the Ruby through the lockfile as well would test RUBY VERSION
     parsing, which has its own cases above, and it is the block ORDER that is
     under test here. */
  await page.drop(lockfile([[gem, "0"], ["rails", `${rails.v}.3`]]));
  const html = page.render(rails.v, ruby.v);

  const at = (title) => {
    const i = html.indexOf(title);
    assert.notEqual(i, -1, `${title} should be on the page`);
    return i;
  };

  /* Decided 2026-09-10, and the reasoning is why this is pinned rather than
     left to whoever edits render() next. A CISO stops at the first concrete
     thing. Named CVEs against versions this application pins are evidence out
     of the reader's own repository; "structurally trapped" and "six version
     hops" are characterisations of a situation. So the evidence leads, the
     explanation and the remediation follow, and the control language is last
     because it is for the memo rather than for the decision. */
  assert.equal(
    at("Published advisories in your dependencies") < at("Structurally trapped"),
    true,
    "advisories must come before the trap"
  );
  assert.equal(
    at("Structurally trapped") < at("Required upgrade path"),
    true,
    "the trap must come before the upgrade path"
  );
  assert.equal(
    at("Required upgrade path") < at("Controls implicated"),
    true,
    "the upgrade path must come before the controls"
  );

  /* And the two version records still lead, because the days-unpatched
     counters are the headline the whole page is built on. */
  assert.equal(
    at(`Rails ${rails.v}<`) < at("Published advisories in your dependencies"),
    true,
    "the version records must still lead"
  );
});
