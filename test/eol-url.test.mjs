/* The selection in the address bar.
 *
 * `/eol/?rails=7.2&ruby=3.3` is what makes a finding linkable rather than only
 * reproducible, so these cases are about the link surviving the round trip: a
 * check writes it, a load reads it back, and what the page then shows is the
 * same finding the sender saw.
 *
 * No version is named here. The pairs come from _data/eol.yml, like everywhere
 * else in this suite, so a series added to or dropped from the data file
 * changes what is tested rather than breaking it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { eolData, cmp, utc } from "./helpers/data.mjs";
import { loadCalculator, blockTitled, text } from "./helpers/calculator.mjs";

const data = eolData();
const runs = (r, uv) => cmp(uv, r.min) >= 0 && cmp(uv, r.max) <= 0;

/* Two real combinations, as far apart as the data file allows: the oldest
   Rails series with a Ruby it runs on, and the target pair. */
const oldest = data.rails.find((r) => data.ruby.some((u) => runs(r, u.v)));
const OLD = [oldest.v, data.ruby.find((u) => runs(oldest, u.v)).v];
const TARGET = [data.target_rails, data.target_ruby];

const NOW = utc(data.verified);
const link = ([rails, ruby]) => `/eol/?rails=${rails}&ruby=${ruby}`;

test("an unadorned /eol/ stays unadorned", () => {
  /* The starting selection is an example, not an answer. Stamping it into the
     address bar would hand every first-time visitor a link to a finding they
     did not ask for. */
  const page = loadCalculator(NOW);
  assert.equal(page.url(), "/eol/");
  assert.equal(page.entries.length, 1);
});

test("checking a combination puts it in the address bar", () => {
  const page = loadCalculator(NOW);
  page.check(...TARGET);
  assert.equal(page.url(), link(TARGET));
});

test("a link renders the finding the sender saw", () => {
  for (const pair of [OLD, TARGET]) {
    const sent = loadCalculator(NOW);
    const html = sent.check(...pair);

    const received = loadCalculator(NOW, sent.url());
    assert.deepEqual(received.selected(), { rails: pair[0], ruby: pair[1] });
    assert.equal(received.initialHtml, html);
  }
});

test("every combination in the data file survives the round trip", () => {
  for (const r of data.rails) {
    for (const u of data.ruby) {
      const sent = loadCalculator(NOW);
      const html = sent.check(r.v, u.v);
      const received = loadCalculator(NOW, sent.url());
      assert.equal(received.initialHtml, html, `Rails ${r.v} / Ruby ${u.v}`);
    }
  }
});

test("a half link is completed, an unknown version falls back", () => {
  const [rails, ruby] = TARGET;
  const cases = [
    [`/eol/?rails=${rails}`, rails, null],
    [`/eol/?ruby=${ruby}`, null, ruby],
    [`/eol/?rails=9.9&ruby=${ruby}`, null, ruby],
    [`/eol/?rails=${rails}&ruby=nonsense`, rails, null],
  ];

  for (const [url, keepRails, keepRuby] of cases) {
    const page = loadCalculator(NOW, url);
    const shown = page.selected();
    if (keepRails) assert.equal(shown.rails, keepRails, url);
    if (keepRuby) assert.equal(shown.ruby, keepRuby, url);

    /* Rewritten in place, not pushed: the visitor never asked for the
       incomplete URL, so Back must not return to it. */
    assert.equal(page.url(), link([shown.rails, shown.ruby]), url);
    assert.equal(page.entries.length, 1, url);
  }
});

test("a URL naming nothing this page knows is left alone", () => {
  const page = loadCalculator(NOW, "/eol/?utm_source=newsletter");
  assert.equal(page.url(), "/eol/?utm_source=newsletter");
  assert.equal(page.entries.length, 1);
});

test("Back returns to the previous finding", () => {
  const page = loadCalculator(NOW);
  const first = page.check(...OLD);
  page.check(...TARGET);
  assert.equal(page.url(), link(TARGET));

  const back = page.back();
  assert.equal(page.url(), link(OLD));
  assert.deepEqual(page.selected(), { rails: OLD[0], ruby: OLD[1] });
  assert.equal(back, first);
});

test("re-checking the same combination adds no history entry", () => {
  /* Otherwise Back does nothing visible, once per press. */
  const page = loadCalculator(NOW);
  page.check(...TARGET);
  const after = page.entries.length;
  page.check(...TARGET);
  assert.equal(page.entries.length, after);
});

test("a linked finding still names its versions to the lead form", () => {
  /* The hidden `versions` field and the print letterhead are what carry the
     combination off the page. Both are built by the same render, so arriving
     on a link must not leave them describing the default. */
  const page = loadCalculator(NOW, link(TARGET));
  const [rails, ruby] = TARGET;
  assert.equal(page.letterhead().context, `Rails ${rails} / Ruby ${ruby}`);
  assert.match(page.initialHtml, new RegExp(`id="ctx" value="Rails ${rails} / Ruby ${ruby}"`));
});

test("the finding a link produces is a finding, not an error", () => {
  const page = loadCalculator(NOW, link(OLD));
  const block = blockTitled(page.initialHtml, "Required upgrade path");
  assert.ok(block, "an old combination linked to should show the upgrade path");
  assert.match(text(block), new RegExp(`Rails ${data.target_rails} on Ruby ${data.target_ruby}`));
});
