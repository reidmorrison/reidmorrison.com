# Tests for the EOL exposure check

```sh
node --test          # from the repository root
```

No dependencies and nothing to install: Node's own test runner, and the Ruby
and Jekyll the site already needs. The first run builds the site into
`test/.site` (gitignored) and later runs reuse it until `_data/eol.yml`,
`eol.html`, `_config.yml`, `_includes/` or `_layouts/` changes.

`node --test` runs each file in its own process, so that cache is shared state.
It is taken under `test/.site.lock`: one process builds and the others wait,
because Jekyll empties its destination before it writes and an unlocked run
had one process reading a page another had just deleted. That failed about one
run in three after any edit to an input, with an error unrelated to the change
being tested. See `helpers/site.mjs`.

## The one rule

**No test states a date, a version, a ceiling or a control number of its own.**
Every expectation is derived from `_data/eol.yml`, read through Ruby's own YAML
parser so the suite sees exactly what Jekyll sees. A test that repeated a value
from the data file would keep passing after that value changed, which is the
failure this suite exists to catch.

Two deliberate exceptions, both of which can only fire on a regression rather
than on an edit:

- The 90 day warning window, in `eol-calculator.test.mjs`. That threshold is the
  page's, not the data's.
- The three citation errors in `eol-data.test.mjs`, which assert that a control
  is **not** one of the wrong values CLAUDE.md records as recurring.

## What each file covers

| File | Covers |
|---|---|
| `eol-rendering.test.mjs` | The Liquid layer. The three tables and both targets reaching the browser unaltered, the verified date in the sources footer, both dropdowns, and the control citations in the findings table. |
| `eol-calculator.test.mjs` | The arithmetic and the findings. Day counters and status pills for every series, the turn from Supported to Expiring to Unsupported around a series' own end-of-life date, the upgrade ladder for every combination, the trap, the impossible combinations, and when controls are cited. |
| `eol-data.test.mjs` | The assumptions the calculator makes about the data file, which an edit to it can break without touching a line of code. |

## How the harness works

`helpers/calculator.mjs` lifts the inline script out of the built page and runs
it, unmodified, in a `node:vm` context against a DOM stub that implements only
what the script touches. One line is appended, to publish the handful of values
the tests assert against: `const` at the top level of a vm script lives in the
context's lexical scope rather than on the global object.

The clock is pinned on every load. Each headline number on the page is a
distance from today, so a fixed `now` turns a day counter and a status pill into
exact values derived from the data file. It is also how the suite reaches states
the calendar has not arrived at yet: `loadCalculator(utc(rec.eol, -89))` puts
the page one day inside its warning window without waiting for the date.

## The ladder is checked against its rules, not against a copy of itself

Restating the expected hops for each starting point would assert only that two
implementations agree, and would have to be rewritten every time a date moves.
Instead each walk is checked against the rules it claims to follow: every Rails
hop is to the next series in the file and only once Ruby clears that series'
floor, every Ruby hop stays under the current series' ceiling and moves forward,
and the walk ends on both targets. Those hold for any data file, so an edit is
free to change the answer without touching a test.

## One thing the suite found

**Rails 4.2 could not be paired with anything.** It caps Ruby at 2.3 and the
Ruby table started at 2.4, so the oldest series on offer produced no finding,
only "Those two versions do not run together". Fixed on 2026-09-08 by adding the
five pre-2.4 branches from the ruby-lang.org branches page.

**Ruby 4.0 still has no compatible Rails**, and that is correct: it is newer
than any Rails series supports. The suite asserts the refusal for every
incompatible pair rather than singling this one out, so it resolves itself the
day a Rails series raises its ceiling.
