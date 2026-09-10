/* What the calculator works out.
 *
 * The clock is pinned for every case, because each headline number is a
 * distance from today: with a fixed `now`, a day counter and a status pill are
 * exact values derived from the end-of-life dates in _data/eol.yml.
 *
 * The upgrade ladder is checked against its rules rather than against a second
 * copy of itself. Restating the expected hops here would only assert that two
 * implementations agree; asserting that every Ruby hop stays under the current
 * series' ceiling, that every Rails hop clears the next series' floor, and that
 * the walk ends on the target says the same thing while surviving an edit to
 * the data file.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { eolData, cmp, utc, DAY } from "./helpers/data.mjs";
import { loadCalculator, blockTitled, hasBlockTitled, text } from "./helpers/calculator.mjs";

const data = eolData();
const railsRec = (v) => data.rails.find((r) => r.v === v);
const runs = (r, uv) => cmp(uv, r.min) >= 0 && cmp(uv, r.max) <= 0;

/* Combinations a real Gemfile.lock could hold, and the ones it could not. */
const supported = data.rails.flatMap((r) => data.ruby.filter((u) => runs(r, u.v)).map((u) => [r.v, u.v]));
const impossible = data.rails.flatMap((r) => data.ruby.filter((u) => !runs(r, u.v)).map((u) => [r.v, u.v]));

const NOW = utc(data.verified);
const today = loadCalculator(NOW);

const fmtDate = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const counter = (block) => ({
  n: block.match(/class="counter-n">([^<]+)</)[1],
  label: block.match(/class="counter-l">([^<]+)</)[1],
  pill: block.match(/class="pill pill--\w+">([^<]+)</)[1],
  eol: block.match(/<dt>End of life<\/dt><dd>([^<]+)</)[1],
  fixes: block.match(/<dt>Security fixes<\/dt><dd>([^<]+)</)[1],
});

test("every version is dated from the data file and counted from today", async (t) => {
  const cases = [
    ...data.rails.map((r) => ["Rails", r]),
    ...data.ruby.map((r) => ["Ruby", r]),
  ];
  for (const [kind, rec] of cases) {
    await t.test(`${kind} ${rec.v}`, () => {
      /* Pair each version with one it actually runs with where the data file
         offers one. Some rows have no partner at all: Rails 4.2 caps Ruby
         below the oldest series listed, and Ruby 4.0 sits above every ceiling.
         Both versions are still dated and counted on their own, which is what
         this checks, so those rows fall back to any partner. */
      const partner = kind === "Rails"
        ? data.ruby.find((u) => runs(rec, u.v)) ?? data.ruby[0]
        : data.rails.find((r) => runs(r, rec.v)) ?? data.rails[0];
      const [rv, uv] = kind === "Rails" ? [rec.v, partner.v] : [partner.v, rec.v];

      const block = blockTitled(today.render(rv, uv), `${kind} ${rec.v}`);
      const days = Math.floor((NOW - utc(rec.eol)) / DAY);
      const past = days > 0;

      assert.deepEqual(counter(block), {
        n: Math.abs(days).toLocaleString(),
        label: past ? "Days without vendor security patches" : "Days of vendor support remaining",
        pill: past ? "Unsupported" : days > -90 ? "Expiring" : "Supported",
        eol: fmtDate(rec.eol),
        fixes: past ? "None. Vendor support ended." : "Active.",
      });
    });
  }
});

test("support status turns over on the end-of-life date in the data file", async (t) => {
  /* Driven off one series' own date, so the thresholds are checked without
     naming a day. The 90-day warning window is the page's, not the data's. */
  const rec = railsRec(data.target_rails);
  const ruby = data.ruby.find((u) => runs(rec, u.v)).v;

  const cases = [
    [-200, "Supported", "200"],
    [-90, "Supported", "90"],
    [-89, "Expiring", "89"],
    [-1, "Expiring", "1"],
    [0, "Expiring", "0"],
    [1, "Unsupported", "1"],
    [400, "Unsupported", "400"],
  ];

  for (const [offset, pill, n] of cases) {
    await t.test(`${offset} days from end of life`, () => {
      const calc = loadCalculator(utc(rec.eol, offset));
      const block = blockTitled(calc.render(rec.v, ruby), `Rails ${rec.v}`);
      const got = counter(block);
      assert.equal(got.pill, pill);
      assert.equal(got.n, n);
    });
  }
});

