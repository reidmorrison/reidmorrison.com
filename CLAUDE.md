# reidmorrison.com

The website for **Reid Morrison Inc.**, served by GitHub Pages at the apex
domain `reidmorrison.com`. Jekyll, markdown pages, no build step beyond what
GitHub Pages runs itself.

## What this site is for

**This is a commercial site. It is not a personal site and it is not a
portfolio.** It generates and qualifies leads for a fixed-price engineering
practice with three entry points: EOL remediation for regulated mid-market
companies, which is the reason `/eol/` exists; scalability and performance on
Rails and Elixir; and AI enablement for engineering teams. The last two were
added 2026-10-01.

**The site leads with the firm, then lets the visitor choose a door** (decided
2026-10-01, reversing an earlier draft that kept the home page EOL-led and
tucked the new lines into `services.md`). The home page says what the firm does,
for whom and why it is different, then shows three cards, one per problem, each
linking to that line's own page: `remediation.md`, `scalability.md`,
`ai-enablement.md`. `services.md` is the hub for what the three share. `/eol/`
stays the EOL tool and is not generalised. No page above the line pages may
read as EOL-only, and the wordmark sub-line names what all three share.
The research behind the order: buyers of professional services check the site
to decide what kind of firm this is, rule most providers out without talking to
them, and rank expertise and past performance highest (Hinge Research
Institute); multi-line Rails firms (Test Double, Evil Martians) lead with the
firm and route by service card, single-line ones (FastRuby, Speedshop) lead with
the problem.

**For EOL the buyer is a CTO, CISO or VP Compliance, not a VP Engineering**; for
the two newer lines it can be the CTO or VP Engineering who owns the outage, the
bill or the seats. Every line sells the removal of a named, measured problem
with an owner, a budget and a date, never "technical debt". The engineer is the
internal advocate who forwards the finding, not the signer.
Every page answers "why should I trust this vendor with a system under audit",
never "why should I hire this person".

Jobs, in priority order:

1. **Generate qualified leads.** The home page routes each visitor to the line
   page for their problem. `/eol/` is the EOL line's lead magnet and still the
   most valuable single page.
2. **Sell the assessments.** The Remediation Assessment and the Scalability
   Assessment, $12,500 each, two weeks. The Engineering Throughput Review is
   described but **carries no price on any page** until the business repo's
   `offer-and-pricing.md` publishes one.
3. **Establish credibility.** The open-source libraries are the proof, not the
   product: 11 gems, 81M+ downloads, and public commits a prospect can audit
   before signing. Frame them as evidence of how Reid works, never as a
   portfolio of things he has made.
4. **Hold a place for future writing.** The blog is scaffolded but empty, and
   there is no writing index page. Do not invent posts for it.

The business runs out of `~/Business/reid_morrison_inc` (moved out of `~/Documents`
on 2026-09-15). That folder
holds the strategy and the commercial constraints, and this repo must not
duplicate any of it. What the two repos share about the site (the procurement
line, the open-source counts, the booking test, the `/eol/` rules) lives in one
file both read:

@.claude/business-context.md

`title`, `tagline` and `description` in `_config.yml` are read by
`jekyll-seo-tag` for every page, so they decide how the site appears in search
results and link previews. If they ever describe a person looking for work
rather than a practice selling a service, that is a bug.

### Open work

- **The certificate of insurance**, on `/security` and `/contact`, waits on E&O
  being bound. The rest of the procurement line has shipped; see "The
  procurement line" in `.claude/business-context.md`. An HTML comment on both
  pages holds the detail, and each points at the other.
- ~~A `Gemfile.lock` drop zone on `/eol/`~~ **Shipped 2026-09-09**, with the
  advisory matching that made it worth building. See "The `Gemfile.lock` drop
  zone" in `.claude/rules/eol.md`. What is left is operational: re-run `script/advisories.mjs` on a
  schedule so the database on the page does not go stale.

## Email addresses are never published on this site

- The Web3Forms key already encodes the destination, so nothing here needs to name
  it.
- **No address appears in the markup**, ever. No `mailto:`, no obfuscation
  trick. Every route to Reid is a form or a booking link. If a form backend is
  unavailable, link LinkedIn rather than printing an address.
- **Do not reintroduce an address anywhere in this repo**, including comments,
  commit messages, and this file. Refer to "the public alias" instead.
- **`booking_url` is a Google Calendar appointment link and carries no address.**
  Microsoft Bookings sits parked in a commented block directly beneath it in
  `_config.yml`, disabled 2026-09-19 because its verification-code email is
  rejected outright by iCloud and junked by Gmail, and that code cannot be
  turned off on a personal booking page. **That parked URL is the one string in
  this repo shaped like an address, and it is not one**: Microsoft builds a
  personal booking link as `<mailbox Exchange GUID>@reidmorrison.com`, so the
  local part names nobody and cannot receive mail. **Do not "fix" it by deleting
  it.** If booking ever moves back, check the local part is still a GUID, and
  never accept a shared Bookings page, which publishes a real mailbox as
  `outlook.office365.com/book/<smtp address>/` and genuinely would break this
  rule.
