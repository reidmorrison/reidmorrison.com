---
layout: default
title: Services
heading: Two steps. Both at a fixed price.
standfirst: >-
  The assessment produces the remediation plan your assessor is asking for, and
  sizes the upgrade. The upgrade is quoted from it. Nothing is billed by the
  hour.
# Shared on its own, so it gets its own link preview card rather than the
# site default. Built by script/og-cards.mjs.
image:
  path: /images/og/og-services.png
  width: 1200
  height: 630
description: >-
  How an engagement with Reid Morrison Inc. works: a two-week fixed-price
  Remediation Assessment producing the PCI DSS 12.3.4 remediation plan, the
  component inventory, the Ruby and Rails upgrade path and fixed prices per
  phase, then the upgrade itself at a fixed price. No hourly billing.
# /assessment.html was a separate page until 2026-09-03 and is folded in here.
# It was public for six days and sat in the sitemap, so the old URL redirects
# rather than 404s. See CLAUDE.md, "The assessment page was folded in".
redirect_from: /assessment.html
---

{% assign r80 = site.data.eol.rails | where: "v", "8.0" | first %}

Most upgrade work is sold as a rate and a rough estimate, which puts the risk of
the unknown on you. That is why it overruns. The cost of a Rails upgrade is
dominated by things nobody can see from outside: an abandoned gem with no
maintained successor, framework internals that have been monkey patched, a test
suite with 8% meaningful coverage, an application that will not boot on a fresh
machine.

We sell it as two fixed prices, and the first one exists to make the second one
honest. The assessment finds those things first. It is underwriting rather than
a sales step, and it is why we can hold a fixed price afterwards.

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

**The remediation plan, written for senior-management approval.** Structured to
satisfy PCI DSS 12.3.4 by name. This is the deliverable most teams cannot
produce themselves, and the one that makes the invoice easy to justify
internally.

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

- **Single-version hops.** Each one ships to production and soaks before the
  next begins, so a problem traces to one change rather than to a six-month
  merge.
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

## Where this extends

Rails is where we start, because the end-of-life clock is loudest there: every
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

We also do not staff a team onto your project. One named engineer does the
work, from the assessment through to the last phase, which is
[the trade this practice makes deliberately]({{ '/about.html' | relative_url }}).

## How it starts

**Send us your `Gemfile.lock`.** One file, with no application source code in
it. It carries your exact Rails version, your Ruby version and every dependency
with its version, which means the first real conversation is about your actual
stack instead of a generic pitch. It is shareable under a one-page NDA if you
need one.

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
