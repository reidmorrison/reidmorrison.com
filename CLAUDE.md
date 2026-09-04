# reidmorrison.com

The website for **Reid Morrison Inc.**, served by GitHub Pages at the apex
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

### The entity is named on this site, and it is not "Consulting"

**Changed 2026-09-03.** The contracting party is **`Reid Morrison Inc.`**, a
Florida corporation, document **P26000043890**, at 7901 4th St N, Ste 300,
St. Petersburg, FL 33702. It has **no trading name and no descriptor**, by
decision: "Consulting" signals the advisory, time-and-materials category this
fixed-fee offer is priced out of, and a trading name that differs from the legal
name would need a Florida fictitious-name registration nobody has filed. The
reasoning lives in the business folder, not here.

**The four entity facts live in `_config.yml` under `entity:`**, added
2026-09-03, and every surface reads them from there: the footer on every page,
the `/eol/` footer, the counterparty lines on `/services`, `/contact` and
`/about`, and the procurement block on `/security`. Do not retype the name or
the address into a page. They are also what the W-9, the D-U-N-S record and the
certificate of insurance will carry, so a page that drifts from that block
drifts from a document a procurement reviewer is holding.

Two rules follow, and both are load-bearing on `/security.html`:

- **The corporation is the counterparty; the founder is the capability.** Every
  page names Reid Morrison Inc. as the party you contract with, and Reid's
  experience and open-source record as the reason to choose it. No page may read
  as though the individual is contracting.
- **The word "Consulting" appears on no public surface.** `_config.yml` `title`,
  the descriptions and `og:site_name` were changed the same day. Two hits remain
  and are deliberate: `about.md` and `open-source.md` use "consulting references"
  generically, which is the word doing ordinary work.

**The last hit was cleared 2026-09-03.** `images/logo-lockup.png` was the
`/eol/` print letterhead and carried "CONSULTING" as its middle tier. The
letterhead is now built from the shield plus live type, the PNG is deleted, and
nothing on this site depends on the master artwork any more. See "The logo".

### Rebuild in progress

The full plan, its reasoning and the sequencing are recorded outside this repo.
Round 1 shipped `/eol/` with its data file, the sitemap, the site-wide retheme
and the page set (a home page that sells the finding, `/assessment`,
`/contact`, `/open-source`). `/security` followed on 2026-09-03, and
`/assessment` was folded into `/services` later the same day.

**Round 2 shipped 2026-09-03**, in one pull request: the entity footer and
`/privacy` on every page, the hero and `_config.yml` rewritten, `/services`
added and given the nav slot, the product renamed, the commercial pages moved
into the company voice, and the last "Consulting" surface retired.
`/assessment.html` was folded into `/services.html` in the same branch; see
below.

Still to do, in the order the plan sets:

- **The procurement line**, on `/security` and `/contact`. Gated on all three
  documents existing: EIN issued, E&O bound, D-U-N-S issued. An HTML comment
  marks the spot on both pages. See "The procurement line is gated" below.
- **A `Gemfile.lock` drop zone** on `/eol/`, parsed in the browser with nothing
  uploaded. The strongest single addition left, and the free tier of the
  assessment in one page.
- **A social share image.** Link unfurls for `/eol/` are text-only.
- **Version numbers in the `/eol/` URL**, so a finding can be linked rather than
  only reproduced.
- **Refresh the download counts**, stamped 2026-08-06. See "Refreshing download
  counts".

`/eol/` keeps its own shell: its own `<head>`, its own sources footer, and the
print letterhead. Its **CSS is no longer its own**; it moved into `site.css` on
2026-09-01, so the page is markup and JavaScript only. Folding the shell itself
into `_layouts/default.html` is optional cleanup, not a fix.

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
- **Working entirely inside the client's environment is optional, not the
  default.** It is achievable, and it goes into the agreement when a client asks
  for it, but it adds a step to every phase and costs schedule. `index.md`,
  `services.md` and `about.md` each stated it as an unconditional guarantee
  until 2026-08-31 (`assessment.md` before it was folded into `services.md`).
