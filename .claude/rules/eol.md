---
paths:
  - "eol.html"
  - "_data/eol.yml"
  - "data/**"
  - "script/advisories.mjs"
  - "test/**"
  - ".github/workflows/**"
  - "contact.md"
  - "stylesheets/site.css"
---

# The EOL exposure check at `/eol/`

The lead magnet, and the highest-value page here. It builds its own shell rather
than using `_layouts/default.html`, but **contains no CSS at all**: its
components (`.cols`, `.panel`, `.drop`, `.notice`, `.record`, `.counter`,
`.trap`, `.capture`) live in `site.css` under their own section, and the shared
rules above that section apply. Folding the shell into `_layouts/default.html` is
optional cleanup, not a fix.

### The `Gemfile.lock` drop zone

Added 2026-09-09. Drop a lockfile in and the page reads it **in the browser**:
it sets both dropdowns from it and matches every pinned gem version against
`data/advisories.json`, the reduced copy of `rubysec/ruby-advisory-db` that
`script/advisories.mjs` builds.

**It is the third field inside the versions form, under Ruby and above Check
exposure, tagged "Optional, recommended".** It took three arrangements to get
there and the two rejected ones are worth knowing:

1. *Above the dropdowns* (2026-09-09). Read as step one, and gated the finding
   on a file most visitors do not have to hand: they are on a phone, or in a
   meeting, and the lockfile is on a laptop somewhere.
2. *A second box below the button* (2026-09-10, morning). Clearly optional,
   but detached, and the copy justifying it ran longer than anything else on
   the panel.

**Keep the copy on that panel short.** It is the first thing an evaluator
reads, and every extra sentence is a reason to leave before pressing the
button. The `Optional, recommended` chip carries the framing that previously
took a paragraph. Two dropdowns and a button remain the whole product.

**The status is a `.notice`, not a footnote**, and it is hidden until there is
something to say. Accent-tinted for a successful read, `--crit` for a refusal.
It has to be seen: it is the only signal that the file moved the two dropdowns
above it, and those versions end up on a document going to an auditor. For the
same reason it never reads as an instruction. A lockfile with no `RUBY VERSION`
section is the common case, not an error, so it says "No Ruby version detected
in the `Gemfile.lock`, using Ruby 3.0 as selected" rather than telling anyone
to go and fix something.

**It is derived state, rebuilt by `lockSummary()` on every render, and it must
stay that way** (fixed 2026-09-10). It was written once when the file landed,
so changing a dropdown afterwards left it naming the version the visitor
started on while the finding, the letterhead and the printed link all showed
the new one. A stale notice is worse than none: it is a confident wrong
statement on a document headed for an auditor. Every clause therefore names
the version currently shown and says where it came from, so "from the file"
and "as selected" can never silently disagree. It is written from `render()`
rather than from the change listener because `popstate` calls `render()`
directly, and Back has to bring the notice with it.

```sh
node script/advisories.mjs   # from the repository root, then commit the JSON
```

**It re-runs itself**, via `.github/workflows/advisories.yml`, **Sundays and
Wednesdays at 23:37 UTC**, plus a `workflow_dispatch` button. It rebuilds, runs
the suite, and opens a pull request for review rather than pushing: what changes
is a claim this practice makes in front of a compliance reader, so somebody
looks at it. The body ends `cc @reidmorrison`, because a pull request the bot
opens notifies nobody otherwise.

**It fires the evening before the review, not the morning of** (changed
2026-10-05). GitHub starts scheduled runs many hours late under load, and has
dropped one outright (2026-09-14), so the old 12:07 UTC slot routinely landed
after the morning it was meant for. 23:37 UTC leaves more than twelve hours of
slack before a Monday or Thursday morning in Florida.

**Twice a week, and the interval was measured rather than picked** (changed from
weekly 2026-09-18, against five years of `rubysec/ruby-advisory-db`). Upstream
touches `gems/` on 140 days a year, in 87% of weeks, so weekly already opened a
pull request most weeks. What weekly cost was latency: an advisory against a gem
a Rails lockfile actually pins waited 4.4 days on average and up to 7. Two runs a week
halves that to 2.7 and caps it at 4, for roughly 62 pull requests a
year against 40.

