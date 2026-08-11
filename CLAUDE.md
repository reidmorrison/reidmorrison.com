# reidmorrison.com

Personal site for Reid Morrison, served by GitHub Pages at the apex domain
`reidmorrison.com`. Jekyll, markdown pages, no build step beyond what GitHub
Pages runs itself.

## What this site is for

Three jobs, in priority order:

1. **Index the open-source libraries.** 11 Ruby gems, 77M+ combined downloads.
   Each entry links to its documentation site and source.
2. **Establish credibility.** The About page carries the professional narrative.
3. **Hold a place for future writing.** The blog is scaffolded but empty, and
   there is no writing index page. Do not invent posts for it.

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
_data/projects.yml     THE source of truth for the library list. Edit here.
_layouts/default.html  Shared shell: sticky header, nav, footer.
_layouts/post.html     Blog post wrapper.
_posts/                Empty. Blog scaffold only, with no index page.
index.md               Home. Renders _data/projects.yml as cards.
about.md               Professional bio.
talks.md               Conference talks.
404.html               Links back to the doc sites.
stylesheets/           Copied from semantic_logger/docs. See "Styling".
javascripts/main.js    Placeholder, copied from the doc sites.
images/                header-banner.jpg, favicon.ico, apple-touch-icon.png.
```

## Styling: this is a copy, not a fork

`stylesheets/`, `javascripts/main.js`, and the three images are **copied
verbatim** from `semantic_logger/docs/` so this site is visually part of the same
family as the project documentation sites. There is no shared package and no
`_sass`; the CSS is checked in already compiled.

Two deliberate divergences in `stylesheets/stylesheet.css`:

1. `.brand-semantic` / `.brand-logger` were renamed to `.brand-reid` /
   `.brand-morrison`. Same blue and orange gradients, same `@supports` guard and
   white fallback.
2. A clearly delimited **"reidmorrison.com additions"** block at the end of the
   file holds every site-specific rule (`.project-card`, `.project-meta`,
   `.project-downloads`, `.lede`, `.needs-input`).

Keep site-specific CSS below that delimiter. Everything above it should stay
diffable against the upstream file:

```sh
diff <(sed -n '1,/reidmorrison.com additions/p' stylesheets/stylesheet.css) \
     ../semantic_logger/docs/stylesheets/stylesheet.css
```

If the doc sites restyle, re-copy the shared block and reapply the two
divergences.

## The project list

`_data/projects.yml` drives both `index.md` and `404.html`. Never hardcode a
project into a page.

The 11 libraries were chosen as the top 11 by download count, which is what
supports the "11 libraries, 75M+ downloads" claim used on LinkedIn. The exact
total as of 2026-08-06 is **77,188,673**.

`jruby-jms` and `sync_attr` are in the list because they are needed to reach 11
and are genuinely widely downloaded, but both are archived or long-finished.
They carry `status: stable`, which renders a muted card and describes them as
complete rather than actively developed. Do not present them as active work.

Deliberately excluded, and listed instead in the "Elsewhere" section of
`index.md`: `rocketjob_mission_control`, `opinionated_http`,
`symmetric_encryption.ex`. Also excluded: `mongo_ha`, `rubywmq`, `jruby-hornetq`,
`us_address_*` (archived or deprecated), and non-library repos.

### Refreshing download counts

Counts are hand-maintained and stamped with a verification date in both
`_data/projects.yml` and the note under the cards on `index.md`. To refresh:

```sh
for g in semantic_logger rails_semantic_logger symmetric-encryption jruby-jms \
         iostreams net_tcp_client secret_config sync_attr rocketjob \
         parallel_minion data_cleansing; do
  printf "%-26s %s\n" "$g" \
    "$(curl -s https://rubygems.org/api/v1/gems/$g.json | jq .downloads)"
done
```

Update the badge values, the total in `index.md` and `about.md`, and the date in
both places.

## Content rules

- **No em dashes.** Use commas, colons, parentheses, semicolons, or separate
  sentences. This applies to every page.
- **Do not invent facts.** Talk titles, dates, metrics, and links must come from
  Reid. Unknowns get a `.needs-input` block, not a plausible guess.
- The About page text is adapted closely from Reid's LinkedIn About section on
  purpose, so the voice matches across both. Do not rewrite it into different
  phrasing without asking.

## `.needs-input` blocks are scaffolding and must not ship

`talks.md` contains `<div class="needs-input" markdown="1">` blocks holding
questions for Reid. They render as **visible orange dashed boxes labelled
"TO FILL IN"**.

Before pointing the custom domain at this repo, or any time before announcing the
site, check:

```sh
grep -rn "needs-input" --include=*.md --include=*.html .
```

That must return nothing but the CSS rule in `stylesheets/stylesheet.css` and
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
