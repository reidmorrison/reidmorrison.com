# reidmorrison.com

Source for [reidmorrison.com](https://reidmorrison.com), the site for Reid
Morrison Consulting. Jekyll, served by GitHub Pages.

The **Rails EOL exposure check** lives at [`/eol/`](https://reidmorrison.com/eol/).
Enter a Rails and Ruby version, get the days each has gone without vendor
security patches, the compliance controls that implicates, and the upgrade path
the version compatibility rules force. The dates behind it are in
[`_data/eol.yml`](_data/eol.yml).

The styling is shared with the project documentation sites
([Semantic Logger](https://logger.reidmorrison.com),
[Symmetric Encryption](https://encryption.reidmorrison.com),
[Rocket Job](https://rocketjob.reidmorrison.com),
[Secret Config](https://config.reidmorrison.com),
[IOStreams](https://iostreams.reidmorrison.com),
[Parallel Minion](https://minion.reidmorrison.com)).

## Local development

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000>.

## Editing

The library list on the home page is generated from `_data/projects.yml`. Edit
that file rather than the markdown.

See [CLAUDE.md](CLAUDE.md) for the full working notes: styling provenance, how
the project list was chosen, how to refresh download counts, and the DNS setup.