**Daily was rejected, and the reason is the review.** It would reach about 95
pull requests a year, and this lands as a pull request precisely because
somebody reads it; at that volume reading becomes rubber-stamping and the
workflow loses the only thing that justifies it. There is also nothing to win by
outrunning the database: its own median lag from an advisory's date to the file
appearing upstream is 2 days, and a third take more than a week. **For the rare
advisory that actually moves a buyer, the answer is the `workflow_dispatch`
button on the day, not a faster cron.**

- **A quiet run opens nothing.** `generated` and `commit` move every run
  whether or not an advisory did, so the script compares the advisories alone
  and leaves the file untouched when they match. Otherwise the review that
  mattered would be lost among fifty that only changed a date.
- **The pull request body is the diff that is readable.** A 320KB JSON diff is
  not, so the script emits markdown: what is new and what was withdrawn,
  worst-CVSS first, linked, capped at 30 each.
- **One branch, `advisories-refresh`, reset on every run.** An unmerged refresh
  is replaced rather than stacked behind a near-identical second pull request.
- **A failing suite does not cancel the pull request.** The data is still worth
  seeing, the body says plainly that it did not pass, and the job fails at the
  end so the run goes red. The case most likely to catch something is the one
  asserting every requirement string in the shipped database parses.

Two things to know about GitHub's scheduler: it only runs workflows on the
default branch, and it disables scheduled workflows after 60 days without
repository activity.

### The refresh stopping is a quieter failure than the refresh being wrong

Added 2026-09-18, and what made it worth adding is that by then **no scheduled
run had ever fired**: all three runs to that date were `workflow_dispatch`, the
2026-09-14 schedule having been dropped by GitHub's queue. A refresh that stops
does not go red. It goes silent, the page keeps matching lockfiles against a
frozen database, and `/eol/` prints the date it was built at the foot of a
document going to an auditor.

`test/eol-freshness.test.mjs` fails once `generated` is more than **45 days**
old. It reads `data/advisories.json` and nothing else, so it needs no Jekyll
build and runs in milliseconds.

- **45, because `generated` only moves when an advisory actually changed.** The
  floor under it is how long upstream can legitimately sit still, and the
  longest stretch without a change under `gems/` in five years is 27 days
  (2025-01-10 to 2025-02-06). 45 clears that by over two weeks, which is room
  for a quiet spell plus an unhurried review, and stays under the 60 day window
  in which GitHub switches a scheduled workflow off, so it fails before the
  schedule disappears rather than after.
- **The workflow runs it on every refresh, including a quiet one**, outside the
  `changed == 'true'` gate that holds back the rest of the suite. A quiet run
  and a refresh that has silently stopped finding anything are the same green
  tick otherwise, and the second is the one that matters.
- **It cannot catch a schedule that stopped firing**, because then nothing in
  the workflow runs at all. That case is caught by `node --test` locally, which
  is why the check is a test and not a shell step in the workflow. If a CI
  workflow is ever added on push, it inherits the catch for free.

**The generated file must be reproducible, or the schedule is worthless.**
Two runs of `script/advisories.mjs` against the same upstream commit have to
produce byte-identical output, whatever Ruby they run on. Ruby's `sort_by` is
not stable, so ordering the rows on `[-cvss, date]` alone left ties in
whichever order the implementation chose: 99 rows across 22 gems came out
differently on the runner's 3.3 than on the 3.4 they were generated with, and
the first scheduled run duly produced a pull request with no information in
it. The id is the tiebreaker that makes the order total, and
`eol-lockfile.test.mjs` asserts the shipped file is in it.

**Anything shelled out to Ruby must require what it uses, explicitly.** Both
`script/advisories.mjs` and `test/helpers/data.mjs` pass `permitted_classes:
[Date]` to Psych, and both relied on `require "yaml"` pulling `date` in with
it. It does on Ruby 3.4 and does not on 3.3, so both worked locally for a week
and the first scheduled run died on `uninitialized constant Date`. The runner
pinning a different Ruby from the development machine is what exposed it;
that difference is worth keeping.

