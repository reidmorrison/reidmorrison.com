---
layout: default
title: Reid Morrison
description: >-
  Principal Software Engineer. Author of 11 open-source Ruby libraries with over
  77 million combined downloads, including Semantic Logger, Rails Semantic
  Logger, and Symmetric Encryption.
---

## About Me
{:.no_toc}

I design, build, and own production systems end to end: distributed platforms, real-time
data systems, and AI agents doing real work in production. Over the past twenty years that
has included a real-time credit bureau processing over 100,000 inquiries per day at 99.99%
availability with sub-second latency, an event-driven rules engine on Elixir, Phoenix, and
Kafka, and most recently AI agents built into a production CI/CD pipeline that review every
pull request for regulatory compliance, credit-bureau reporting, and security violations.
[More about me](about.html).

## Open Source

Alongside that I maintain **11 open-source libraries with over 77 million combined
downloads**, in daily production use worldwide. Four of them shipped new versions in July
2026, built using AI-agentic workflows.

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
