/* What the calculator assumes about _data/eol.yml.
 *
 * The tool walks the Rails list by index, hops one series at a time, and looks
 * the targets up by name. None of that is defensive, so an edit to the data
 * file can break the page without touching a line of code. These are the
 * assumptions that edit would violate, stated once.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { eolData, cmp, utc } from "./helpers/data.mjs";

const data = eolData();
const iso = /^\d{4}-\d{2}-\d{2}$/;

for (const [name, rows] of [["Rails", data.rails], ["Ruby", data.ruby]]) {
  test(`the ${name} series are listed oldest first, with no repeats`, () => {
    /* The ladder reads RAILS[i + 1] as "the next series". Out of order, it
       walks backwards; duplicated, it stalls. */
    const versions = rows.map((r) => r.v);
    assert.deepEqual(versions, [...new Set(versions)], `${name} lists a series twice`);
    for (let i = 1; i < rows.length; i++) {
      assert.ok(cmp(rows[i].v, rows[i - 1].v) > 0, `${name} ${rows[i].v} is listed after ${rows[i - 1].v}`);
    }
  });

  test(`every ${name} series is dated, and ends life after it was released`, () => {
    for (const r of rows) {
      assert.match(r.released, iso, `${name} ${r.v} has no ISO release date`);
      assert.match(r.eol, iso, `${name} ${r.v} has no ISO end-of-life date`);
      assert.ok(utc(r.eol) > utc(r.released), `${name} ${r.v} ends life before it was released`);
    }
  });
}

test("every Rails series states a Ruby range that is a range", () => {
  for (const r of data.rails) {
    assert.ok(r.min, `Rails ${r.v} states no minimum Ruby`);
    assert.ok(r.max, `Rails ${r.v} states no maximum Ruby`);
    assert.ok(cmp(r.max, r.min) >= 0, `Rails ${r.v} caps Ruby at ${r.max}, below its own floor of ${r.min}`);
  }
});

test("each Rails series can carry Ruby high enough to reach the next one", () => {
  /* The ladder alternates: raise Ruby to the next series' floor, then hop. If
     a series' ceiling sits below the next series' floor there is no rung
     between them, and the walk runs to its guard instead of to the target. */
  for (let i = 1; i < data.rails.length; i++) {
    const from = data.rails[i - 1], to = data.rails[i];
    assert.ok(
      cmp(from.max, to.min) >= 0,
      `Rails ${from.v} caps Ruby at ${from.max}, but Rails ${to.v} needs ${to.min}, so nothing can cross the gap`
    );
  }
});

test("the upgrade targets exist and run together", () => {
  const rails = data.rails.find((r) => r.v === data.target_rails);
  const ruby = data.ruby.find((r) => r.v === data.target_ruby);
  assert.ok(rails, `target_rails ${data.target_rails} is not in the Rails list`);
  assert.ok(ruby, `target_ruby ${data.target_ruby} is not in the Ruby list`);
  assert.ok(
    cmp(data.target_ruby, rails.min) >= 0 && cmp(data.target_ruby, rails.max) <= 0,
    `Rails ${rails.v} runs on Ruby ${rails.min} to ${rails.max}, so it cannot be targeted with Ruby ${data.target_ruby}`
  );
});

test("the target Rails series is the newest one listed", () => {
  /* The ladder climbs towards the target and stops there, so a series above it
     would be unreachable and would never appear on a path. */
  assert.equal(data.target_rails, data.rails.at(-1).v);
});

test("only Ruby dates are marked projected, and only as a flag", () => {
  /* The footer of a finding must not present an extrapolated date as
     announced, so the marker has to survive on the row it belongs to. */
  for (const r of data.rails) assert.equal(r.projected, undefined, `Rails ${r.v} carries a projected date`);
  for (const r of data.ruby) {
    if ("projected" in r) assert.equal(r.projected, true, `Ruby ${r.v} sets projected to something other than true`);
  }
  assert.ok(data.ruby.some((r) => r.projected), "no Ruby date is marked projected, which the page's footer note assumes");
});

test("the verification stamp is a date that has happened", () => {
  assert.match(data.verified, iso, "verified is not an ISO date");
  assert.ok(utc(data.verified) <= Date.now(), `verified is stamped ${data.verified}, in the future`);
});

test("every control citation is complete", () => {
  assert.ok(data.controls.length, "no controls are cited");
  for (const c of data.controls) {
    assert.ok(c.framework?.trim(), "a control is cited with no framework");
    assert.ok(c.control?.trim(), `${c.framework} cites a control with no number`);
    assert.ok(c.requires?.trim(), `${c.framework} ${c.control} states no requirement`);
  }
});

test("no control regresses to a citation that has already been wrong once", () => {
  /* Not expectations, which belong in the data file: these are the four
     specific errors CLAUDE.md records as recurring. PCI DSS 4.0 was retired on
     2024-12-31, and the other three name the wrong control for the claim made
     alongside it. */
  const known = [
    [/^PCI DSS 4\.0$/, "PCI DSS 4.0 was retired 2024-12-31"],
    [/164\.312/, "the HIPAA citation for this claim is 164.308(a)(1)(ii)(A)-(B)"],
    [/^CC6\.1$/, "the SOC 2 citation for this claim is CC6.8"],
  ];
  for (const c of data.controls) {
    for (const [pattern, why] of known) {
      assert.doesNotMatch(c.framework, pattern, `${c.framework} ${c.control}: ${why}`);
      assert.doesNotMatch(c.control, pattern, `${c.framework} ${c.control}: ${why}`);
    }
  }
});