**Cost, measured 2026-09-10 and not a concern:** 69KB gzipped over the wire,
0.7ms to `JSON.parse`, 0.2ms to parse a lockfile and about 1ms to match an
87-gem one. A deliberately absurd worst case, every one of the 467 gems the
database knows about pinned so that all 1,242 advisories match, takes 2.3ms
and renders 935 rows. Raw size is a misleading number here: most of it is the
same seven keys repeated 1,242 times, which is why it compresses 4.6x. Trimming
fields would buy 20KB at most and cost the page the advisory links. The script's header
carries the full reasoning; the four things that must not be undone:

- **No per-gem API calls, ever.** Looking each gem up on rubygems.org was
  measured on 2026-09-09 and rejected: there is no bulk endpoint left (the
  Dependency API answers 404, the compact index sends no CORS header), the limit
  is 10 requests per second per client IP, and a real lockfile holds 150 to 450
  gems. It would also ship the visitor's dependency inventory to a third party
  from the page that sells this practice's security posture. **Adding one breaks
  `/privacy.html` and the claim that page makes.**
- **The one fetch is a constant URL on this origin**, made on the first drop and
  never at load. It is identical whatever was dropped, which is what lets
  `/privacy.html` say the request reveals nothing about the visitor's
  application. Do not append a query string to it.
- **Ordinary caching, not `force-cache`.** Measured 2026-09-10: the file is
  320KB raw and **69KB gzipped**, which is what GitHub Pages actually sends,
  against `max-age=600`. `force-cache` returns a cached copy fresh or stale
  and only hits the network when there is no entry at all, which turned that
  ten-minute cache into an unbounded one: a returning visitor would go on
  matching against whatever database their browser was holding, weeks after a
  refresh. The default respects max-age and revalidates on the ETag.
- **Version matching is `Gem::Version`, not semver and not string comparison**,
  and `~>` is bounded by `Gem::Version#bump`. A requirement string can hold
  several comma-separated constraints that are ANDed; splitting them into
  separate entries would OR them and mark patched applications vulnerable.
  `test/eol-lockfile.test.mjs` holds all of this.
- **An advisory with no `patched_versions` matches every version.** 99 of them
  are in that state. Treating an empty list as "nothing is affected" silently
  drops the advisories a client can do least about.

The block renders only once a file has been dropped. A visitor who only picks
two versions gets byte-identical output to the page that shipped before this
existed, and there is a test that says so.

**It sits directly under the two version records, ahead of both the trap and
the upgrade path, and that order is the buyer's rather than the engineer's**
(moved 2026-09-10). An engineer reads down to the ladder because the hops are
the work. A CISO stops at the first concrete thing, and named CVEs against gem
versions this application actually pins are evidence out of the reader's own
repository, where "structurally trapped" and "six version hops" are
characterisations of a situation.

The whole finding therefore runs:

1. **Rails and Ruby records.** Days without vendor security patches.
2. **Published advisories.** What that has already let in.
3. **Structurally trapped.** Why one bump does not fix it.
4. **Required upgrade path.** The sequence that does.
5. **Controls implicated.** The language for the memo that follows.

`eol-lockfile.test.mjs` asserts all of it, so moving a block fails the suite
rather than passing quietly.

**What the page still cannot do, and the copy must keep saying so:** resolve the
`Gemfile` against a target Rails. That is the paid assessment. It is also why
the CTA now says a resolver alone will not answer the question either: it
catches gems that declare a version ceiling and stays silent on abandoned ones
whose constraints are open-ended, which was verified against `paperclip` (last
released 2018, resolves cleanly against Rails 8.1 because its gemspec says
`activemodel >= 4.2.0`).

**The CTA also carries the supported-series argument** (added 2026-09-14). The
advisory table above it answers "what has already been published against your
pinned versions". The missing half was what happens next, and it is this: upstream
fixes are written for supported series only, so an end-of-life application collects
advisories whose "Fixed in" column it can never reach.

CVE-2026-66066 is the worked example and it is there because it is checkable in
under a minute: the rubyonrails.org security announcement of 2026-07-29 lists the
fixed versions as 7.2.3.2, 8.0.5.1 and 8.1.3.1 and nothing older, and exploitation
in the wild was reported 2026-08-31. The copy says "no upstream fix to install",
not "no fix at any price", because backports are sold for exactly these series and
the stronger phrasing would be false.

