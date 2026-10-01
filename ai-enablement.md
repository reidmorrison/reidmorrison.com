---
layout: default
title: AI Enablement
eyebrow: AI enablement for engineering teams
heading: Your team has the AI tools. Delivery has not moved.
standfirst: >-
  The cause is rarely the tools. It is what surrounds them: pull requests too
  large to review, slow or unreliable tests, long CI runs, work specified too
  loosely for an agent to get right, and a codebase the tools are told nothing
  about. We measure how work actually flows, then fix that.
nav_parent: services.html
image:
  path: /images/og/og-ai-enablement.png
  width: 1200
  height: 630
description: >-
  AI enablement for engineering teams, by Reid Morrison Inc. The Engineering
  Throughput Review measures delivery flow from your repository and CI, and
  fixes the codebase, the tests and the workflow around the agents. Two weeks,
  fixed price.
---

DORA's 2025 research found that 90% of respondents use AI at work, and that AI
adoption still has a negative relationship with software delivery stability.
Its summary is the clearest sentence written on the subject: *AI doesn't fix a
team; it amplifies what's already there.* The gain at the keyboard is real. The
bottleneck has moved to review, testing and stability, and that is where the
work is.

It is also why we measure before we recommend anything. In METR's controlled
study, experienced open-source developers were 19% slower with early-2025 AI
tools while believing they had been 20% faster. How a team feels about its tools
is not evidence of what they changed.

## Step one: the Engineering Throughput Review

**Two weeks, at a fixed price quoted after a first conversation.**

### What you get

**A measured picture of your delivery flow**, from 90 days of repository and CI
history: time to production, pull-request size and review wait, CI duration and
failures, flaky tests, deployment frequency and rework.

**How the tools are set up and used.** Which tools and plans you hold, the
context they are given about your codebase, how work is specified to them, and
where their output stalls.

**The codebase factors that slow people and agents alike.** Test speed and
reliability, coverage where change concentrates, local setup time, and the
hotspots.

**Conversations and observed sessions with your developers**, reported in
aggregate and never attributed.

**Ranked changes** to the codebase, the tooling configuration and the workflow,
with a drafted `AGENTS.md` for your main repository, a short guide to specifying
work for agents, and a 30/60/90-day plan with the measures to check it against.
The recommendations are tool-neutral: the review covers whatever your team
runs.

**If the review concludes you should not do the work, or should not do it with
us, you pay nothing.**

<div class="record" markdown="0">
  <p><strong>It reviews the workflow, never the people.</strong> Nothing in it rates, ranks or compares an individual developer, and we agree that in writing before the first conversation. A request to do so ends the engagement.</p>
</div>

## Step two: the changes, at a fixed price

Putting the changes in place, and a hands-on workshop for your team on its own
codebase, are quoted at a fixed price from the review. The work is in the code
and the pipeline, not in a slide deck: the context file committed, automated
review on every pull request, size limits and templates, a faster and more
reliable test suite, and permission boundaries for what agents can reach.

We re-measure the same flow metrics afterwards and report what moved. We do not
promise a productivity number, because delivery depends on everything else your
team is doing at the same time.

## Why us for this

The same tools, used on a regulated codebase where a mistake had consequences:
AI review of every pull request in CI for compliance, credit-bureau reporting
and security violations, with zero major compliance incidents. And four
open-source releases shipped in July 2026 with agentic workflows, on libraries
with over 81 million downloads, whose diffs [anyone can read]({{ '/open-source.html' | relative_url }}).

The failure mode with these tools is not that they are too slow. It is that
they are too fast. Teaching a team to slow them down at the right moments is
most of the job.

## Who this is for

The CEO, CTO or VP Engineering who bought the seats, with a date attached: a
seat renewal, a board review of the AI rollout, a hiring plan that assumes the
gain, a customer security questionnaire asking how AI is used in your
development, or an agent that reached something it should not have.

**Tell us which tools your team has and what you expected them to change.**

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}?line=ai">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}?line=ai">Start a conversation</a>
{% endif %}
  <a class="btn btn-secondary" href="{{ '/services.html' | relative_url }}">How an engagement works</a>
</div>
