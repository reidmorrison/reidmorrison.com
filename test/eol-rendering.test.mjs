/* What Jekyll puts on the page.
 *
 * Everything the calculator knows arrives through Liquid, so this file covers
 * that seam: the three tables and the two targets reaching the browser
 * unaltered, the verified date in the sources footer, the two dropdowns, and
 * the control citations rendered into the findings table.
 *
 * Expectations come from _data/eol.yml. Nothing here states a date, a version
 * or a control number of its own.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { eolData, utc } from "./helpers/data.mjs";
import { eolPage } from "./helpers/site.mjs";
import { loadCalculator, blockTitled } from "./helpers/calculator.mjs";

const data = eolData();
const page = eolPage();

/* Pinned on the day the data was verified, so the page is exercised in the
   state its own author last checked. */
const calc = loadCalculator(utc(data.verified));

test("the Rails table reaches the browser exactly as the data file states it", () => {
  assert.deepEqual(calc.RAILS, data.rails);
});

test("the Ruby table reaches the browser exactly as the data file states it", () => {
  assert.deepEqual(calc.RUBY, data.ruby);
  /* `projected: true` marks a date ruby-core has not fixed. It survives
     jsonify, so a later change can act on it rather than rediscover it. */
  const projected = data.ruby.filter((r) => r.projected).map((r) => r.v);
  assert.deepEqual(calc.RUBY.filter((r) => r.projected).map((r) => r.v), projected);
});

test("the control citations reach the browser exactly as the data file states them", () => {
  assert.deepEqual(calc.CONTROLS, data.controls);
});

test("the upgrade targets come from the data file", () => {
  assert.equal(calc.TARGET_RAILS, data.target_rails);
  assert.equal(calc.TARGET_RUBY, data.target_ruby);
});

test("the Ruby floor is derived from the target series, never restated", () => {
  const target = data.rails.find((r) => r.v === data.target_rails);
  assert.equal(calc.RUBY_FLOOR, target.min);
});

test("the sources footer states the date the data file was verified", () => {
  /* Liquid renders `verified` with "%-d %B %Y". */
  const [y, m, d] = data.verified.split("-").map(Number);
  const month = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  assert.match(page, new RegExp(`Verified ${d} ${month} ${y}\\.`));
});

test("the Rails dropdown offers every series, newest first", () => {
  const expected = data.rails.slice().reverse();
  assert.deepEqual(
    calc.options("railsSel"),
    expected.map((r) => ({ text: `Rails ${r.v}`, value: r.v }))
  );
});

test("the Ruby dropdown offers every series, newest first", () => {
  const expected = data.ruby.slice().reverse();
  assert.deepEqual(
    calc.options("rubySel"),
    expected.map((r) => ({ text: `Ruby ${r.v}`, value: r.v }))
  );
});

test("the versions selected on load exist in the data file", () => {
  /* The page renders a finding before anything is chosen. If either default
     were dropped from the data file, that first render would throw and the
     page would arrive blank. */
  assert.ok(data.rails.some((r) => r.v === calc.railsSel.value), `Rails ${calc.railsSel.value} is not in the data file`);
  assert.ok(data.ruby.some((r) => r.v === calc.rubySel.value), `Ruby ${calc.rubySel.value} is not in the data file`);
  assert.match(calc.initialHtml, /class="record/);
});

test("every control citation is rendered, in the order the data file sets", () => {
  /* The table only appears against an unsupported version, so the finding is
     drawn for the oldest combination the data file offers. */
  const html = calc.render(data.rails[0].v, data.ruby[0].v);
  const block = blockTitled(html, "Controls implicated");
  assert.ok(block, "no controls table was rendered against an unsupported version");

  const rows = [...block.matchAll(/<tr><td>([^<]*)<\/td><td class="ctl">([^<]*)<\/td><td>([^<]*)<\/td><\/tr>/g)];
  assert.deepEqual(
    rows.map((m) => ({ framework: m[1], control: m[2], requires: m[3] })),
    data.controls.map((c) => ({ framework: c.framework, control: c.control, requires: c.requires.trim() }))
  );
  assert.match(block, new RegExp(`>${data.controls.length} references<`));
});
