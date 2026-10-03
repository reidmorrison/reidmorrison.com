# The website, as the business sees it

Shared between two repos: this public website repo imports it from its
`CLAUDE.md`, and the private business repo (`~/Business/reid_morrison_inc`)
reads it on demand when work touches the site. **It lives in a public repo, so
nothing private goes here**: no address, no phone number, no EIN, no internal
link, no pricing reasoning. Those stay in the business repo. Jekyll ignores the
`.claude/` directory, so this file is never published as a page.

## What the site is, from the business side

Source is this **public** repo (Jekyll, GitHub Pages). This repo's `CLAUDE.md`
records what shipped and the commercial rules that constrain content; the
business repo holds the strategy, and this repo must not duplicate it.

**The design system is shared with the six gem documentation sites**, and since
2026-09-05 this site takes the tokens, the code treatment and the syntax sheet
*from* that theme rather than keeping a second copy: `_config.yml` sets
`remote_theme: reidmorrison/rm-docs-theme@v1` and `stylesheets/site.css`
includes three files out of it. It takes no layout, include or navigation from
the theme, and no commercial chrome ever travels the other way. The business
repo's `doc-sites.md` is the home for that arrangement; do not restate it here.

## The procurement line

On the security and contact pages. Three documents, not one sentence, because
they are not the same kind of thing:

- **W-9: live on both pages, on request.** It stays private, along with the
  taxpayer identification number it carries. That number belongs in a client's
  vendor file, not in a search index, so neither is printed on the site.
- **Certificate of insurance: still gated**, on E&O being bound. Nothing may
  imply a certificate exists before then; that fails in front of the one reader
  who will actually ask.
- **D-U-N-S: published, not offered**, as a row on `/security.html` beside the
  Florida document number. Like that number it identifies the entity and grants
  nothing.

## The open-source counts

The download counts are canonical in `_data/projects.yml`, which stamps the date
they were last verified. Refresh from there, never from memory, and re-run
`node script/og-cards.mjs` so the link preview card agrees with the page. The
business repo's sales copy and the one-pager read the same figure.

## Booking

**A booking route is not live until a stranger has completed a booking on it**,
from a browser with no account and an address on a consumer mail host. Both
failures that retired Microsoft Bookings on 2026-09-19 were found by that test
and neither would have shown up any other way. The current route is the Google
appointment schedule with Google Meet; the parked Microsoft block under
`booking_url` in `_config.yml` is where to start if it is ever revisited.

## The `/eol/` page

Two rules, both load-bearing for the business as well as the page: **no per-gem
rubygems.org calls, ever**, and the page **always says it is not a
vulnerability scan**. Detail under "The EOL exposure check at `/eol/`" in this
repo's `CLAUDE.md`.
