# reidmorrison.com

The website for **Reid Morrison Consulting**, served by GitHub Pages at the apex
domain `reidmorrison.com`. Jekyll, markdown pages, no build step beyond what
GitHub Pages runs itself.

## What this site is for

**This is a commercial site. It is not a personal site and it is not a portfolio.**

It was Reid's personal site until August 2026, built to support a job search:
the home page opened with a bio, the About page was adapted from his LinkedIn
profile, and the whole thing was aimed at a hiring manager. **That purpose is
gone.** The site now exists to generate and qualify leads for an EOL remediation
practice selling to regulated mid-market companies.

If you find copy that reads like it is addressed to someone deciding whether to
employ Reid, it is a leftover. Fix it. The reader is now a CTO, CISO or VP
Compliance deciding whether to give a vendor production access to a system under
audit.

The business runs out of `~/Documents/Business/eol_remediation`; that folder
holds the strategy and the commercial constraints, and this repo must not
duplicate any of it.

Jobs, in priority order:

1. **Generate qualified leads.** `/eol/` is the lead magnet and the most
   valuable page on the site. Everything else exists to make it credible.
2. **Sell the assessment.** $12,500, two weeks. See "Commercial rules" below for
   what may and may not be published.
3. **Establish credibility.** The open-source libraries are the proof, not the
   product: 11 gems, 77M+ downloads, and public commits a prospect can audit
   before signing anything. Frame them as evidence of how Reid works, never as a
   portfolio of things he has made.
4. **Hold a place for future writing.** The blog is scaffolded but empty, and
   there is no writing index page. Do not invent posts for it.

**The buyer is a CTO, CISO or VP Compliance, not a VP Engineering.** The site
sells the removal of a named compliance finding, not "technical debt". The
engineer is the internal advocate who forwards the finding, not the signer.

### Site identity lives in `_config.yml`

`title`, `tagline` and `description` there are read by `jekyll-seo-tag` for
every page, so they decide how the whole site appears in search results and link
previews. They carried the job-search positioning until 2026-08-28. If they ever
describe a person looking for work rather than a practice selling a service,
that is a bug.

### Rebuild in progress

The full plan, its reasoning and the sequencing are recorded outside this repo.
Shipped: `/eol/` with its data file, sitemap, the site-wide retheme, and the
page set: a home page that sells the finding, `/assessment`, `/contact`,
`/open-source`.

Still to do:

- **A security posture page.** How client code is handled, where it lives, what
  is retained, laptop encryption, credential handling. The plan calls having
  this unprompted a differentiator, and the question always comes.
- **Set `booking_url`.** Every page pushes toward a video call, but no booking
  link exists yet, so the contact form is currently the only route. Nothing
  renders a booking button until this is set.
- **A social share image.** Link unfurls for `/eol/` are text-only.
- **Version numbers in the `/eol/` URL**, so a finding can be linked rather than
  only reproduced.

`/eol/` keeps its own self-contained shell. It now matches the rest of the site
visually, so folding it into the shared layout is optional cleanup, not a fix.

## Commercial rules that constrain content

These come from the business plan and are not stylistic preferences. Breaking
one costs real money.

- **Publish the $12,500 assessment price. Never publish sprint or upgrade
  prices**, in any form, including ranges or "starting from". Upgrade cost is
  dominated by dependency mess that cannot be seen from outside, so a published
  range invites anchoring at the bottom.
- **Never publish an hourly rate**, or anything a rate can be derived from,
  including how long the work takes relative to what it costs.
- **Do not name competitors** or run price comparisons on the site. A referral
  relationship with the Rails upgrade agencies is still an open question, and a
  public comparison closes it.

  **One deliberate exception:** `/eol/` credits the FastRuby compatibility table
  in its sources footer, because that is genuinely where the Ruby version
  ceilings come from. Citing a source you rely on is not positioning against
  someone, and stripping the credit while keeping their data would be worse. Do
  not "fix" this in either direction without a reason.
