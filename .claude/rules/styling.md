---
paths:
  - "stylesheets/**"
  - "_layouts/**"
  - "_includes/**"
  - "_config.yml"
---

# Styling

**Spectral** for display, **IBM Plex Sans** for body, **IBM Plex Mono** for
labels and data, a muted navy accent, and semantic critical / warning / ok
colours kept separate from that accent. All of it lives in
`stylesheets/site.css`.

### The tokens come from the shared theme

The six doc sites take their layout, palette, type pairing and syntax
highlighting from **`reidmorrison/rm-docs-theme`**. This site sets
`remote_theme: reidmorrison/rm-docs-theme@v1` and `site.css` includes three
files out of it:

| Include | What it brings |
|---|---|
| `css/tokens.css` | The palette in all three viewer states, the shield fills, the code surface, the syntax colours |
| `css/code.css` | Code blocks and inline code |
| `css/syntax.css` | Every Rouge class, in both themes |

Everything else about that theme is ignored. Jekyll resolves a site's own
`_layouts` and `_includes` ahead of a theme's, so `default.html`, `post.html`,
`topbar.html` and `logo-mark.svg` are unaffected, and no doc-site navigation,
sidebar or footer can appear here. **Colours are changed in the theme**: seven
sites, one palette, one commit.

Two rules govern the relationship, and both matter commercially:

- **The design system is shared; the commercial chrome is not.** A doc site gets
  the palette, both themes, the type pairing, the code treatment and the shield.
  It never gets navigation to `/services`, `/security` or `/contact`, the entity
  block, or any price. The only mention of the business on a doc site is one
  footer line, "Maintained by Reid Morrison", linking here. A doc site that
  sells consulting reads to the Ruby community as a rug-pull risk on the gem
  itself, and would cost more credibility than it could generate leads.
- **This site keeps its own layouts and its own top bar.** Only the tokens and
  the syntax sheet are common.

Three consequences:

- **A theme release reaches this site on its next Pages build.** `@v1` is a
  moving major tag, and Pages rebuilds a site only when that site is pushed, so
  nothing changes here until this repo is pushed.
- **The print block is the one part of the palette that is NOT shared.** A doc
  site prints plain black on white; this site prints a client-facing document
  that keeps the brand navy and the semantic colours. Both print blocks restate
  their own values, so a token added to the shared file has to be added to the
  print block here too, or a dark-theme visitor prints it dark.
- **`/assets/css/rm-docs.css` is published here and unused.** Jekyll copies a
  theme's `assets/` into every consuming site and offers no way to exclude it.
  It is the doc-site stylesheet, about 27KB, linked from nothing. Leave it.

### Rules for this stylesheet

- **Themes must resolve in all three viewer states.** `:root` carries the
  complete light palette; `@media (prefers-color-scheme:dark)` guarded with
  `:root:not([data-theme="light"])` redefines only tokens; `:root[data-theme="dark"]`
  redefines them again. **Never declare a colour only inside a media block**, or
  it will not apply for a visitor whose OS setting is "system".
- **Style through tokens, never literal hex values** in component rules.
- **One width, and it is the top bar's.** `.page` and `.topbar-inner` both cap
  at 1120px, so the wordmark, the nav, the masthead rule, every card and every
  paragraph share two vertical edges.
- **Nothing is capped to a reading measure, and that is deliberate.** Running
  text fills its container. The only `ch` caps are the About pull quote and the
  `/eol/` counter label, which sit beside something rather than run as prose.
  `p,li{max-width:none}` is written out rather than deleted so the full width
  reads as a decision and not an omission.
- **The print block restates every semantic token**, not only the ones it
  changes. The theme rules match `:root` at the same specificity, so a token
  left out keeps its dark value, which is how a printed finding ends up with a
  salmon counter on white.
- **A grid track holding a scrollable table is `minmax(0,1fr)`, never `1fr`.** A
  bare `1fr` takes its minimum from the content, so the 560px min-width on the
  `/eol/` controls table sizes the whole findings column and pushes the page
  sideways on a phone. The table scrolls inside `.table-scroll`; the page does
  not.
- **The `/eol/` print rules are scoped to `body.eol`.** They hide the masthead
  and the forms, which is right for the finding and wrong for every other page.
- The separator pseudo-elements (`.project-meta a + a::before`) need
  `display:inline-block`, otherwise the parent link's underline propagates into
  the middot and it renders as an underscore.
