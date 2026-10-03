---
paths:
  - "privacy.md"
  - "_includes/analytics.html"
  - "_layouts/**"
  - "eol.html"
---

# Privacy and analytics

## `/privacy.html` says almost nothing, on purpose

The footer links it from every page. It is short because the site collects
almost nothing: **no cookies, no tag manager, no tracking pixel, no
fingerprinting, and nothing written to browser storage.** Re-confirm before
adding anything:

```sh
grep -rn "localStorage\|sessionStorage\|cookie" --include=*.html --include=*.md .
```

It names **five third parties**: GitHub Pages, Google Fonts, Cloudflare,
Web3Forms and Google Calendar, each linked to its own statement. **Adding any
embed, font, script or analytics tool means adding a row to that table in the
same commit.** A privacy page that is out of date is worse than none, on a page
set whose job is establishing that this vendor can be trusted.

**The `/eol/` claim is the delicate part.** The page computes everything locally
and uploads none of what a visitor selects, which is true because the site is
static and has no backend. But that paragraph invites the reader to open a
network tab and check, and a reader who does sees a request to
`cloudflareinsights.com`, so the paragraph names the beacon before the reader
finds it. **Do not delete that sentence while the beacon is live**, and **do not
add a server round trip to that page without rewriting the whole claim first.**

Two things it deliberately does not do. It quotes **no retention period for
Web3Forms**, because that is a vendor number nobody has verified and a legal
page is the wrong place to guess. And it promises no automatic purge for
enquiries that do not become engagements: it offers deletion on request instead,
and points at the seven-year retention on `/security.html` for the ones that do.
A stated purge schedule is a fact Reid has to set, not one to infer.

## Cloudflare Web Analytics

The free JavaScript beacon. Nothing else about Cloudflare is used.

- **DNS is untouched and must stay that way.** The apex is on GoDaddy
  nameservers pointing at the GitHub Pages A records, nothing is proxied, and
  the domain is not a Cloudflare zone. The beacon is the whole integration: one
  hostname registered in a Cloudflare account, one script tag.
- **`_includes/analytics.html` is the one home for the tag**, and it renders
  into **both** shells, `_layouts/default.html` and `eol.html`. A third shell
  needs it too or that page goes uncounted.
- **Gated on `cloudflare_analytics_token`**, the same pattern as
  `web3forms_key`: while the token is empty nothing renders and the site
  contacts Cloudflare not at all. The token is public by design.
- **`type="module"`, not `defer`.** That is Cloudflare's current form, and a
  module script is deferred already. Most snippets found online are the older
  one.
- **Keep the tag external.** `test/helpers/site.mjs` lifts the calculator by
  matching the one `<script>` on `/eol/` without a `src`, so an inline beacon
  breaks every test file.

Two limits before reading the numbers:

- **The figures undercount, worst on `/eol/`.** The beacon is blocked by
  uBlock-class blockers, Brave and the DuckDuckGo extension, and only edge
  analytics (which needs the proxy this site does not use) cannot be blocked.
  The `/eol/` audience is Ruby engineers, close to peak blocker adoption. Treat
  the numbers as traffic shape, never as a count.
- **Retention is Cloudflare's.** Six months of history, unsampled beacon data
  for seven days, then aggregated. Nothing is stored on our side.

It is defensible on a site selling trust to a CISO because it sets no cookie,
stores no identifier and builds no profile, so `/privacy.html` can describe it
in full without weakening anything else on that page. **A tool that did any of
those things would cost more credibility than the traffic data is worth.** That
is the test for any replacement, not the feature list.
