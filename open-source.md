---
layout: default
title: Open Source
heading: Eleven libraries, 77 million downloads, all auditable
standfirst: >-
  The case study that needs no NDA. Anyone can read the diffs and judge how I
  work before deciding whether to hire me.
description: >-
  Reid Morrison's 11 open-source Ruby libraries with over 77 million combined
  downloads, including Semantic Logger, Rails Semantic Logger and Symmetric
  Encryption.
---

Consulting references are filtered and rehearsed. Source code is not. These
libraries are in daily production use worldwide, and **four of them shipped new
versions in July 2026, built using agentic workflows**. The commits show the
increment size, the ordering, and the test discipline, which is exactly what you
would want to know before letting someone near a system under audit.

Several were written for the same problem this practice sells into. Symmetric
Encryption exists because PCI scope requires encryption in flight and at rest,
including credentials in configuration files.

{% for project in site.data.projects %}
<div class="project-card{% if project.status == 'stable' %} is-stable{% endif %}">
  <h3>
    {% if project.docs %}<a href="{{ project.docs }}">{{ project.name }}</a>{% else %}{{ project.name }}{% endif %}
    <span class="project-downloads">{{ project.downloads }} downloads</span>
  </h3>
  <p>{{ project.summary }}</p>
  {% if project.detail %}<p>{{ project.detail }}</p>{% endif %}
  <p class="project-meta">
    {% if project.docs %}<a href="{{ project.docs }}">Documentation</a>{% endif %}
    <a href="{{ project.github }}">Source</a>
    {% if project.gem %}<a href="https://rubygems.org/gems/{{ project.gem }}">RubyGems</a>{% endif %}
  </p>
</div>
{% endfor %}

Download counts were last verified on 2026-08-06. Projects shown in grey are complete and
stable rather than actively developed: they still work, and still get downloaded, but are
not receiving new features.

## Elsewhere

I also maintain [Rocket Job Mission Control](https://github.com/reidmorrison/rocketjob_mission_control),
the web management interface for Rocket Job, and
[Opinionated HTTP](https://github.com/reidmorrison/opinionated_http), an HTTP client with
retries built on Semantic Logger and Secret Config. There is an Elixir port of Symmetric
Encryption at [symmetric_encryption.ex](https://github.com/reidmorrison/symmetric_encryption.ex).

The full list is on [GitHub](https://github.com/reidmorrison?tab=repositories).

I have also spoken at ElixirConf and RailsConf, and contributed a fix adopted by
the Rails core team. See [Talks](talks.html).
