---
layout: default
title: Writing
description: Notes and articles by Reid Morrison on distributed systems, Ruby, and AI agents.
---

## Writing
{:.no_toc}

Notes on distributed systems, Ruby, and getting AI agents to do useful work in production.

{% if site.posts.size > 0 %}
{% for post in site.posts %}
<div class="project-card">
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
  <p class="project-meta">
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
  </p>
  <p>{{ post.excerpt | strip_html | truncate: 240 }}</p>
</div>
{% endfor %}

<p><a href="{{ '/feed.xml' | relative_url }}">Subscribe via RSS</a></p>
{% else %}

Nothing published yet. In the meantime, the project documentation sites linked from the
[home page](index.html) carry most of what I would otherwise write here.

{% endif %}
