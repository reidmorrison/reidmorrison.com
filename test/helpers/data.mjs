/* The source of truth for every expectation in this suite.
 *
 * Nothing in test/ may restate a date, a version, a ceiling or a control
 * number: they all come from _data/eol.yml, read here. A test that hardcodes
 * one would keep passing after the data changed, which is the one failure
 * these tests exist to prevent.
 *
 * Parsed by Ruby rather than by a YAML library, because Jekyll parses it with
 * Psych and this suite has to see exactly what the site sees. Ruby is present
 * by definition: it is what builds the site.
 */
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
export const DATA_FILE = path.join(ROOT, "_data", "eol.yml");

let cached;

export function eolData() {
  if (cached) return cached;
  const json = execFileSync(
    "ruby",
    ["-ryaml", "-rjson", "-e", "print JSON.generate(YAML.safe_load_file(ARGV[0], permitted_classes: [Date]))", DATA_FILE],
    { encoding: "utf8" }
  );
  cached = JSON.parse(json);
  return cached;
}

/* The calculator's own version comparison, restated here so expectations can
   be ordered without asking the code under test to order them. */
export function cmp(a, b) {
  const x = String(a).split(".").map(Number), y = String(b).split(".").map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] || 0) - (y[i] || 0);
    if (d) return d > 0 ? 1 : -1;
  }
  return 0;
}

export const DAY = 864e5;

/* Midnight UTC on an ISO date from the data file, offset by whole days. */
export function utc(iso, offsetDays = 0) {
  return new Date(iso + "T00:00:00Z").getTime() + offsetDays * DAY;
}