**The paragraph appears twice**, once in each branch of the `web3forms_key`
condition, and the two must not drift. Nothing about it weakens the page's standing
disclaimer: it is still not a vulnerability scan, and this paragraph describes a
published advisory rather than anything read out of the visitor's own code.

### The data lives in `_data/eol.yml`, not in the JavaScript

Version tables, target versions and the eight control citations render from
`_data/eol.yml` through `jsonify`. Change the dates there and the tool changes
with no JavaScript edit.

**Re-verify before any campaign. The next scheduled change is Rails 8.0 reaching
end of life 2026-11-07**, which alters what the tool says. Bump `verified:` when
you check; the footer date reads from it, so the page cannot claim a
verification that did not happen.

### The two lead forms

`/eol/` and `/contact` each carry a lead form, **deliberately not identical**.
Both open with the booking link, because a booked call converts better than a
form fill; both then offer the form as the alternative. Both are gated on
`web3forms_key` and fall back to LinkedIn, and both ask name, work email,
company (required), what is forcing the timeline, and a free-text field.

Company is required so a prospect row can be opened and screened against the
non-compete before anyone replies.

The one real difference is the Rails version. `/contact` has to ask, so it
renders a dropdown from `_data/eol.yml`. `/eol/` already knows, because the
visitor just picked it, so it attaches `Rails x / Ruby y` as a hidden `versions`
field and puts it in the subject line. **Do not add a version dropdown to
`/eol/`**, which would ask a question the page has already answered.

The forcing-event options **must stay worded identically in both**, because the
replies land in one inbox and are read as one list.

The `web3forms_key` gate matters: without it the form posts nowhere, writing
submissions to the browser console while telling the visitor they are on their
way. If the key needs replacing, create it at <https://web3forms.com/> **using
the public alias**, because submissions are delivered to whichever address
created the key.

### There is no submit button

Removed 2026-09-10. Every number on the page is worked out locally in under a
millisecond, so a Check exposure button was asking the visitor to confirm
something the page already knew, and the drop zone did not ask: it redrew on
drop. One of the two had to change.

Three things had to be handled that the button handled for free, and all three
ended up better than they were:

- **History.** See "The selection lives in the URL" below. The entry is
  deferred; the render is not.
- **The announcement.** `#out` used to carry `aria-live="polite"`, which was
  tolerable when a button meant one announcement per deliberate press. With
  the finding following the fields it would read every table out again on
  every change. The live region is now `#summary`, a one-line restatement of
  the finding, which is quieter and more useful than a re-read of the whole
  document.
- **The phone.** The panel stacks above the finding on a narrow screen, so a
  dropdown change would otherwise update something entirely below the fold and
  look like nothing happened. `#summary` is what visibly changes in view.

