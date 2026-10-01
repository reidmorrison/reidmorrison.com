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
  assessment, then the work at a fixed price. The Remediation Assessment for
  end-of-life software, with the PCI DSS 12.3.4 remediation plan; the
  Scalability Assessment for Rails and Elixir performance; the Engineering
  Throughput Review for AI enablement. No hourly billing.
# /assessment.html was a separate page until 2026-09-03 and is folded in here.
# It was public for six days and sat in the sitemap, so the old URL redirects
# rather than 404s. See CLAUDE.md, "The assessment page was folded in".
redirect_from: /assessment.html
---

{% assign r80 = site.data.eol.rails | where: "v", "8.0" | first %}

Most engineering work is sold as a rate and a rough estimate, which puts the risk
of the unknown on you. That is why it overruns. The cost of a Rails upgrade is
dominated by things nobody can see from outside: an abandoned gem with no
maintained successor, framework internals that have been monkey patched, a test
suite with 8% meaningful coverage, an application that will not boot on a fresh
machine.

We sell it as two fixed prices, and the first one exists to make the second one
honest. The assessment finds those things first. It is underwriting rather than
a sales step, and it is why we can hold a fixed price afterwards.

There are three ways in, one for each problem we take on, and the method is the
same for all of them:

- **[Software past its end of life](#step-one-the-remediation-assessment)**,
  starting with the Remediation Assessment.
- **[A system running out of room](#scalability-and-performance-the-scalability-assessment)**,
  on Rails or Elixir, starting with the Scalability Assessment.
- **[AI tooling that has not moved delivery](#ai-enablement-the-engineering-throughput-review)**,
  starting with the Engineering Throughput Review.

## Step one: the Remediation Assessment

<div class="price" markdown="0">
  <span class="price-figure">$12,500</span>
  <span class="price-terms">Fixed &middot; Two weeks &middot; One application</span>
  <p>Two weeks of reading your application rather than talking about it. No hourly billing, no change orders inside the fixed scope, and no surprise at the end.</p>
</div>

The agreement is with {{ site.entity.name }}, {{ site.entity.form_short }}.

### What you get

**The deliverable is the compliance-ready upgrade plan**, in one document your
senior management can approve.

**A component inventory with support status.** Every language runtime,
framework and dependency, with its end-of-life date and current support state.
This is the inventory PCI DSS 6.3.2 asks for.

**The remediation plan, written for senior-management approval.** Written to the
requirements of PCI DSS 12.3.4, for your senior management to approve and your
assessor to evaluate. This is the deliverable most teams cannot produce
themselves, and the one that makes the invoice easy to justify internally.

**A framework-mapped risk register.** Each finding tied to the specific control
it implicates, rather than to a general statement about technical debt.

**The upgrade path across both axes.** Ruby and Rails sequenced together, with
the blocking dependency analysis for each hop. Old Rails versions cap the Ruby
version you can run, so the two are locked together and have to be planned
jointly. Most teams scope one axis and discover the other mid-project.

**A test coverage and safety net gap analysis.** Coverage measured rather than
reported, the effort required to reach a safe level, and how the test work will
be delivered and reviewed.

**Error and flaky-test baselines.** Thirty days of production error history and
a repeated run of your suite, both recorded and acknowledged in writing as the
pre-existing state. This protects you as much as us: it is the difference
between a genuine upgrade regression and a bug that was always there.

**A blocked dependency report.** Abandoned gems, forks required, patched
framework internals. This is where fixed-price bids go to die, and finding it
here is the entire point.

**Fixed prices for each phase that follows, valid 90 days.**

### The controls this speaks to

Which of these apply depends on the frameworks you are assessed against.

<div class="table-scroll" markdown="0">
<table>
  <thead><tr><th>Framework</th><th>Control</th><th>What it requires</th></tr></thead>
  <tbody>
  {% for c in site.data.eol.controls %}
    <tr>
      <td>{{ c.framework }}</td>
      <td><code>{{ c.control }}</code></td>
      <td>{{ c.requires }}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>
</div>

Citations verified {{ site.data.eol.verified | date: "%-d %B %Y" }}. PCI DSS
references are to v4.0.1; v4.0 was retired on 31 December 2024.

### The guarantee

**If the assessment concludes you should not do this work, or should not do it
with us, you pay nothing.** We would rather tell you that in week two than
discover it in month four, and it means there is no incentive to manufacture
scope.

## Step two: the upgrade, at a fixed price

Quoted from the assessment findings, phase by phase, before any of it starts.

- **No feature freeze.** Your application is tested against its current
  dependencies and the target ones at the same time, in your own CI, for as long
  as the upgrade runs. Your team keeps shipping while it happens. The second
  `Gemfile.lock` is deleted when the last hop lands and CI goes back to a single
  run. Most teams assume an upgrade means stopping, and that assumption is
  usually what deferred it.
- **Single-version hops.** Each one ships to production and soaks before the
  next begins, so a problem traces to one change rather than to a six-month
  merge. It also means the work can pause between hops without leaving the
  application half-migrated.
- **Test coverage raised first**, and delivered as one test-only pull request
  with no production code in it, so your engineers can review it as a unit
  instead of one distraction at a time.
- **A review clause that stops the delivery clock** when your reviewer is
  unavailable, rather than quietly consuming the schedule.
- **Liability capped at fees paid**, and the AI-tooling disclosure written into
  the statement of work rather than left for you to discover.

Where the work happens is your choice: our own managed machine, your Anthropic
tenancy, or a virtual desktop you supply, on which your source code is never
downloaded at all. Whichever applies is named in the statement of work rather
than promised in a meeting, and each costs something.
[How we work with your code]({{ '/security.html' | relative_url }}).

We do not publish upgrade prices. The honest number depends on what the
assessment turns up, and a published range would only invite everyone to expect
the bottom of it. Anyone quoting an upgrade without reading your
`Gemfile.lock` is guessing.

## Scalability and performance: the Scalability Assessment

<div class="price" markdown="0">
  <span class="price-figure">$12,500</span>
  <span class="price-terms">Fixed &middot; Two weeks &middot; One application</span>
  <p>For a system running out of room: a capacity ceiling, a missed service level, a cloud bill growing faster than your traffic, or a big day on the calendar. Rails or Elixir.</p>
</div>

### What you get

**A measured baseline.** Throughput, response times at the median and the tail,
error rates and background-job queue latency, from your production telemetry.
Numbers, not impressions.

**A capacity estimate.** How far today's peak can grow before the first
component saturates, and which component that is: application servers, the
database, connection pools, job workers, or an upstream dependency.

**The bottleneck list, ranked.** Each item with the evidence behind it, its
expected effect and a rough size, ordered by impact against effort.

**Failure modes under load.** The dangerous failures at scale are rarely
slowness. They are timeouts, retries, and callbacks arriving twice. We check
that a retried request cannot move money or records twice, and that a slow
upstream cannot exhaust your own capacity.

**Data growth.** The largest and fastest-growing tables, index health, and the
queries that will degrade first.

**Framework and runtime currency.** Rails 7.2 and later turn on YJIT, Ruby's
JIT compiler, by default when running on Ruby 3.3 or newer. If your versions are
past end of life, this is where it shows up.

**Fixed prices for each fix phase, valid 90 days.**

If you have no application performance monitoring, the first step is a
lightweight install, agreed and priced before the two weeks start, so that the
measurements are real.

### Then the fixes, at a fixed price

Quoted from the assessment, phase by phase. **What we fix is the work, and a
target measured in an environment we agree with you before it starts**: for
example, response times for named endpoints at twice today's peak, in staging.
Production depends on traffic and features that change while the work is under
way, so we measure it and report it rather than promise it. Infrastructure
changes are specified for your team to apply; we never hold write access to
production.

The same guarantee applies: if the assessment concludes you should not do the
work, or should not do it with us, you pay nothing.

## AI enablement: the Engineering Throughput Review

For a team that has AI tooling and has not seen delivery move. The cause is
rarely the tools. It is what surrounds them: pull requests too large to review,
slow or unreliable tests, long CI runs, work specified too loosely for an agent
to get right, and a codebase the tools are told nothing about.

**Two weeks, at a fixed price quoted after a first conversation.**

### What you get

**A measured picture of your delivery flow**, from 90 days of repository and CI
history: time to production, pull-request size and review wait, CI duration and
failures, flaky tests, deployment frequency and rework.

**How the tools are set up and used.** Which tools and plans you hold, the
context they are given about your codebase, how work is specified to them, and
where their output stalls.

**Conversations and observed sessions with your developers**, reported in
aggregate and never attributed.

**Ranked changes** to the codebase, the tooling configuration and the workflow,
with a drafted `AGENTS.md` for your main repository, a short guide to specifying
work for agents, and a 30/60/90-day plan with the measures to check it against.

**It reviews the workflow, never the people.** Nothing in it rates an individual
developer, and we agree that in writing before the first conversation.

Putting the changes in place, and a hands-on workshop for your team on its own
codebase, are quoted at a fixed price from the review.

## Where this extends

Rails is where we start for end-of-life work, because the clock is loudest there: every
series below Rails {{ r80.v }} has already stopped receiving security patches,
and {{ r80.v }} itself stops on {{ r80.eol | date: "%-d %B %Y" }}. The model is
not Rails-specific. It fits any source-code upgrade, migration or maintenance
backlog where the finding says unsupported software and the fix is engineering
rather than a policy memo.

If that describes something you are carrying, the first conversation is the
same one.

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

**Send us your `Gemfile.lock`.** One file, with no application source code in
it. It carries your exact Rails version, your Ruby version and every dependency
with its version, which means the first real conversation is about your actual
stack instead of a generic pitch. It is shareable under a one-page NDA if you
need one.

For a performance problem, tell us what is breaking and when your next big day
is. For AI tooling, tell us which tools your team has and what you expected them
to change.

From there: a video call to confirm scope and the forcing event, a short
agreement, and two weeks.

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% endif %}
  <a class="btn btn-secondary" href="{{ '/eol/' | relative_url }}">Check your exposure first</a>
</div>