test("the upgrade ladder obeys the compatibility rules in the data file", async (t) => {
  for (const [rv, uv] of supported) {
    await t.test(`Rails ${rv} on Ruby ${uv}`, () => {
      const steps = today.ladder(rv, uv);
      let rails = rv, ruby = uv;

      for (const [i, step] of steps.entries()) {
        const at = `step ${i + 1} of ${steps.length}`;
        if (step.kind === "rails") {
          const next = data.rails[data.rails.findIndex((r) => r.v === rails) + 1];
          assert.equal(step.from, rails, `${at} starts where the last one left off`);
          assert.equal(step.to, next.v, `${at} is a single-version hop`);
          assert.ok(cmp(ruby, next.min) >= 0, `${at} hops to Rails ${next.v}, which needs Ruby ${next.min}`);
          rails = step.to;
        } else {
          assert.equal(step.from, ruby, `${at} starts where the last one left off`);
          assert.ok(cmp(step.to, ruby) > 0, `${at} moves Ruby forward`);
          assert.ok(
            cmp(step.to, railsRec(rails).max) <= 0,
            `${at} raises Ruby to ${step.to}, above the ${railsRec(rails).max} ceiling of Rails ${rails}`
          );
          assert.ok(cmp(step.to, data.target_ruby) <= 0, `${at} does not overshoot the target Ruby`);
          ruby = step.to;
        }
      }

      assert.equal(rails, data.target_rails, "the ladder ends on the target Rails");
      assert.equal(ruby, data.target_ruby, "the ladder ends on the target Ruby");
    });
  }
});

test("the ladder is rendered hop for hop, with the count in the pill", async (t) => {
  for (const [rv, uv] of supported) {
    const steps = today.ladder(rv, uv);
    if (!steps.length) continue;
    await t.test(`Rails ${rv} on Ruby ${uv}`, () => {
      const block = blockTitled(today.render(rv, uv), "Required upgrade path");
      const rungs = [...block.matchAll(/<strong>(Rails|Ruby) ([\d.]+) &rarr; ([\d.]+)<\/strong>/g)];

      assert.deepEqual(
        rungs.map((m) => ({ kind: m[1].toLowerCase(), from: m[2], to: m[3] })),
        steps.map((s) => ({ kind: s.kind, from: s.from, to: s.to }))
      );
      assert.match(block, new RegExp(`>${steps.length} version hop${steps.length === 1 ? "" : "s"}<`));
      assert.match(text(block), new RegExp(`To Rails ${data.target_rails} on Ruby ${data.target_ruby}`));
    });
  }
});

test("a Ruby hop names the ceiling it is stuck under and the floor it is reaching for", () => {
  /* The two numbers in that sentence are the ones a reader checks, so they are
     matched against the data file rather than merely present. */
  const trapped = supported.filter(([rv, uv]) => today.ladder(rv, uv).some((s) => s.kind === "ruby" && s.why.includes("requires")));
  assert.ok(trapped.length, "no combination in the data file produces a compatibility-driven Ruby hop");

  for (const [rv, uv] of trapped) {
    let rails = rv;
    for (const step of today.ladder(rv, uv)) {
      if (step.kind === "rails") {
        rails = step.to;
        continue;
      }
      if (!step.why.includes("requires")) continue;
      const next = data.rails[data.rails.findIndex((r) => r.v === rails) + 1];
      assert.equal(
        step.why,
        `Rails ${next.v} requires Ruby ${next.min} or later. Rails ${rails} supports Ruby up to ${railsRec(rails).max}.`
      );
    }
  }
});

test("the trap is declared exactly when the series ceiling sits below the Ruby floor", async (t) => {
  for (const [rv, uv] of supported) {
    await t.test(`Rails ${rv} on Ruby ${uv}`, () => {
      const html = today.render(rv, uv);
      const stuck = cmp(railsRec(rv).max, today.RUBY_FLOOR) < 0;
      assert.equal(hasBlockTitled(html, "Structurally trapped"), stuck);
      if (stuck) {
        assert.match(
          text(blockTitled(html, "Structurally trapped")),
          new RegExp(
            `Rails ${rv} cannot run Ruby newer than ${railsRec(rv).max}\\. ` +
              `Every supported Rails release requires Ruby ${today.RUBY_FLOOR} or later`
          )
        );
      }
    });
  }
});

test("the target combination needs no upgrade, and says when to look again", () => {
  const target = railsRec(data.target_rails);
  assert.ok(runs(target, data.target_ruby), "the data file's two targets do not run together");

  const html = today.render(data.target_rails, data.target_ruby);
  const block = blockTitled(html, "No upgrade required");
  assert.ok(block, "the target combination was given an upgrade path");
  assert.match(
    text(block),
    new RegExp(`Re-check when Rails ${data.target_rails} approaches its end of life on ${fmtDate(target.eol)}`)
  );
  assert.equal(hasBlockTitled(html, "Required upgrade path"), false);
});