- **Verified citations only.** PCI DSS **4.0.1**, never 4.0 (retired
  2024-12-31). HIPAA **164.308(a)(1)(ii)(A)-(B)**, never 164.312. SOC 2
  **CC7.1 with CC6.8**, never CC6.1. These specific errors regenerate; check
  against `_data/eol.yml`, which is the one home for them.
- **This repository is public, and so is its history.** Anything committed and
  later reverted stays readable. No business documents, no prospect names, no
  draft pricing, no client references.

## Email addresses are never published on this site

Reid's own address stays private. Mail runs through iCloud custom domain, which
allows three sending addresses per domain plus an "Allow All Incoming Messages"
catch-all for receiving at any address.

- **`sales@reidmorrison.com` is the destination for everything public.** It is
  where form submissions land.
- **No address appears in the markup**, ever. No `mailto:`, no obfuscation
  trick. Every route to Reid is a form or a booking link. If a form backend is
  unavailable, link LinkedIn rather than printing an address.

## Repository facts

- Repo: `reidmorrison/reidmorrison.com`, **public**.
  Public rather than private because GitHub Pages from a private repo requires a
  paid plan and this account is on Free.
- Pages source: `main` branch, `/` (root). Not `/docs`, because this repo only
  contains the site.
- Custom domain via the root `CNAME` file.

## Layout

```
_config.yml            Site config. kramdown settings mirror the doc sites.
                       Also holds web3forms_key, which gates the /eol/ form.
_data/projects.yml     THE source of truth for the library list. Edit here.
_data/eol.yml          THE source of truth for Rails/Ruby EOL dates, version
                       ceilings and control citations. Drives /eol/.
eol.html               The EOL exposure check, served at /eol/. Self-contained,
                       does not use the shared layout. See below.
_layouts/default.html  Shared shell: sticky top bar, page title, footer.
                       Renders page.title as the h1, so pages must NOT repeat
                       their own title as a leading heading.
_layouts/post.html     Blog post wrapper. Date line, then content.
_posts/                Empty. Blog scaffold only, with no index page.
index.md               Home. Sells the finding. The library list moved OUT of
                       here to open-source.md in the step 5 rewrite.
assessment.md          The $12,500 product page. Renders the control table
                       from _data/eol.yml, so citations have one home.
contact.md             Qualifying form plus optional booking link. The Rails
                       version dropdown is generated from _data/eol.yml.
open-source.md         The library list, generated from _data/projects.yml.
about.md               Professional bio. See the prose constraint below.
talks.md               Conference talks. Not in the nav; linked from About and
                       from open-source.md.
404.html               Links back to the doc sites.
_includes/topbar.html  The top bar and wordmark markup. Included by the
                       shared layout AND by eol.html, so the nav has one home.
stylesheets/site.css   The site stylesheet. See "Styling".
stylesheets/topbar.css The top bar, in its own file because two shells use it.
images/                favicon.ico, apple-touch-icon.png, reid-morrison.jpg.
                       header-banner.jpg is unused since the retheme.
```

## Styling

**Retheme landed 2026-08-28.** The site now uses the design system built for the
EOL exposure check: **Spectral** for display, **IBM Plex Sans** for body, **IBM
Plex Mono** for labels and data, a muted navy accent, and semantic critical /
warning / ok colours kept separate from that accent. All of it lives in one
file, `stylesheets/site.css`.

### What this replaced, and why

The stylesheet was previously copied verbatim from `semantic_logger/docs/` so
this site looked like part of the documentation family, and was kept diffable
against the upstream file. **That is over.** The doc sites serve engineers
reading API documentation; this site serves someone deciding whether to trust a
vendor with production access to a system under audit. Those are different
rooms and they are allowed to look different.

Deleted in the retheme, all previously copied from the doc sites:
`stylesheet.css`, `normalize.css`, `github-light.css`, `pygment_trac.css`,
`print.css`, `table.css`, and the placeholder `javascripts/main.js`. They are in
git history if any of it is ever wanted back.

