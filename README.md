# reidmorrison.com

Source for [reidmorrison.com](https://reidmorrison.com), my personal site. Jekyll,
served by GitHub Pages.

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