test("a combination that cannot exist is refused instead of being given a path", async (t) => {
  assert.ok(impossible.length, "the data file offers no incompatible combination to check");

  for (const [rv, uv] of impossible) {
    await t.test(`Rails ${rv} on Ruby ${uv}`, () => {
      const rec = railsRec(rv);
      const html = today.render(rv, uv);
      const block = blockTitled(html, "Those two versions do not run together");
      assert.ok(block, "an impossible combination was accepted");

      const reason = cmp(uv, rec.min) < 0
        ? `Rails ${rv} requires at least Ruby ${rec.min}, and you selected Ruby ${uv}.`
        : `Rails ${rv} is not supported above Ruby ${rec.max}, and you selected Ruby ${uv}.`;
      assert.match(text(block), new RegExp(reason.replace(/[.()]/g, "\\$&")));
      assert.match(text(block), new RegExp(`Rails ${rv} runs on Ruby ${rec.min} to ${rec.max}\\.`));

      /* No invented ladder, and no trap either: the starting point does not
         exist, so nothing may be drawn from it. The dates still stand. */
      assert.equal(hasBlockTitled(html, "Required upgrade path"), false);
      assert.equal(hasBlockTitled(html, "No upgrade required"), false);
      assert.equal(hasBlockTitled(html, "Structurally trapped"), false);
      assert.ok(blockTitled(html, `Rails ${rv}`), "the Rails record is still shown");
      assert.ok(blockTitled(html, `Ruby ${uv}`), "the Ruby record is still shown");
    });
  }
});

test("the controls are cited only against a version that has lost support", async (t) => {
  const target = railsRec(data.target_rails);
  const ruby = data.ruby.find((u) => u.v === data.target_ruby);

  await t.test("both versions still supported", () => {
    const before = Math.min(utc(target.eol), utc(ruby.eol));
    const calc = loadCalculator(before - DAY);
    const html = calc.render(target.v, ruby.v);
    assert.equal(hasBlockTitled(html, "Controls implicated"), false);
  });

  await t.test("one version past its end-of-life date", () => {
    const after = Math.min(utc(target.eol), utc(ruby.eol));
    const calc = loadCalculator(after + DAY);
    const html = calc.render(target.v, ruby.v);
    assert.ok(blockTitled(html, "Controls implicated"), "an unsupported version cited no controls");
  });
});

test("the finding carries the selected versions into the letterhead and the enquiry", () => {
  const [rv, uv] = supported[0];
  const html = today.render(rv, uv);
  assert.equal(today.letterhead().context, `Rails ${rv} / Ruby ${uv}`);

  /* The lead form is gated on web3forms_key, so it is only asserted when the
     build actually rendered one. */
  if (html.includes('id="lead"')) {
    assert.match(html, new RegExp(`name="versions" id="ctx" value="Rails ${rv} / Ruby ${uv}"`));
  }
});

/* -------------------------------------------------- the one-line summary */

/* Removing the Check exposure button made this line load-bearing rather than
   decorative. On a phone the panel stacks above the finding, so it is the
   only thing that visibly changes when a dropdown changes, and it is the
   page's only aria-live region now that #out is not one. It has to say what
   the finding says. */

test("the summary states each version's standing, derived from the data file", () => {
  for (const [rv, uv] of supported) {
    const calc = loadCalculator(NOW);
    calc.render(rv, uv);
    const line = calc.summary();

    for (const [label, rec] of [
      [`Rails ${rv}`, data.rails.find((r) => r.v === rv)],
      [`Ruby ${uv}`, data.ruby.find((u) => u.v === uv)],
    ]) {
      const st = calc.statusOf(rec.eol);
      assert.match(
        line,
        st.d > 0
          ? new RegExp(`${label} unsupported ${st.d.toLocaleString()} days`)
          : new RegExp(`${label} supported`),
        `${rv}/${uv}: ${line}`
      );
    }
  }
});

test("the summary counts the same hops the ladder draws", () => {
  for (const [rv, uv] of supported) {
    const calc = loadCalculator(NOW);
    calc.render(rv, uv);
    const hops = calc.ladder(rv, uv).length;

    assert.match(
      calc.summary(),
      hops
        ? new RegExp(`${hops} version hop${hops === 1 ? "" : "s"} required\\.$`)
        : /No upgrade required\.$/,
      `${rv}/${uv} should report ${hops} hops`
    );
  }
});

test("an impossible pair is summarised as impossible, not as a day count", () => {
  const impossible = data.rails.flatMap((r) =>
    data.ruby.filter((u) => !runs(r, u.v)).map((u) => [r, u])
  );

  for (const [r, u] of impossible.slice(0, 12)) {
    const calc = loadCalculator(NOW);
    calc.render(r.v, u.v);
    const line = calc.summary();

    assert.match(line, new RegExp(`Rails ${r.v} does not run on Ruby ${u.v}\\.`));
    /* And it names the way out, because this is the state a visitor lands in
       mid-edit now that there is no button to hold the finding back. */
    assert.match(
      line,
      cmp(u.v, r.min) < 0 ? new RegExp(`needs Ruby ${r.min} or later`) : new RegExp(`caps at Ruby ${r.max}`)
    );
  }
});