**The mismatch state is now something visitors see mid-edit**, because moving
between two valid pairs takes two `change` events and the pair in between is
usually incompatible. That is accepted, not overlooked: the block and the
summary both name the exact problem and the exact fix ("Rails 6.1 does not run
on Ruby 3.4. It caps at Ruby 3.0"), so it reads as a nudge rather than an
error. Do not "fix" it by auto-correcting the other dropdown: the
incompatibility IS the compatibility trap, and it is the best technical
argument on the page.

### The selection lives in the URL

`/eol/?rails=7.2&ruby=3.3` renders that finding on load, and settling on a
pair writes it back into the address bar. That is what lets a finding be
**linked rather than only reproduced**: pasted into a ticket, sent to the
auditor who asked for it, bookmarked before a review. Printing remains the way
it leaves the browser; the link is how it gets forwarded.

Five rules hold it together, and the tests in `eol-url.test.mjs` are what keep
them true:

- **A query string, not a path.** The site is static and every number is worked
  out in the browser, so `/eol/7.2/3.3/` would mean generating 165 pages to say
  what one page already says.
- **The history entry is deferred, the render never is.** A `change` redraws
  the finding at once; the entry is written only once the pair has been left
  alone for `SETTLE_MS` (1.5s), and only if it differs from the last settled
  pair. That is what stops one trip through a dropdown burying the page the
  visitor arrived from, keeps the incompatible pair you pass through on the
  way to a choice out of history, and keeps two identical adjacent entries
  off the stack. The address bar can therefore trail the finding by up to
  1.5s, which is invisible: a URL gets copied after somebody has settled on a
  version, not during.
- **The canonical link in the head stays a bare `/eol/`.** No combination is a
  page of its own, and none should be indexed as one.
- **An unadorned `/eol/` stays unadorned.** The starting selection is an
  example, not an answer, and stamping it into the address bar would hand a
  first-time visitor a link to a finding they never asked for. The URL gains
  parameters when a selection settles, or when they arrived on a link.
- **A version the page does not list falls back to the default**, and a link
  naming only one of the two is completed with `replaceState` rather than
  pushed. Back must not return a visitor to a URL they never chose. A URL
  carrying nothing this page recognises, a campaign tag say, is left alone.

Checks push, so Back and Forward walk the combinations someone has compared.
`history` is wrapped in a `try`, because a copy of the page saved and opened
from disk has nowhere to write: the finding still renders, only the address bar
does not follow.

### Printing is the delivery mechanism

The page prints itself through the `@media print` block in `site.css`: it forces
the light palette (a dark-theme visitor would otherwise print a black page),
swaps the masthead for a letterhead naming the versions and the date, hides the
form and nav, and controls where the finding breaks across pages. Those rules
are scoped to `body.eol`, which `eol.html` sets. A typical finding runs two or
three pages.

**The letterhead carries a link back to the exact finding**, added 2026-09-10:
`Check or update this finding at reidmorrison.com/eol/?rails=6.1&ruby=3.0`.
Until then the printout was a dead end. The document exists to be forwarded,
an engineer prints it for the auditor or for the executive who signs the
remediation plan, and the person it landed on had no way to check it, change a
version, or find who produced it.

Three details, all deliberate:

- **The full finding, not the bare domain.** A recipient reproduces what they
  were sent rather than landing on the defaults.
- **Built from render()'s own arguments, never from `location`.** The address
  bar trails the finding by up to 1.5s while a selection settles, so reading
  the URL would let somebody print a document whose figures and whose link
  disagree. `eol-url.test.mjs` asserts exactly that case.
- **A real anchor, and the one link on the printed page that keeps its
  styling.** Most people print this to PDF and forward that, where it stays
  clickable. The scheme is dropped from the visible text (nobody types it) and
  kept in the `href`.

**The measure is pinned at `178mm`, and that is what makes the finding print
from a phone.** iOS lays a page out at one width and scales the result onto the
sheet: measured on two PDFs of the same finding, an iPhone renders this document
1.148x larger than a Mac does from identical CSS, so a phone needs roughly a
third more vertical space for the same content. Rails 7.1 on Ruby 3.3 is a
two-page finding on a desktop and a just-over-two-page finding on a phone, and
just past two pages the print preview repaginated from three pages back to two
and dropped everything after the cut. A measure in absolute units leaves that
pass nothing to rescale. **Do not return `.eol .page` to a percentage, a
`max-width` or `auto`.** The truncation comes back, and it comes back
invisibly: no gap on the page, half the controls gone, the sources, the
disclaimer and the entity line gone, under a pill still promising eight
references. 178mm is A4's content box, the narrower of the two
`@page{margin:16mm}` produces; Letter's is 184mm, so it fits both.

**Two cards break across pages and the rest do not.** The controls table and the
upgrade ladder can each outgrow a sheet, and a box taller than the page it may
not break across is clipped rather than broken. So `.record--controls` and
`.record--path` break, and `break-inside:avoid` is asserted one level down
instead, on a table row and on a rung, neither of which can outgrow a page.
`thead{display:table-header-group}` repeats the column labels on the
continuation. Every other record is short by construction and still moves whole.
Those two classes exist for the print block and for nothing else.

**`.stack` and `.ladder` print as block flow, not flex.** WebKit fragments a
column flex container unreliably. Both are flex on screen; print takes them out
of it and spaces them with margins.

The letterhead is typographic: the shield from `_includes/logo-mark.svg` beside
"Reid Morrison" over "EOL REMEDIATION" on the 2px rule. **The shield's fills
come from `--logo-ink` and `--logo-accent`, set on `.brand-mark` in
`topbar.css` rather than on `:root`, so the print block's palette reset in
`site.css` does not reach them.** `topbar.css` restates them for print at the
same specificity as its dark rules. Remove that and a dark-theme visitor prints
a near-white shield onto white paper.

The footer prints with the finding and carries the entity line, so the document
names who produced it.

**Do not describe the printed output as one page**, and **do not use the word
"signed"**: the page's own footer states it is not a compliance opinion, and the
two claims contradict each other.

### Things it deliberately does not do

- No email delivery, no autoresponder, no server-side PDF generation. Adding any
  of those means adding the sender to the SPF record at GoDaddy, which since
  2026-09-15 is Microsoft 365 only and ends in `-all`, plus its own DKIM.

### The tests read the data file, and nothing else

`node --test` from the repository root. Node's own runner, no packages, no
`package.json`, no gems beyond the ones the site already needs. The suite builds
the site into `test/.site` (gitignored, and `test` is in `exclude:`), lifts the
inline script out of the generated `/eol/index.html`, and runs it unmodified in
a `node:vm` context against a DOM stub.

**The rule the suite exists to enforce: no test states a date, a version, a
ceiling or a control number of its own.** Every expectation is derived from
`_data/eol.yml`, parsed by Ruby so the tests see exactly what Jekyll sees. A
test that repeated a value from the data file would keep passing after that
value changed, which is the whole failure mode: the data file moves, and the
tool has to move with it.

Four things to know before editing a test:

- **The clock is pinned on every load.** Every headline number is a distance
  from today, so a fixed `now` makes a day counter and a status pill exact. It
  is also how a state the calendar has not reached is tested:
  `loadCalculator(utc(rec.eol, -89))` puts the page one day inside its warning
  window. Nothing in the suite depends on the day it runs.
- **The upgrade ladder is checked against its rules, not against a second copy
  of itself.** Listing expected hops would assert only that two implementations
  agree, and would need rewriting every time a date moved. Instead every Rails
  hop must be to the next series in the file and only once Ruby clears that
  series' floor, every Ruby hop must stay under the current series' ceiling, and
  the walk must end on both targets.
- **The build cache is taken under a lock.** `node --test` runs each file in its
  own process, so `test/.site` is shared state, and Jekyll
  empties its destination before it writes. `helpers/site.mjs` lets one process
  build while the others wait on `test/.site.lock`. Without it, three concurrent
  builds mean one process reading a page another just deleted, failing about one
  run in three after any edit to an input.
- **`eol-data.test.mjs` covers what the calculator assumes about the data**, not
  the calculator itself: the series are in ascending order (the ladder reads
  `RAILS[i + 1]`), each series can carry Ruby high enough to reach the next one,
  and the targets exist and run together. An edit to `_data/eol.yml` can break
  the page without touching a line of code, and that file is where it is caught.
- **`eol-url.test.mjs` covers the address bar**, and it asserts the round trip
  rather than the string: a check writes a link, a load reads it back, and the
  markup the second page produces must equal the markup the first one showed.
  Every combination in the data file goes round, so the case list grows with the
  data and never restates a version.

Three deliberate exceptions to the rule above, all of which can only fire on a
regression: the 90 day warning window, which is the page's threshold and not the
data's; a test asserting that no control has regressed to PCI DSS 4.0, 164.312
or CC6.1; and the 45 day staleness limit in `eol-freshness.test.mjs`, which is a
statement about the refresh rather than about the data.

**The five pre-2.4 Ruby branches (1.9.3, 2.0.0, 2.1, 2.2, 2.3) are deliberate.**
Rails 4.2 caps Ruby at 2.3 and the 5.x series require 2.2, so without them the
oldest series on offer cannot produce a finding at all. Do not prune them for
looking obsolete: an application still on Rails 4.2 is the most exposed reader
this page has.

**Ruby 4.0 has no compatible Rails, and that is correct.** It sits above every
series ceiling because no Rails release supports it. It stops being an orphan
when a Rails series raises its `max`, with no change here.

## The elapsed counter is the signature element

On `/eol/`, days without vendor security patches is the headline of each version
record: mono, tabular figures, up to 66px, in the critical colour.

That number is the entire argument of the page, it is the thing someone
screenshots into their own internal thread, and it survives into the printed
finding at 34pt. **Do not demote it into a table row.**
