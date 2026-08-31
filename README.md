# reidmorrison.com

Source for [reidmorrison.com](https://reidmorrison.com), the website for **Reid
Morrison Consulting**: end-of-life remediation for Rails applications in PCI DSS,
SOC 2, HIPAA and ISO 27001 scope. Jekyll, served by GitHub Pages.

This was a personal site supporting a job search until August 2026. It is now a
commercial site, and the two purposes do not mix: copy written for a hiring
manager is a leftover to be fixed, not a style choice.

The **Rails EOL exposure check** lives at [`/eol/`](https://reidmorrison.com/eol/).
Enter a Rails and Ruby version, get the days each has gone without vendor
security patches, the compliance controls that implicates, and the upgrade path
the version compatibility rules force. The dates behind it are in
[`_data/eol.yml`](_data/eol.yml).

The styling **used to be** copied from the project documentation sites
([Semantic Logger](https://logger.reidmorrison.com),
[Symmetric Encryption](https://encryption.reidmorrison.com),
[Rocket Job](https://rocketjob.reidmorrison.com),
[Secret Config](https://config.reidmorrison.com),
[IOStreams](https://iostreams.reidmorrison.com),
[Parallel Minion](https://minion.reidmorrison.com)).
That ended with the August 2026 retheme. Those sites keep their own look; this
one now uses a single stylesheet of its own, `stylesheets/site.css`.

## Local development

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000>.

## Editing

The library list on the open source page is generated from
`_data/projects.yml`, and the Rails and Ruby end-of-life data behind `/eol/` is
in `_data/eol.yml`. Edit those rather than the markdown.

See [CLAUDE.md](CLAUDE.md) for the full working notes: what may and may not be
published about pricing, the design system, how to refresh download counts, and
the DNS setup.