The **blue and orange gradient wordmark was retired** with them. It was built
for a dark photographic banner that no longer exists, and `/eol/` had already
set the plain Spectral wordmark. This was a change from the rebuild plan, which
had suggested keeping the wordmark for continuity; the doc sites keep it, and
this site does not.

### The wordmark

Typographic, no logo file, no monogram. "Reid Morrison" in Spectral 700, "EOL
Remediation" in letterspaced mono in the accent colour, over a **2px rule**.

That rule is the point. It is the same device that sits under every page title,
so the mark reads as part of this site rather than something dropped onto it. A
monogram block and a boxed "stamp" treatment were both tried and rejected as
generic. **If you change the masthead rule, change the wordmark rule with it**,
or the rhyme breaks and the mark starts looking arbitrary.

Honest limitation, recorded so nobody mistakes it for a moat: nothing here is
proprietary. Three Google Fonts, about twenty hex values, and public CSS. It is
reproducible from view-source in an hour. What would actually make it defensible
is a licensed display face and a drawn mark, neither of which exists yet.

### The icons

**Replaced 2026-08-28.** The previous `favicon.ico` and `apple-touch-icon.png`
were copied from the documentation sites and were **the Rocket Job rocket ship**.
A cartoon rocket was the tab icon a compliance buyer saw.

They are now a white Spectral **R** on the accent navy, with the wordmark's rule
returning at larger sizes.

- `favicon.ico` carries 16, 32 and 48px. `favicon-32.png` serves browsers that
  prefer PNG. `apple-touch-icon.png` is 180px, square and unrounded, because iOS
  applies its own mask.
- **The artwork differs by size on purpose.** 16 and 32px are the letterform
  alone; the accent rule only appears from 48px up, where it can be seen. Do not
  "simplify" this into one scaled image, and do not add the rule at 16px, where
  it becomes a smudge.
- **The ground is navy, not ink.** Ink was tried first and disappears into a dark
  browser tab strip. Navy separates in both light and dark tabs and carries the
  brand colour. Verified against real Google and GitHub favicons in a simulated
  tab strip.
- An "RM" monogram and an abstract two-bar mark were both tried and rejected:
  "RM" is illegible at 16px and the bars read as a hamburger menu.

Regenerate with the scratch renderer if the accent ever changes; the letterform
is live text in Spectral, not a path, so it needs a browser to rasterise.

### The elapsed counter is the signature element

On `/eol/`, days without vendor security patches is set as the headline of each
version record: mono, tabular figures, up to 66px, in the critical colour. It
was a 26px row in a definition list.

This is deliberate and worth protecting. That number is the entire argument of
the page, it is the thing someone screenshots into their own internal thread,
and it survives into the printed finding at 34pt. Do not quietly demote it back
into a table row.

### Rules for this stylesheet

- **Themes must resolve in all three viewer states.** `:root` carries the
  complete light palette; `@media (prefers-color-scheme:dark)` guarded with
  `:root:not([data-theme="light"])` redefines only tokens; `:root[data-theme="dark"]`
  redefines them again. **Never declare a colour only inside a media block**, or
  it will not apply for a visitor whose OS setting is "system".
- **Style through tokens, never literal hex values** in component rules.
- Both `site.css` and `/eol/` force the light palette in `@media print`. A
  dark-theme visitor would otherwise print a black page, and pages here are
  meant to be printable and forwardable.
- The separator pseudo-elements (`.project-meta a + a::before`) need
  `display:inline-block`, otherwise the parent link's underline propagates into
  the middot and it renders as an underscore.

### Front matter the layout understands

- `title` sets the browser tab and search result, and is the `h1` fallback.
- `heading` overrides the `h1`. Use it when the selling headline is a full
  sentence and the tab should stay short.
- `eyebrow` renders a small mono label above the `h1`.
- `standfirst` renders the lead paragraph under it.

### The About page was rewritten, and the old constraint is lifted