Since 2026-09-03 none of them restates the posture at all:
  each names the three choices in one sentence and links `/security.html`, which
  is where they are set out in full and kept correct. Do not restore the
  absolute phrasing ("all tooling runs inside your own environment", "no client
  code is transmitted to services outside your control"), which promises
  something delivery does not always do, and do not re-describe the postures on
  a selling page, which is how the two drift.
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

- **A dedicated public-facing alias is the destination for everything public.**
  It is where form submissions land. **That address is not written down in this
  repository**, because the repository is public: ask Reid for it. The Web3Forms
  key already encodes the destination, so nothing here needs to name it.
- **No address appears in the markup**, ever. No `mailto:`, no obfuscation
  trick. Every route to Reid is a form or a booking link. If a form backend is
  unavailable, link LinkedIn rather than printing an address.
- **Do not reintroduce an address anywhere in this repo**, including comments,
  commit messages, and this file. Refer to "the public alias" instead.

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
                       Also holds web3forms_key, which gates the /eol/ form,
                       and `entity:`, THE one home for the four contracting
                       facts every page's footer renders.
_data/projects.yml     THE source of truth for the library list. Edit here.
_data/eol.yml          THE source of truth for Rails/Ruby EOL dates, version
                       ceilings and control citations. Drives /eol/.
eol.html               The EOL exposure check, served at /eol/. Builds its own
                       shell rather than using _layouts/default.html, but
                       carries no CSS: it links site.css like every other
                       page. See below.
_layouts/default.html  Shared shell: sticky top bar, page title, footer.
                       Renders page.title as the h1, so pages must NOT repeat
                       their own title as a leading heading.
_layouts/post.html     Blog post wrapper. Date line, then content.
_posts/                Empty. Blog scaffold only, with no index page.
index.md               Home. Sells the finding. The library list moved OUT of
                       here to open-source.md in the step 5 rewrite.
services.md            THE product page: the two-step model, the $12,500
                       Remediation Assessment in full, and step two. Absorbed
                       assessment.md on 2026-09-03 and carries its
                       `redirect_from`. Renders the control table from
                       _data/eol.yml, so citations have one home.
privacy.md             Privacy policy. Short, because the site sets no cookies
                       and runs no analytics. Linked from every footer.
contact.md             Qualifying form plus optional booking link. The Rails
                       version dropdown is generated from _data/eol.yml.
                       Its fields and the /eol/ form are kept in step; see
                       "The two lead forms" below.
open-source.md         The library list, generated from _data/projects.yml.
security.md            "How we work with your code." The page a CISO forwards
                       to their third-party risk team. See below.
about.md               Professional bio. See the prose constraint below.
talks.md               Conference talks. Not in the nav; linked from About and
                       from open-source.md.
404.html               Links back to the doc sites.
_includes/topbar.html  The top bar and wordmark markup. Included by the
                       shared layout AND by eol.html, so the nav has one home.
stylesheets/site.css   THE stylesheet, /eol/ included. See "Styling".
stylesheets/topbar.css The top bar, in its own file because two shells use it.
images/                favicon.ico, apple-touch-icon.png, reid-morrison.jpg.
                       NO logo raster: logo-lockup.png was deleted 2026-09-03
                       when the /eol/ letterhead became typographic. The shield
                       is vector and lives in _includes/. The logo master is
                       deliberately NOT here; see "The logo".
                       header-banner.jpg is unused since the retheme.
_includes/logo-mark.svg  The shield, inline so its fills are CSS variables.
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
against the upstream file. **That is over**, and the dependency has since
reversed: see "The doc sites now share this palette" below.

Deleted in the retheme, all previously copied from the doc sites:
`stylesheet.css`, `normalize.css`, `github-light.css`, `pygment_trac.css`,
`print.css`, `table.css`, and the placeholder `javascripts/main.js`. They are in
git history if any of it is ever wanted back.

The **blue and orange gradient wordmark was retired** with them. It was built
for a dark photographic banner that no longer exists, and `/eol/` had already
set the plain Spectral wordmark. This was a change from the rebuild plan, which
had suggested keeping the wordmark for continuity. The doc sites kept it at the
time; they have since dropped it too, for the same wordmark construction used
here.

### The doc sites now share this palette

**Changed 2026-09-04, and this reverses what this file used to say.** The note
here read that the doc sites "are allowed to look different", on the grounds
that they serve engineers reading API documentation while this site serves
someone deciding whether to trust a vendor. The second half of that is still
true and still governs the *content*. The first half is no longer how the
styling works.

The doc sites now take their layout, palette, type pairing and syntax
highlighting from **`reidmorrison/rm-docs-theme`**, a Jekyll remote theme whose
token block is this file's token block. `semantic_logger` and
`symmetric-encryption` are converted; the other four follow. The reason is
plain: six gem repos each carried a near-identical copy of one stylesheet, and
the copies had drifted, so a mobile header fix made in one repo never reached
the other five.

Two rules govern the relationship, and both matter commercially:

- **The design system is shared; the commercial chrome is not.** A doc site gets
  the palette, both themes, the type pairing, the code treatment and the shield.
  It never gets navigation to `/services`, `/security` or `/contact`, the entity
  block, or any price. The only mention of the business on a doc site is one
  footer line, "Maintained by Reid Morrison", linking here. A doc site that
  sells consulting reads to the Ruby community as a rug-pull risk on the gem
  itself, and would cost more credibility than it could generate leads.
- **This site keeps its own layouts and its own top bar.** Only the tokens and
  the syntax sheet are common. Nothing about the doc theme constrains what this
  site's pages do.

The remaining work on this side is to take the token block and the Rouge sheet
*from* the theme rather than maintaining a second copy here. Until that lands,
a colour changed here must be changed there too. The Rouge rules below are the
live example: the theme's sheet covers about twenty-five token classes and this
file still has six, so a code sample renders better on a doc site than it does
here.

### The wordmark

Typographic: "Reid Morrison" in Spectral 700, "EOL Remediation" in letterspaced
mono in the accent colour, over a **2px rule**. A **shield mark sits to its
left** (added 2026-08-31, see "The logo" below); the type itself is still set,
not an image.

That rule is the point. It is the same device that sits under every page title,
so the mark reads as part of this site rather than something dropped onto it. A
monogram block and a boxed "stamp" treatment were both tried and rejected as
generic. **If you change the masthead rule, change the wordmark rule with it**,
or the rhyme breaks and the mark starts looking arbitrary.

Honest limitation, recorded so nobody mistakes it for a moat: the type is not
proprietary. Three Google Fonts, about twenty hex values, and public CSS,
reproducible from view-source in an hour. The shield is the one drawn asset.

### The logo

The **master artwork** is a shield holding an R/M with a rising arrow, beside a
three-tier "Reid Morrison / Consulting / EOL Remediation" lockup, supplied by
Reid on 2026-08-31 as an 1881x836 PNG with an opaque white ground.

**It is deliberately not in this repository.** It was committed once and removed
the same day, before anything was pushed, so it is not in the history either.
Reid keeps it outside the repo; ask him for it if a derivative has to be
regenerated. `.gitignore` carries the filename so it cannot drift back in.

The reason is that this repository is public and permanent. A 750KB source file
that no page loads is pure weight in every clone, and once pushed it could not
be taken back out. Only the derivatives below are tracked, and they are what the
site actually serves.

| Derivative | Form | Used by |
|------------|------|---------|
| `_includes/logo-mark.svg` | inline SVG, ~4.8KB | the topbar shield, and the `/eol/` print letterhead |

**One derivative, as of 2026-09-03.** `images/logo-lockup.png` was a 1440x391
raster of the full lockup and served the `/eol/` print letterhead. It is
deleted. The letterhead is now the shield beside "Reid Morrison" over
"EOL REMEDIATION" on the 2px rule, the same construction as the top bar, set in
`site.css` under the print block.

Three things that bought:

- The middle tier of the master lockup read **"CONSULTING"**, an entity that
  does not exist. That was the last such surface on the site.
- **Nothing here depends on the master artwork any more.** It lives outside the
  repo (below), and a printed document no longer breaks if it is lost.
- The tier label is **live type rather than a raster**, so the legibility floor
  that governed the old letterhead is gone. It sets cleanly at any printer
  resolution.

**The full lockup is still never used at small size**, if it is ever
reintroduced. Its third tier is illegible below roughly 44px on screen or 14mm
in print, which is why the topbar gets the shield alone. In a slim bar, a card
or a favicon it is wrong.

#### Why the mark is vector and the lockup was not

Kept because the master art still exists and someone may want another
derivative from it. **The master art is built from gradients**:
the shield stroke runs mid-blue at the top right to near-black navy at the
bottom left, and the hairline rule under "CONSULTING" fades left to right. A
traced vector has flat fills, so any two-colour separation cuts that shield
gradient at one arbitrary point and leaves a visible hard step where blue meets
navy.

At the 28-34px the topbar uses, that step is smaller than a pixel and the
vector is strictly better: crisper than a scaled raster, and its fills are CSS
variables. At the ~66mm the old letterhead reproduced, the step was plainly
visible and the raster was strictly better, which is why there used to be one of
each. **Do not "finish the job" by vectorising the lockup** if it comes back; it
was tried, and the shield reads as a two-tone error. Vectorising it properly
means reproducing the gradients as SVG `linearGradient`s, which needs the shield
ring separated from the R, and they are one connected shape in the trace.

The letterhead sidesteps all of that by using the shield alone at 15mm, where
the gradient step is already sub-pixel, and setting the words as type.

#### The mark is inline, not an `<img>`

CSS variables do not cross into an SVG loaded through `<img src>`, so an
external file would have needed one copy per theme. Inlined through
`{% include logo-mark.svg %}`, its two fills read `--logo-ink` and
`--logo-accent`, which `topbar.css` sets with the same three-state pattern as
the colour tokens. One file, and an explicit `data-theme` override works rather
than only the OS setting.

Those are **logo** variables, not `--ink` and `--accent`. On the light palette
the site's ink and accent are both dark, and painting the shield with them
collapses its two tones into one.

The navy is `#092449`, which is **1.2:1** against the dark ground `#0E1319`:
not low contrast, absent. The dark theme lifts it to `#E3E9F1` and brightens
the accent to the site's dark accent.

The mark sits **outside** `.brand-type`, so the 2px rule still underlines only
the type and the rhyme with the masthead rule survives. Do not move it inside.

#### Regenerating from the master

Needs the master artwork, which is not in this repo, and `potrace`
(`brew install potrace`). Run this from `images/` with the master copied in
beside you, and delete it again afterwards. The separation is by **saturation**,
not lightness: navy-against-white antialiasing sits at about 15% saturation
while the real blue is about 43%, so a lightness threshold alone paints halos.

```sh
# transparent, trimmed lockup, then the shield alone (its gutter is x 485-575)
magick reid-morrison-consulting.png -fuzz 9% -transparent white \
  -trim +repage -bordercolor none -border 10 /tmp/lockup.png
magick /tmp/lockup.png -resize 1440x -strip -colors 200 images/logo-lockup.png
magick /tmp/lockup.png -crop 530x473+0+0 +repage -trim +repage \
  -bordercolor none -border 8 /tmp/mark.png

# 4x upscale, split into navy and blue, smooth, trace, assemble by hand
magick /tmp/mark.png -filter Lanczos -resize 400% -background white \
  -alpha remove -alpha off /tmp/big.png
magick /tmp/big.png -colorspace HSL -channel G -separate +channel /tmp/sat.png
magick /tmp/big.png -colorspace HSL -channel B -separate +channel /tmp/lum.png
magick /tmp/lum.png -threshold 88% -negate /tmp/all.pbm
magick /tmp/sat.png -threshold 28% /tmp/s.png
magick /tmp/lum.png -threshold 34% /tmp/l.png
magick /tmp/s.png /tmp/l.png -compose multiply -composite \
  -morphology Open Disk:2.5 -morphology Close Disk:2.5 /tmp/blue.pbm
magick /tmp/blue.pbm -morphology Dilate Disk:1.5 /tmp/bg.pbm
magick /tmp/all.pbm \( /tmp/bg.pbm -negate \) -compose Multiply -composite \
  -morphology Open Disk:2 /tmp/navy.pbm
for f in navy blue; do
  magick /tmp/$f.pbm -blur 0x6 -threshold 50% -negate /tmp/${f}_s.pbm
  potrace /tmp/${f}_s.pbm -b svg -a 1.2 -O 0.5 -t 60 -u 1 -o /tmp/$f.svg
done
```

The lockup half of that recipe is kept for completeness; nothing on the site
serves it. Then lift each `<path d="...">` into `_includes/logo-mark.svg`, navy filled
`var(--logo-ink)` and blue `var(--logo-accent)`, keeping potrace's group
transform. **`-u 1` matters**: without it potrace emits coordinates at ten
times the scale and the file roughly doubles. The blur before tracing matters
too; without it potrace chases every antialiased stair-step and the path data
grows about fourfold.

Verify a retrace by rendering it over the PNG and thresholding the difference.
The current trace has no disagreeing region larger than two pixels.

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
- **One width, and it is the top bar's.** `.page` and `.topbar-inner` both cap
  at 1120px, so the wordmark, the nav, the masthead rule, every card and every
  paragraph share two vertical edges. `.page` was 820px with a separate
  `.page--wide` for `/eol/` until 2026-09-01, when Reid asked for the match.
- **Nothing is capped to a reading measure, and that is deliberate.** `p` and
  `li` were 68ch, `.lede` 64ch, `.standfirst` 62ch, and the `/eol/` card copy 58
  to 64ch. At 1120px those all stopped well short of the rule above them and
  read as stranded text, so they were lifted the same day. Running text fills
  its container. The only `ch` caps left are the About pull quote and the
  `/eol/` counter label, which sit beside something rather than run as prose;
  `p,li{max-width:none}` is written out rather than deleted so the full width
  reads as a decision and not an omission.
- **The print block restates every semantic token**, not only the ones it
  changes. The theme rules match `:root` at the same specificity, so a token
  left out keeps its dark value: that is how the printed finding ends up with a
  salmon counter on white. A dark-theme visitor would otherwise print a black
  page, and pages here are meant to be printable and forwardable.
- **A grid track holding a scrollable table is `minmax(0,1fr)`, never `1fr`.**
  A bare `1fr` takes its minimum from the content, so the 560px min-width on the
  `/eol/` controls table sized the whole findings column and pushed the page
  sideways on a phone. Fixed 2026-09-01; the table scrolls inside
  `.table-scroll` and the page does not.
- **The `/eol/` print rules are scoped to `body.eol`.** They hide the masthead
  and the forms, which is right for the finding and wrong for every other page.
- The separator pseudo-elements (`.project-meta a + a::before`) need
  `display:inline-block`, otherwise the parent link's underline propagates into
  the middot and it renders as an underscore.

### Front matter the layout understands

- `title` sets the browser tab and search result, and is the `h1` fallback.
- `heading` overrides the `h1`. Use it when the selling headline is a full
  sentence and the tab should stay short.
- `eyebrow` renders a small mono label above the `h1`.
- `standfirst` renders the lead paragraph under it.
- `redirect_from` (from `jekyll-redirect-from`) keeps a retired URL resolving.
  Only `services.md` uses it, for `/assessment.html`.

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

## `/security.html` is written to be forwarded, not read

The reader is a third-party risk or vendor-security reviewer, and they arrive
because a CISO sent them the link. Publishing it unprompted shortens their review
cycle, which is the whole point: they read the page instead of waiting on a
questionnaire round trip.

**Every claim on it was confirmed by Reid on 2026-09-03.** Nothing there is
inferred, and nothing may be added later that has not been through the same
check. It is the one page where a plausible guess is a liability rather than a
placeholder, because a reviewer will hold the company to it and an auditor may
read it. The facts, so a future edit does not have to re-ask:

- Company-owned Mac, full-disk encryption, automatic screen lock, enrolled in
  **Apple Business Manager** and centrally managed with **Mosyle**. Client work
  never touches a personal device. The page says "centrally managed" rather than
  naming Mosyle, because the vendor can change and the control cannot.
- MFA on every account that can reach client code, **passkeys wherever
  supported**, unique credentials in a password manager, no shared logins.
- **Client code: destroyed at close-out, confirmed in writing, and excluded from
  every backup.** The backup exclusion is what makes the deletion claim complete,
  and it is the follow-up question a reviewer always asks.
- **Deliverables and correspondence: seven years, then destroyed.**
- **Incident notification within 24 hours** of becoming aware.
- **Background check on request.**
- AI tooling is **Claude and Claude Code**, run on a **commercial account**
  (Team, Enterprise or API), confirmed 2026-09-03. That account type is what
  makes the citation correct: the **Commercial** Terms carry the no-training
  clause, and a personal Pro or Max plan would fall under the Consumer Terms
  instead, making the sentence on the page wrong. If the account ever changes,
  the page changes with it. The claim is deliberately limited to what those terms
  actually say, which is that Anthropic may not train models on customer content
  and that the customer retains its inputs and owns its outputs. **Do not add a
  zero-retention claim**; there is no such agreement, and the terms state no
  retention period.

### The three hosting postures (added 2026-09-03)

The page presents where the work is hosted as the client's choice, ordered by
assurance, using the `.options` component from the home page with **no severity
modifier**: all three are acceptable, so painting one `--crit` would say the
default posture is bad.

1. **Our managed machine.** The default. A working copy lives on the managed Mac,
   destroyed at close-out, excluded from backups. Tooling on our own account.
2. **Your Anthropic tenancy.** Same for the code; the tooling runs under accounts
   the client provisions.
3. **Your virtual desktop.** The strongest. **Source code is never downloaded**,
   so there is nothing on our side to retain, delete or lose.

**The VDI posture is not the default, deliberately.** It makes the client's
infrastructure a precondition for starting, which is the trade
`risks-and-counterarguments.md` warns about in the business folder: a security
objection swapped for a procurement delay. Do not promote it to the default
without revisiting that.

**Claude Code must run inside the virtual desktop, and the page says so as a
requirement rather than a preference.** A VDI that will not permit it is not a
viable environment, and it is cheaper for everyone to learn that before the
agreement than after. Two ways to satisfy it, both stated publicly:

- **Reid's own subscription, used from inside the client's desktop.** Preferred,
  and nothing for the client to buy.
- **The client's own subscription**, if their policy demands it. Then it **must
  include the latest Claude Opus AND Claude Fable models, at their cost.** Both,
  not either: raised to two models 2026-09-03. This is a real precondition with a
  real price, so it is on the public page rather than saved for scoping.

**If the client will fund neither route, the VDI posture is off the table and the
work runs under one of the other two.** The page says so. It is a decision about
posture rather than a disqualifier for the engagement, and the only true
disqualifier is a client who will permit neither their own desktop nor our
machine, which leaves nowhere for the work to happen. The scoping questions live
in `pre-quote-checklist.md` in the business folder, under B5.

**Where the assessment report lives under VDI, decided 2026-09-03:** it is
written inside the virtual desktop and leaves it as the deliverable, carrying
findings, version data, dependency status and the agreed baselines, and no
application source. **Reid keeps his copy**, under the same seven-year rule.
That is not a convenience: the report is the underwriting record the fixed price
rests on, and the acknowledged error and flaky-test baselines are what separate a
genuine upgrade regression from a pre-existing bug. The alternative, leaving the
only copy inside the client's VDI, was considered and rejected for that reason.

Three things the page does deliberately, which look like omissions and are not:

1. **It admits the working copy exists**, and scopes that admission to the first
   two postures. A local clone lives on one machine for the length of the
   engagement, because running the suite requires it. Saying otherwise would be
   false, and the admission is what makes the rest credible. Under VDI the
   exception genuinely disappears, and the page says that too.
2. **It keeps in-tenancy AI conditional**, per the commercial rule above. The
   default is Anthropic's commercial service; the client's own tenancy is
   available on request, goes into the agreement, and costs schedule.
3. **It makes no claim about production data.** The delivery playbook allows a
   shadow-replay harness where traffic volume justifies it, so a blanket "we
   never touch production data" would be wrong.

**The procurement line is gated and is not published yet.** "W-9, certificate of
insurance and D-U-N-S number are available on request" names three documents, and
none exist today: the EIN has not been issued, E&O is not bound, and the D-U-N-S
request goes in the day the EIN does. **HTML comments in `security.md` and in
`contact.md` mark both spots**, and each points at the other. Add it to both on
the same day, and not before, because the one reader who sees that line is the
one who will ask for the documents.

What `/security.html` does already publish is the entity block: name, form,
document number and address, rendered from `site.entity`. The document number is
public record, so a reviewer can verify the corporation and its standing with
the Florida Division of Corporations without asking for anything.

## The assessment page was folded in

**2026-09-03.** `/assessment.html` shipped in round 1 as the $12,500 product
page. `/services.html` was added hours earlier the same day to state the
two-step model, which left two pages describing one product: the services page
listed the deliverables in short form and the assessment page listed the same
ones at length.

The only argument for keeping both was the URL. `/assessment.html` was to be
pinned in the LinkedIn Featured section, so it had to keep resolving. **Reid
confirmed LinkedIn had not been updated yet**, which removed the constraint, so
the pages were merged into `/services.html` and `assessment.md` was deleted.

What moved across, and must not be lost again if this is ever re-split:

- **The controls table**, rendered from `site.data.eol.controls`. Those are the
  eight verified citations and they are the compliance wedge. `/eol/` is the
  only other page that renders them, and that page is written for an engineer.
- **The underwriting argument** ("it is underwriting rather than a sales step,
  and it is why we can hold a fixed price afterwards"), which is the reason the
  assessment is not a discovery call with an invoice attached.
- **The long-form deliverable list.** The short version on the services page was
  a summary of it, so the summary went and the full list stayed.

`/assessment.html` still resolves. `services.md` carries
`redirect_from: /assessment.html`, and `jekyll-redirect-from` was added to
`_config.yml` for that one redirect: the page was public for six days and sat
in the sitemap, so a 404 would have been the wrong answer to anything that
indexed or bookmarked it. The generated stub is `noindex` and the sitemap now
lists only `/services.html`. **If that redirect is ever removed, remove the
plugin with it** rather than leaving one nothing uses.

Anything outside this repo that pointed at the old URL, notably the Featured
section item in `linkedin.md` in the business folder, now names
`/services.html`.

## The nav has no "Home" item, and no "Assessment" item

"Home" went on 2026-09-03 when `/security.html` needed a slot; the wordmark is
the home link, which is the ordinary convention. "Assessment" went the same day
when `/services.html` took its place, because the services page describes both
steps and links to it.

`topbar.css` records that the bar holds one line down to about 820px at the
floor sizes, and that budget is spent: **adding another nav item means removing
one.** The order is EOL Check, Services, Security, Open Source, About, then
Contact as the outlined call to action.

There is no sub-page under any nav item. A `nav_parent` front-matter key
existed briefly to light Services while `/assessment.html` was being read; it
went with that page. If a sub-page is ever added, reintroduce that pattern
rather than growing the bar.

## The footer names the counterparty

**Added 2026-09-03.** Two rows on every page: the entity line
("Reid Morrison Inc., a Florida corporation" and the address from the Articles),
then the link row, which gained **Privacy** and now reads
`Privacy - GitHub - LinkedIn` with the copyright opposite.

- **Every value comes from `site.entity`** in `_config.yml`. Nothing in a layout
  or a page retypes the name or the address.
- **`/eol/` carries the same block** in its own footer, because that page has its
  own shell. Unlike the rest of the site, **that one prints**: a finding
  forwarded to an auditor has to name who produced it. The Privacy link inside
  it is wrapped in `.print-hide`, since print strips link styling and it would
  otherwise print as a word with nowhere to go.
- The entity line is a full-width row rather than a third item in the flex row.
  Folded in, the address wrapped against the copyright on a laptop.

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

## `/privacy.html` says almost nothing, on purpose

Added 2026-09-03 because the footer links it from every page. It is short
because the site genuinely collects nothing: **no cookies, no analytics, no tag
manager, no tracking pixel, and nothing written to browser storage.** Confirmed
by `grep` at the time, and worth re-confirming before adding anything:

```sh
grep -rn "localStorage\|sessionStorage\|cookie" --include=*.html --include=*.md .
```

The substance of the page is the four third parties a visitor's browser
contacts: GitHub Pages, Google Fonts, Web3Forms and Google Calendar, each linked
to its own statement. **Adding any embed, font, script or analytics tool means
adding a row to that table in the same commit.** A privacy page that is
out of date is worse than none, on a page set whose job is establishing that
this vendor can be trusted.

It states that `/eol/` computes everything locally and uploads nothing. That is
true because the site is static and has no backend, and a reader can confirm it
in a network tab. **Do not add a server round trip to that page without
rewriting this claim first.**

Two things it deliberately does not do. It quotes **no retention period for
Web3Forms**, because that is a vendor number nobody has verified recently and a
legal page is the wrong place to guess. And it makes no promise of an automatic
purge for enquiries that do not become engagements: it offers deletion on
request instead, and points at the seven-year business-record retention on
`/security.html` for the ones that do. If Reid wants a stated purge schedule,
that is a fact he has to set, not one to infer.

## The EOL exposure check at `/eol/`

The lead magnet, and the highest-value page here. Moved into this repo
2026-08-27 from `eol-calculator.html` in the business folder; **this is now the
only live copy**. It builds its own shell rather than using
`_layouts/default.html`, but it no longer carries its own design system: the
tokens, fields, buttons, tables and print palette it invented were adopted
site-wide in the retheme, and on 2026-09-01 the page's remaining components
(`.cols`, `.panel`, `.record`, `.counter`, `.trap`, `.capture`) moved into
`site.css` under their own section. **`eol.html` now contains no CSS at all.**
Style it there, with everything else, and expect the shared rules above that
section to apply.

### The data lives in `_data/eol.yml`, not in the JavaScript

Version tables, the target versions, and the eight control citations were
hardcoded in a `<script>` block. They now render from `_data/eol.yml` through
`jsonify`. Change the dates there and the tool changes with no JavaScript edit.

**Re-verify before any campaign, and note the next scheduled change: Rails 8.0
reaches end of life 2026-11-07**, which alters what the tool says. Bump
`verified:` when you check; the footer date reads from it, so the page cannot
claim a verification that did not happen.

### The lead form is live

`web3forms_key` in `_config.yml` is set, and **Reid verified end to end on
2026-08-31 that a submission arrives in the destination inbox.** The form
renders and delivers.

It is still gated on that key: while it is empty the form is **not rendered at
all** and the page points at LinkedIn instead. That guard is deliberate and
should stay. The original file posted to `ENDPOINT=null`, which wrote
submissions to the browser console and lost them while telling the visitor they
were on their way.

If the key ever needs replacing, create it at <https://web3forms.com/> **using
the public alias** (see "Email addresses are never published on this site";
ask Reid for it), because submissions are delivered to whichever address
created the key. The key is public by design; it identifies a destination inbox
and grants nothing.

The form asks for company and makes it required, so a prospect row can be opened
and screened against the non-compete before anyone replies.

### The two lead forms

`/eol/` and `/contact` each carry a lead form, and they are **deliberately not
identical**. Both open with the booking link, because a booked call converts
better than a form fill and every page pushes toward a video call; both then
offer the form as the alternative. Both are gated on `web3forms_key` and fall
back to LinkedIn, and both ask name, work email, company (required), what is
forcing the timeline, and a free-text field.

The one real difference is the Rails version. `/contact` has to ask, so it
renders a dropdown from `_data/eol.yml`. `/eol/` already knows, because the
visitor just picked it, so it attaches `Rails x / Ruby y` as a hidden `versions`
field and puts it in the subject line instead. **Do not add a version dropdown
to `/eol/`**, which would ask a question the page has already answered.

The forcing-event options were brought over from `/contact` on 2026-08-31 and
must stay worded identically in both, because the replies land in one inbox and
are read as one list. `/eol/` lost a hint under its free-text field in the same
change: it named an audit date and a blocked deal, which the dropdown now asks
for directly.

### Printing is the delivery mechanism

The original offered "a signed one-page finding" as a PDF that did not exist and
had no way to be sent. Instead the page prints itself, through the `@media
print` block in `site.css`: it forces the light palette (a dark-theme visitor
would otherwise print a black page), swaps the masthead for a letterhead that
names the versions and the date, hides the form and nav, and keeps records from
breaking across pages. Those rules are scoped to `body.eol`, which `eol.html`
sets, because hiding the masthead is right here and wrong everywhere else. A
typical finding runs two or three pages.

**The letterhead is typographic since 2026-09-03**: the shield from
`_includes/logo-mark.svg` beside "Reid Morrison" over "EOL REMEDIATION" on the
2px rule, not the retired lockup raster. One consequence is easy to undo by
accident: the shield's fills come from `--logo-ink` and `--logo-accent`, which
are set on `.brand-mark` in `topbar.css` rather than on `:root`, so the print
block's palette reset in `site.css` does not reach them. `topbar.css` restates
them for print at the same specificity as its dark rules. **Remove that and a
dark-theme visitor prints a near-white shield onto white paper.**

The footer prints with the finding and carries the entity line, so the document
names who produced it.

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

- **Voice: the commercial pages speak as the company, and only two pages speak
  as Reid.** Set 2026-09-03 with the entity decision. `index.md`,
  `services.md`, `contact.md`, `security.md` and the selling
  copy inside `eol.html` say "we", because the counterparty is
  Reid Morrison Inc. `about.md` and `open-source.md` stay first person, because
  the experience and the libraries are Reid's and that is the whole point of
  those pages. Naming him inside company voice is fine and often better
  ("Reid does the work himself", "Reid replies personally"); what may not
  happen is a commercial page reading as though an individual is contracting.
  If you find an "I" on a selling page, it is a leftover from before that date.
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