- **If booking ever moves back to Microsoft, the host must be `outlook.live.com`,
  and a re-share will silently break it.** Bookings now emits
  `bookings.cloud.microsoft`, and Safari Private Browsing strips the `anonymous`
  parameter from any navigation a page starts to that host, so the prospect
  lands on a Microsoft sign-in page with no guest option. `outlook.office.com`
  and `outlook.office365.com` fail the same way. Chrome reaches the guest view
  on every host and Reid's signed-in Safari does too, so **this can only be
  caught by clicking the button in a Safari private window**. The full test
  matrix and the re-test procedure are in the parked block under `booking_url`
  in `_config.yml`. The Google link has no query string, so nothing about it is
  exposed to this failure.

## Repository facts

- Repo: `reidmorrison/reidmorrison.com`, **public**. Public rather than private
  because GitHub Pages from a private repo requires a paid plan and this account
  is on Free.
- Pages source: `main` branch, `/` (root).
- Custom domain via the root `CNAME` file.

## Where detail lives

File-specific guidance is in `.claude/rules/`, each file loading only when its
paths are touched: `eol.md`, `styling.md`, `brand-assets.md`,
`security-page.md`, `privacy-analytics.md`, `projects.md`. The prohibitions
below stay here because they must hold whatever file is open.

Single sources of truth: `_data/eol.yml` (EOL dates, ceilings, control
citations), `_data/projects.yml` (libraries and download counts),
`_includes/doors.html` (the three cards, so `index.md` and `services.md` cannot
describe the lines differently), and `site.entity` in `_config.yml` (the
contracting facts every footer renders).

## Rules that hold everywhere

- **Colours are changed in `rm-docs-theme`, never here**, and component rules
  use tokens, never literal hex. The doc sites never get commercial chrome.
- **The wordmark sub-line names what all three lines share**, never only one.
- **`/security.html`: every claim was confirmed by Reid.** Add nothing that has
  not been through the same check, and never a zero-retention claim.
- **Adding any embed, font, script or analytics tool means adding a row to the
  `/privacy.html` table in the same commit.** Nothing may set a cookie or write
  to browser storage. Cloudflare DNS stays untouched.
- **`/eol/`: no per-gem rubygems.org calls, ever; no server round trip; it
  always says it is not a vulnerability scan; never describe the printout as one
  page, and never use the word "signed".**
- **Never hardcode a project, a download count or a documentation URL.** The 81M
  total is written in prose in several places and is changed by hand.

### Front matter the layout understands

- `title` sets the browser tab and search result, and is the `h1` fallback.
- `heading` overrides the `h1`. Use it when the selling headline is a full
  sentence and the tab should stay short.
- `eyebrow` renders a small mono label above the `h1`.
- `standfirst` renders the lead paragraph under it.
- `redirect_from` (from `jekyll-redirect-from`) keeps a retired URL resolving.
  Only `remediation.md` uses it, for `/assessment.html`. **If that redirect is
  removed, remove the plugin with it.**

`_layouts/default.html` outputs `page.title` as the `h1`, so pages start at
`h2`. Do not open a page with a heading repeating its own title. There is no
JavaScript in the layout.

## Page-specific rules

### `about.md`

The page sells judgement rather than capacity: an upgrade under audit is a risk
purchase, the market is full of people with the same tooling and no scar tissue,
and the public gem commits let a prospect audit how Reid works before signing.
The regulated-systems history is evidence for that argument, not a career
summary. It carries no "Find me" list; GitHub and LinkedIn are in every footer,
and the page ends on a call to action.

### The line pages (`remediation.md`, `scalability.md`, `ai-enablement.md`)

Each sets `nav_parent: services.html`, so "Services" stays lit in the bar, and
each has its own link preview card. Each CTA links `/contact.html?line=eol`,
`performance` or `ai`, which preselects the form's "What brings you here?"
field in the browser.

`remediation.md` holds what `services.md` held for EOL until 2026-10-01 (the
old assessment page before that), and these three must not be lost if it is
ever re-split:

- **The controls table**, rendered from `site.data.eol.controls`. Those are the
  eight verified citations and they are the compliance wedge. `/eol/` is the
  only other page that renders them, and that page is written for an engineer.
