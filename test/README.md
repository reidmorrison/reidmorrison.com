# Tests for the EOL exposure check

```sh
node --test          # from the repository root
```

No dependencies and nothing to install: Node's own test runner, and the Ruby
and Jekyll the site already needs. The first run builds the site into
`test/.site` (gitignored) and later runs reuse it until `_data/eol.yml`,
`eol.html`, `_config.yml`, `_includes/` or `_layouts/` changes.

The suite also reads `data/advisories.json` out of the built site, so a re-run
of `script/advisories.mjs` invalidates the cache along with the other inputs.

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

`eol-lockfile.test.mjs` is a third case, and a different one. Its fixtures name
gem versions, but they are **inputs it constructs**, not values restated from a
data file: `~> 6.1.7.3` is there to pin down what the pessimistic operator
means, and it would mean the same thing whatever `_data/eol.yml` said. Where
that file does touch real data it derives, never names: the Rails series it
expects a lockfile to select comes from `_data/eol.yml`, and the gem it expects
an advisory for is found in `data/advisories.json` at run time, by looking for
an advisory whose only statement is a lower bound. Both survive a refresh.

## What each file covers

| File | Covers |
|---|---|
| `eol-rendering.test.mjs` | The Liquid layer. The three tables and both targets reaching the browser unaltered, the verified date in the sources footer, both dropdowns, and the control citations in the findings table. |
| `eol-calculator.test.mjs` | The arithmetic and the findings. Day counters and status pills for every series, the turn from Supported to Expiring to Unsupported around a series' own end-of-life date, the upgrade ladder for every combination, the trap, the impossible combinations, and when controls are cited. |
| `eol-data.test.mjs` | The assumptions the calculator makes about the data file, which an edit to it can break without touching a line of code. |
| `eol-lockfile.test.mjs` | The `Gemfile.lock` drop zone: the lockfile grammar, RubyGems version ordering and requirement matching, the vulnerability rule, and the finding a dropped file produces. |
| `eol-url.test.mjs` | The selection in the address bar. The round trip from a check to a link to the same finding, half and unknown links, Back, and the deferred history entry: what a selection still being made writes, and what settling writes. |

## How the harness works

`helpers/calculator.mjs` lifts the inline script out of the built page and runs
it, unmodified, in a `node:vm` context against a DOM stub that implements only
what the script touches, plus an address bar: the selection is read out of it
on load and written back on every check, so the stub parses a pushed URL and
keeps the entries a test needs in order to press Back.

One line is appended, to publish the handful of values
the tests assert against: `const` at the top level of a vm script lives in the
context's lexical scope rather than on the global object.

`setTimeout` is stubbed as well, and that is not an optimisation. Removing the
Check exposure button put the address bar behind a debounce, and real timers
would turn every history case into a race. The sandbox holds the one pending
callback and `settle()` fires it, so "left it alone" is something a test states
rather than waits for. `check()` now drives the two dropdowns with `change`
events and settles; pass `{ settle: false }` to stop on the transient state.

The drop zone added three things to that stub: a `FileReader`, a file input that
can be handed a file, and a `fetch` that answers for `data/advisories.json` and
still throws for every other URL, which is what keeps the lead form out of the
suite. That fetch serves the file **out of the built site**, so the cases match
against the real database and also cover Jekyll publishing it.

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
