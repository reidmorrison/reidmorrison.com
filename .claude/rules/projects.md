---
paths:
  - "_data/projects.yml"
  - "open-source.md"
  - "about.md"
  - "404.html"
  - "script/og-cards.mjs"
---

# The project list

`_data/projects.yml` drives `open-source.md` and `404.html`, and `about.md`
pulls two download figures from it with `where`. **Never hardcode a project, a
download count, or a documentation URL into a page.**

The list is ordered by hand, not by download count: projects with a
documentation site first, then projects without one, then `jruby-jms` last
because it is archived. Within each group, by download count descending.
`404.html` lists the documentation sites in the same order.

`jruby-jms` and `sync_attr` are in the list because they are needed to reach 11
and are genuinely widely downloaded, but both are archived or long-finished.
They carry `status: stable`, which renders a muted card and describes them as
complete. **Do not present them as active work.**

Deliberately excluded, and listed instead in the "Elsewhere" section of
`open-source.md`: `rocketjob_mission_control`, `opinionated_http`,
`symmetric_encryption.ex`. Also excluded: `mongo_ha`, `rubywmq`,
`jruby-hornetq`, `us_address_*` (archived or deprecated), and non-library repos.

### Refreshing download counts

Counts are hand-maintained and stamped with a verification date in both
`_data/projects.yml` and the note under the cards on `open-source.md`, currently
2026-09-30. Refresh before the site is pushed at buyers:

```sh
for g in semantic_logger rails_semantic_logger symmetric-encryption jruby-jms \
         iostreams net_tcp_client secret_config sync_attr rocketjob \
         parallel_minion data_cleansing; do
  printf "%-26s %s\n" "$g" \
    "$(curl -s https://rubygems.org/api/v1/gems/$g.json | jq .downloads)"
done
```

Update the badge values in `_data/projects.yml` and the date in the note on
`open-source.md`. The two figures on `about.md` render from the data file and
follow automatically. **The 81M total is written out in prose in several places
and has to be changed by hand.** The one exception is `images/og/og-open-source.png`,
which sums the data file itself: re-run `node script/og-cards.mjs` instead of
editing it.
