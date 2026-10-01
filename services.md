---
layout: default
title: Services
heading: Two steps. Both at a fixed price.
standfirst: >-
  The assessment finds out what is wrong and sizes the work: the remediation
  plan your assessor is asking for, the bottleneck behind a capacity ceiling, or
  what is holding back your team's AI tooling. The work is quoted from it.
  Nothing is billed by the hour.
# Shared on its own, so it gets its own link preview card rather than the
# site default. Built by script/og-cards.mjs.
image:
  path: /images/og/og-services.png
  width: 1200
  height: 630
description: >-
  How an engagement with Reid Morrison Inc. works: a two-week fixed-price
  assessment, then the work at a fixed price, for end-of-life remediation,
  scalability and performance on Rails and Elixir, and AI enablement for
  engineering teams. No hourly billing.
# The hub since 2026-10-01. Each line's detail, deliverable list and price box
# lives on its own page; this page holds what all three share. The
# /assessment.html redirect moved to /remediation.html the same day.
---

Most engineering work is sold as a rate and a rough estimate, which puts the risk
of the unknown on you. That is why it overruns. The cost is dominated by things
nobody can see from outside: an abandoned dependency with no maintained
successor, a query that degrades only past a certain table size, a test suite
too slow and too flaky for anyone to trust, an application that will not boot
on a fresh machine.

We sell it as two fixed prices, and the first one exists to make the second one
honest. The assessment finds those things first. It is underwriting rather than
a sales step, and it is why we can hold a fixed price afterwards.

## Three problems, one method

{% include doors.html %}

## Step one: the assessment

Two weeks of reading your application, your telemetry or your delivery history
rather than talking about them, for one application or one team.

- **A written report** your senior management can act on, with every finding
  tied to the evidence behind it.
- **Baselines acknowledged in writing** before any work starts: production
  errors, flaky tests, response times or delivery flow, whichever the problem
  calls for. They are the difference between something the work broke and
  something that was always there, and they protect you as much as us.
- **Fixed prices for each phase that follows, valid 90 days.**

**The guarantee.** If the assessment concludes you should not do this work, or
should not do it with us, you pay nothing. We would rather tell you that in week
two than discover it in month four, and it means there is no incentive to
manufacture scope.

## Step two: the work, at a fixed price

Quoted from the assessment findings, phase by phase, before any of it starts.

- **Small increments, each shipped and soaked** before the next begins, so a
  problem traces to one change, and the work can pause between phases without
  leaving anything half done.
- **Your team keeps shipping.** Nothing we do asks you to freeze feature work.
- **A review clause that stops the delivery clock** when your reviewer is
  unavailable, rather than quietly consuming the schedule.
- **Liability capped at fees paid**, and the AI-tooling disclosure written into
  the statement of work rather than left for you to discover.

Where the work happens is your choice: our own managed machine, your Anthropic
tenancy, or a virtual desktop you supply, on which your source code is never
downloaded at all. Whichever applies is named in the statement of work rather
than promised in a meeting, and each costs something.
[How we work with your code]({{ '/security.html' | relative_url }}).

We do not publish project prices. The honest number depends on what the
assessment turns up, and a published range would only invite everyone to expect
the bottom of it.

## What we do not do

<div class="record" markdown="0">
  <p><strong>We remediate software so that an auditor stops flagging it. We do not render compliance opinions, issue certifications, or sign anything an assessor relies on.</strong> Your assessor decides whether a control is met. Our job is to remove the condition that created the finding, and to hand you the documentation that proves when it was removed.</p>
</div>

<div class="record" markdown="0">
  <p><strong>We do not promise performance or productivity numbers in production, and we do not evaluate individual developers.</strong> Production results depend on traffic, features and infrastructure that all move at once, so we agree a target and the environment it is measured in before the work starts, and report what production does. The Engineering Throughput Review looks at the workflow and the codebase, never at people.</p>
</div>

We also do not staff a team onto your project. One named engineer does the
work, from the assessment through to the last phase, which is
[the trade this practice makes deliberately]({{ '/about.html' | relative_url }}).

## How it starts

**For software past its end of life, send us your `Gemfile.lock`.** One file,
with no application source code in it, and shareable under a one-page NDA if you
need one. **For a performance problem**, tell us what is breaking and when your
next big day is. **For AI tooling**, tell us which tools your team has and what
you expected them to change.

From there: a video call to confirm scope and what is forcing the date, a short
agreement, and two weeks.

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% endif %}
</div>
