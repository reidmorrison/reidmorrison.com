/* Is data/advisories.json still being refreshed?
 *
 * Every other file here asks whether the page is right about the data it has.
 * This one asks whether it still has data worth being right about, which is a
 * different failure and a quieter one. The refresh can stop without anything
 * going red: GitHub disables a scheduled workflow after 60 days without
 * repository activity, it drops schedules under load, and a comparison bug in
 * script/advisories.mjs would leave every run green with nothing to show for
 * it. In all three cases the page goes on matching lockfiles against a
 * database that stopped moving, and /eol/ prints the date it was built at the
 * foot of a document going to an auditor.
 *
 * It reads the file and nothing else, so it needs no Jekyll build and runs in
 * milliseconds. .github/workflows/advisories.yml runs this file on its own,
 * on every refresh including a quiet one, because a quiet one is exactly when
 * a silent no-op looks like success.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./helpers/data.mjs";

const db = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "advisories.json"), "utf8"));

/* A threshold, not a fact out of a data file, which makes this the third
   deliberate exception to the rule in test/README.md. It can only fire on a
   regression: on the refresh having stopped.

   45 days. `generated` moves only when an advisory actually changed, so the
   floor under it is how long rubysec/ruby-advisory-db can legitimately sit
   still. Measured over five years of that repository's history, the longest
   stretch without a change under gems/ is 27 days (2025-01-10 to 2025-02-06).
   45 clears that by more than two weeks, which is room for a quiet spell and
   an unhurried review of the pull request, and it stays under the 60 day
   window in which GitHub switches a scheduled workflow off, so this fails
   before the schedule disappears rather than after. */
const STALE_DAYS = 45;

test("the shipped advisory database is still being refreshed", () => {
  const generated = Date.parse(`${db.generated}T00:00:00Z`);
  assert.equal(Number.isNaN(generated), false, `generated is not a date: ${db.generated}`);

  const age = Math.floor((Date.now() - generated) / 86_400_000);
  assert.ok(
    age <= STALE_DAYS,
    `data/advisories.json was built ${db.generated}, ${age} days ago, and the ` +
      `limit is ${STALE_DAYS}. The weekday refresh has stopped, or it is running ` +
      `and finding nothing. Check the last run of .github/workflows/advisories.yml, ` +
      `then re-run script/advisories.mjs by hand.`
  );
});
