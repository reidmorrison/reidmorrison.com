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

/* ---------------------------------------------------- the deferred entry */

/* There is no Check exposure button any more. The finding follows the fields,
   and the address bar follows once the selection has been left alone, so that
   one trip through a dropdown does not bury the page the visitor arrived from
   under a dozen entries. These are the cases that keeps honest. */

test("a selection still being made renders, and writes no history entry", () => {
  const page = loadCalculator(NOW);
  const entries = page.entries.length;

  const html = page.check(...OLD, { settle: false });

  assert.match(html, /<article/, "the finding is drawn immediately");
  assert.equal(page.entries.length, entries, "and nothing is in history yet");
  assert.equal(page.settlePending(), true, "with a promotion still pending");
});

test("leaving a selection alone promotes it to a history entry", () => {
  const page = loadCalculator(NOW);
  const entries = page.entries.length;

  page.check(...OLD, { settle: false });
  page.settle();

  assert.equal(page.entries.length, entries + 1);
  assert.equal(page.url(), link(OLD));
});

test("passing through a combination on the way to another leaves no trace", () => {
  /* Changing Rails and then Ruby is two `change` events and one decision.
     The pair in between is a state nobody chose, and on this page it is
     usually an incompatible one. It must not be in history, and it must not
     be what a copied link points at. */
  const page = loadCalculator(NOW);
  const entries = page.entries.length;

  page.check(OLD[0], TARGET[1], { settle: false });
  page.check(...OLD, { settle: false });
  page.settle();

  assert.equal(page.entries.length, entries + 1, "one decision, one entry");
  assert.equal(page.url(), link(OLD));
});

test("wandering away and back again writes nothing", () => {
  const page = loadCalculator(NOW);
  page.check(...OLD);
  const entries = page.entries.length;

  page.check(...TARGET, { settle: false });
  page.check(...OLD, { settle: false });
  page.settle();

  /* Two identical adjacent entries would make Back do nothing visible, which
     is the same failure the case above this block guards. */
  assert.equal(page.entries.length, entries);
  assert.equal(page.url(), link(OLD));
});

test("a change made straight after Back does not re-push where Back landed", () => {
  const page = loadCalculator(NOW);
  page.check(...OLD);
  page.check(...TARGET);
  page.back();
  const entries = page.entries.length;

  /* Back arrives at OLD. Selecting OLD again is a no-op and must stay one,
     rather than pushing a second copy of the entry just returned to. */
  page.check(...OLD);

  assert.equal(page.entries.length, entries);
  assert.equal(page.url(), link(OLD));
});

/* ------------------------------------------------ the way back, on paper */

/* The printed finding is the artifact that travels: an engineer prints it for
   the auditor or for the executive who signs the remediation plan. Whoever it
   lands on needs a way to check it. Nobody notices this breaking, because it
   is invisible on screen, so it is tested rather than trusted. */

test("the printed letterhead carries a link back to this exact finding", () => {
  for (const pair of [OLD, TARGET]) {
    const page = loadCalculator(NOW);
    page.check(...pair);
    const { url, href } = page.letterhead();

    assert.match(href, /^https?:\/\//, "the href is absolute, so it works from a PDF");
    assert.equal(href.endsWith(link(pair)), true, `${href} should end with ${link(pair)}`);
    /* Shown without the scheme: nobody types it, and it is noise on paper. */
    assert.equal(url, href.replace(/^https?:\/\//, ""));
  }
});

test("the printed link follows the finding immediately, not the address bar", () => {
  /* The address bar lags by up to SETTLE_MS. A visitor who changes a version
     and prints straight away must not hand somebody a document whose figures
     and whose link disagree. */
  const page = loadCalculator(NOW);
  page.check(...OLD);
  page.check(...TARGET, { settle: false });

  assert.equal(page.url(), link(OLD), "the address bar has not caught up yet");
  assert.equal(page.letterhead().href.endsWith(link(TARGET)), true, "but the printed link has");
  assert.equal(page.letterhead().context, `Rails ${TARGET[0]} / Ruby ${TARGET[1]}`);
});

test("the printed link round-trips to the finding it was printed from", () => {
  const sent = loadCalculator(NOW);
  const html = sent.check(...OLD);

  /* Follow the printed link the way a recipient would, path and query only. */
  const received = loadCalculator(NOW, sent.letterhead().href.replace(/^https?:\/\/[^/]+/, ""));

  assert.equal(received.initialHtml, html);
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