`about.md` used to be adapted closely from Reid's LinkedIn About section so the
two voices matched, and this file previously said not to rewrite it without
asking. **Reid asked for the rewrite on 2026-08-28 and that constraint no longer
applies.**

What it argues now, so a future edit does not undo the point: the page sells
judgement rather than capacity. An upgrade under audit is a risk purchase, the
market is full of people with the same tooling and no scar tissue, and the
public gem commits let a prospect audit how Reid works before signing. The
regulated-systems history is framed as evidence for that argument, not as a
career summary.

It no longer carries a "Find me" list of profile links. GitHub and LinkedIn are
in the footer of every page, and the page ends on a call to action instead.

### The layout renders the page title

`_layouts/default.html` outputs `page.title` as the `h1`. Pages therefore start
at `h2`. When adding a page, do not open it with a heading repeating its own
title; `index.md`, `about.md`, `talks.md` and `404.html` each had one removed.

There is no longer any JavaScript in the layout. The old script measured the
banner's height to set `scroll-padding-top`; the slim bar has a fixed height, so
CSS handles it.

### The footer carries no RSS link

`jekyll-feed` stays enabled and `{% feed_meta %}` stays in the head, so
`/feed.xml` exists at a stable URL and a feed reader can still discover it.
**The visible "RSS" link was removed from the footer on 2026-08-28** and should
not come back there.

The reason is what it pointed at. `_posts/` is empty, so the feed is a valid
Atom document with no entries: a buyer who clicks RSS gets a blank XML file, on
the page set whose whole job is establishing that this vendor can be trusted
with production access. A footer RSS link is also a personal-blog convention, in
the same category as the doc-site stylesheet and the rocket favicon, and a
leftover from the same era. `/eol/` has its own footer and never carried one.

When the first post ships and `/writing/` gets an index page, the RSS link
belongs on that index, where the reader is already looking for a feed. Not in
the global footer.

## The EOL exposure check at `/eol/`

The lead magnet, and the highest-value page here. Moved into this repo
2026-08-27 from `eol-calculator.html` in the business folder; **this is now the
only live copy**. It carries its own complete design system (Spectral, IBM Plex
Sans and Mono, its own tokens, a full dark theme) and does **not** use
`_layouts/default.html`. That is deliberate until the site retheme lands.

### The data lives in `_data/eol.yml`, not in the JavaScript

Version tables, the target versions, and the eight control citations were
hardcoded in a `<script>` block. They now render from `_data/eol.yml` through
`jsonify`. Change the dates there and the tool changes with no JavaScript edit.

**Re-verify before any campaign, and note the next scheduled change: Rails 8.0
reaches end of life 2026-11-07**, which alters what the tool says. Bump
`verified:` when you check; the footer date reads from it, so the page cannot
claim a verification that did not happen.

### The lead form is off until an access key is configured

`web3forms_key` in `_config.yml` is empty. While it is empty the form is **not
rendered at all** and the page points at LinkedIn instead. This is deliberate:
the original file posted to `ENDPOINT=null`, which wrote submissions to the
browser console and lost them while telling the visitor they were on their way.

To turn it on, create an access key at <https://web3forms.com/> **using
`sales@reidmorrison.com`**, because submissions are delivered to whichever
address created the key. Paste it into `_config.yml`. The key is public by
design; it identifies a destination inbox and grants nothing.

The form asks for company and makes it required, so a prospect row can be opened
and screened against the non-compete before anyone replies.

### Printing is the delivery mechanism

The original offered "a signed one-page finding" as a PDF that did not exist and
had no way to be sent. Instead the page prints itself: `@media print` forces the
light palette (a dark-theme visitor would otherwise print a black page), swaps
the masthead for a letterhead naming the versions and the date, hides the form
and nav, and keeps records from breaking across pages. A typical finding runs
two or three pages.

**Do not describe the printed output as one page**, and do not reintroduce the
word "signed": the page's own footer states it is not a compliance opinion, and
the two claims contradict each other.

### Things it deliberately does not do

