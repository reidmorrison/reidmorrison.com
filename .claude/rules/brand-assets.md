---
paths:
  - "_includes/logo-mark.svg"
  - "_includes/topbar.html"
  - "stylesheets/**"
  - "images/**"
  - "script/og-cards.mjs"
---

# Brand assets

### The wordmark

Typographic: "Reid Morrison" in Spectral 700, "Fixed-Price Engineering" in
letterspaced mono in the accent colour, over a **2px rule**, with the shield to
its left. The sub-line read "EOL Remediation" until 2026-10-01; it names what
all three lines share, and must never again name only one of them. The `/eol/`
print letterhead keeps "EOL Remediation", because that document is an EOL
finding.

That rule is the point. It is the same device that sits under every page title,
so the mark reads as part of this site rather than something dropped onto it.
**If you change the masthead rule, change the wordmark rule with it**, or the
rhyme breaks and the mark starts looking arbitrary.

The type is not proprietary: three Google Fonts, about twenty hex values and
public CSS. The shield is the one drawn asset.

### The logo

**One derivative is tracked:** `_includes/logo-mark.svg`, inline SVG, ~4.8KB,
used by the topbar shield and the `/eol/` print letterhead. Nothing on this site
depends on the master artwork.

#### The mark is inline, not an `<img>`

CSS variables do not cross into an SVG loaded through `<img src>`, so an
external file would need one copy per theme. Inlined through
`{% include logo-mark.svg %}`, its two fills read `--logo-ink` and
`--logo-accent`, which `topbar.css` sets with the same three-state pattern as
the colour tokens.

Those are **logo** variables, not `--ink` and `--accent`. On the light palette
the site's ink and accent are both dark, and painting the shield with them
collapses its two tones into one. The navy `#092449` is **1.2:1** against the
dark ground `#0E1319`, so the dark theme lifts it to `#E3E9F1` and brightens the
accent.

The mark sits **outside** `.brand-type`, so the 2px rule underlines only the
type. Do not move it inside.

### The icons

A white Spectral **R** on the accent navy, with the wordmark's rule returning at
larger sizes.

- `favicon.ico` carries 16, 32 and 48px. `favicon-32.png` serves browsers that
  prefer PNG. `apple-touch-icon.png` is 180px, square and unrounded, because iOS
  applies its own mask.
- **The artwork differs by size on purpose.** 16 and 32px are the letterform
  alone; the accent rule only appears from 48px up, where it can be seen. Do not
  "simplify" this into one scaled image, and do not add the rule at 16px, where
  it becomes a smudge.
- **The ground is navy, not ink.** Ink disappears into a dark browser tab strip.
  Navy separates in both light and dark tabs and carries the brand colour.
- An "RM" monogram is illegible at 16px, and an abstract two-bar mark reads as a
  hamburger menu. Both were tried and rejected.

Regenerate with the scratch renderer if the accent changes; the letterform is
live text in Spectral, not a path, so it needs a browser to rasterise.

### The link preview cards

`images/og/`, eight 1200x630 PNGs, built by `script/og-cards.mjs`:

```sh
node script/og-cards.mjs   # from the repository root
```

Until 2026-09-09 the site set no `og:image` at all, so every link to it unfurled
on LinkedIn, Slack and iMessage as a block of grey text. `_config.yml` now
defaults `image` for every page; `services.md`, `security.md` and
`open-source.md` name their own, and `eol.html` writes the tags by hand because
it carries its own shell and never runs `{% seo %}`.

- **One card per page that gets shared on its own**, not one card for the site.
  The default card carries the firm's headline since 2026-10-01; the old EOL
  headline moved to `og-remediation.png`, beside `og-scalability.png` and
  `og-ai-enablement.png`. Services, security, open source and `/eol/` are the
  media links on the LinkedIn services page, and four
  identical previews stacked in one section reads as a placeholder.
- **The card's headline is the page's own h1, or a compression of it.** A card
  that promises something the page does not is noticed within a second of
  arriving.
- **It is generated, not drawn, because one of them states the download total.**
  `og-open-source.png` sums `_data/projects.yml`, the same file the pages read,
  so a refreshed count and a re-run cannot leave the image contradicting the
  page. Re-run the script after touching that file.
- **The art rebuilds the top bar's lockup** from `_includes/logo-mark.svg`, the
  wordmark, the 2px rule and the mono sub-line. It does not use the master logo
  PNG, which still carries a "CONSULTING" tier.
- **The cards are always the light palette.** A preview renders on the
  platform's chrome, not in the visitor's theme, and a dark card on LinkedIn's
  white feed reads as a banner ad.
- `script/` is excluded from the build; `images/og/` is published. Commit the
  PNGs, because Pages builds the site and never runs this script.