- **The underwriting argument** ("it is underwriting rather than a sales step,
  and it is why we can hold a fixed price afterwards"), which is why the
  assessment is not a discovery call with an invoice attached.
- **The long-form deliverable list.**

Two more things must not be lost, on `scalability.md`, `ai-enablement.md` and
the second "What we do not do" box on `services.md`, because they are insurance
positions rather than copy (the business repo's `CLAUDE.md`, "Never do these"):

- **The acceptance rule**: performance work is fixed against a target measured
  in an agreed environment, and production is reported, never promised. Nothing
  on this site may promise a response time, a cost saving or a productivity gain.
- **"It reviews the workflow, never the people"**, on `ai-enablement.md` and
  in the second "What we do not do" box.

## The nav

No "Home" item: the wordmark is the home link. The order is Services, EOL
Check, Security, Open Source, About, then Contact as the outlined call to
action. Services leads since 2026-10-01 so the bar does not read as one line.

`topbar.css` records that the bar holds one line down to about 880px at the
floor sizes (820px before the sub-line grew on 2026-10-01), and that budget is
spent: **adding another nav item means removing one.**

The three line pages sit under Services through the `nav_parent` front-matter
key, rather than growing the bar.

## The footer

Two rows on every page: the entity line (name, form and address), then the link
row, `Privacy - GitHub - LinkedIn` with the copyright opposite.

- **Every value comes from `site.entity`.** Nothing in a layout or a page
  retypes the name or the address.
- **`/eol/` carries the same block** in its own footer. Unlike the rest of the
  site, **that one prints**: a finding forwarded to an auditor has to name who
  produced it. The Privacy link inside it is wrapped in `.print-hide`, since
  print strips link styling and it would otherwise print as a word with nowhere
  to go.
- The entity line is a full-width row rather than a third item in the flex row.
  Folded in, the address wraps against the copyright on a laptop.

**No RSS link.** `jekyll-feed` stays enabled and `{% feed_meta %}` stays in the
head, so `/feed.xml` exists at a stable URL and a reader can discover it. But
`_posts/` is empty, so a buyer who clicks RSS gets a blank XML file. When the
first post ships and `/writing/` gets an index page, the RSS link belongs on
that index, not in the global footer.

## Content rules

- **Voice: the commercial pages speak as the company, and only two pages speak
  as Reid.** `index.md`, `services.md`, `contact.md`, `security.md` and the
  selling copy inside `eol.html` say "we", because the counterparty is Reid
  Morrison Inc. `about.md` and `open-source.md` stay first person, because the
  experience and the libraries are Reid's and that is the point of those pages.
  Naming him inside company voice is fine and often better ("Reid does the work
  himself", "Reid replies personally"); what may not happen is a commercial page
  reading as though an individual is contracting.
- **No em dashes.** Use commas, colons, parentheses, semicolons, or separate
  sentences. This applies to every page.
- **Do not invent facts.** Talk titles, dates, metrics and links must come from
  Reid. Unknowns get a `.needs-input` block, not a plausible guess.

## `.needs-input` blocks are scaffolding and must not ship

`<div class="needs-input" markdown="1">` holds a question for Reid in place of a
guessed fact. It renders as a **visible orange dashed box labelled "TO FILL
IN"**, so it is safe to leave in a draft and fatal to publish.

**No page carries one right now.** The rule stands for the next one: before
pointing the custom domain at this repo, or before announcing the site, check

```sh
grep -rn "needs-input" --include=*.md --include=*.html .
```

That must return nothing but the CSS rules in `stylesheets/site.css` and this
file. Delete the whole `div`, not just the class.

## Local development

`node --test` from the repository root runs the `/eol/` suite. There is no
`package.json` and no dependencies.

## DNS (GoDaddy)

Nameservers are `ns27`/`ns28.domaincontrol.com`.

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| AAAA  | @    | 2606:50c0:8000::153 |
| AAAA  | @    | 2606:50c0:8001::153 |
| AAAA  | @    | 2606:50c0:8002::153 |
| AAAA  | @    | 2606:50c0:8003::153 |
| CNAME | www  | reidmorrison.github.io |

**Do not touch the MX records.** Keep GoDaddy domain forwarding off, otherwise
it reinstates its own apex A records.

The six documentation subdomains (`logger`, `encryption`, `rocketjob`, `config`,
`iostreams`, `minion`) are CNAMEs to `reidmorrison.github.io` served by their
own repos. This site does not affect them, and they must keep working.

Set the custom domain in Settings, Pages, then enable **Enforce HTTPS** once the
certificate provisions.

## Related repositories

Each has its own `docs/` directory with an independent Pages site:

| Repo | Domain |
|------|--------|
| `semantic_logger` | logger.reidmorrison.com |
| `symmetric-encryption` | encryption.reidmorrison.com |
| `rocketjob` | rocketjob.reidmorrison.com |
| `secret_config` | config.reidmorrison.com |
| `iostreams` | iostreams.reidmorrison.com |
| `parallel_minion` | minion.reidmorrison.com |

Known inconsistency: `rails_semantic_logger` and `rocketjob_mission_control`
still advertise `rocketjob.io` homepage URLs on GitHub.