- No email delivery, no autoresponder, no PDF generation server-side. Adding any
  of those means SPF and DKIM records at GoDaddy alongside the existing
  iCloud-only SPF.
- No version numbers in the URL, so a finding cannot yet be linked. Worth adding.
- No social share image. Link unfurls are text-only.

## The project list

`_data/projects.yml` drives `open-source.md` and `404.html`, and `about.md`
pulls two download figures from it with `where`. Never hardcode a project, a
download count, or a documentation URL into a page.

`jruby-jms` and `sync_attr` are in the list because they are needed to reach 11
and are genuinely widely downloaded, but both are archived or long-finished.
They carry `status: stable`, which renders a muted card and describes them as
complete rather than actively developed. Do not present them as active work.

Deliberately excluded, and listed instead in the "Elsewhere" section of
`open-source.md`: `rocketjob_mission_control`, `opinionated_http`,
`symmetric_encryption.ex`. Also excluded: `mongo_ha`, `rubywmq`, `jruby-hornetq`,
`us_address_*` (archived or deprecated), and non-library repos.

### Refreshing download counts

Counts are hand-maintained and stamped with a verification date in both
`_data/projects.yml` and the note under the cards on `open-source.md`. They are
currently stamped 2026-08-06 and should be refreshed before the site is pushed
at buyers. To refresh:

```sh
for g in semantic_logger rails_semantic_logger symmetric-encryption jruby-jms \
         iostreams net_tcp_client secret_config sync_attr rocketjob \
         parallel_minion data_cleansing; do
  printf "%-26s %s\n" "$g" \
    "$(curl -s https://rubygems.org/api/v1/gems/$g.json | jq .downloads)"
done
```

Update the badge values in `_data/projects.yml` and the date in the note on
`open-source.md`. The two figures quoted on `about.md` render from the data file,
so they follow automatically. The 77M total is written out in prose in several
places and does have to be changed by hand.

## Content rules

- **No em dashes.** Use commas, colons, parentheses, semicolons, or separate
  sentences. This applies to every page.
- **Do not invent facts.** Talk titles, dates, metrics, and links must come from
  Reid. Unknowns get a `.needs-input` block, not a plausible guess.
- **Write for the buyer, not for a hiring manager.** Every page answers "why
  should I trust this vendor with a system under audit", not "why should I hire
  this person". Job-search phrasing is the most likely leftover in anything
  written before September 2026.

## `.needs-input` blocks are scaffolding and must not ship

`talks.md` contains `<div class="needs-input" markdown="1">` blocks holding
questions for Reid. They render as **visible orange dashed boxes labelled
"TO FILL IN"**.

Before pointing the custom domain at this repo, or any time before announcing the
site, check:

```sh
grep -rn "needs-input" --include=*.md --include=*.html .
```

That must return nothing but the CSS rules in `stylesheets/site.css` and
this file. Delete the whole `div`, not just the class.

## Local development

```sh
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
```

`Gemfile.lock` is gitignored, matching the convention in the other repos.

## DNS (GoDaddy)

Nameservers are `ns27`/`ns28.domaincontrol.com`.

Before this change, the apex 301-redirected to LinkedIn via GoDaddy domain
forwarding (A records `15.197.225.128`, `3.33.251.168`), and `www` pointed at
`ghs.google.com`, which returned 404. Both were dead ends and were replaced.

Target state:

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

**Do not touch the MX records.** Turn off GoDaddy domain forwarding, otherwise it
reinstates the apex A records.

The six documentation subdomains (`logger`, `encryption`, `rocketjob`, `config`,
`iostreams`, `minion`) are CNAMEs to `reidmorrison.github.io` served by their own
repos. This site does not affect them, and they must keep working.

After DNS propagates, set the custom domain in Settings, Pages, then enable
**Enforce HTTPS** once the certificate provisions.

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

Known inconsistency, not fixed here: `rails_semantic_logger` and
`rocketjob_mission_control` still advertise `rocketjob.io` homepage URLs on
GitHub, left over from before the `.reidmorrison.com` migration.
