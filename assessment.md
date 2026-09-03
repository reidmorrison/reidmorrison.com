---
layout: default
title: Remediation Assessment
# Keeps the Services item lit in the nav: /services.html describes both steps
# and hands off to this page for the detail. See _includes/topbar.html.
nav_parent: services.html
heading: The remediation plan your assessor is asking for
standfirst: >-
  $12,500 fixed. Two weeks. It produces the document PCI DSS 12.3.4 obliges you
  to have, and the fixed prices for everything that follows from it.
description: >-
  A two-week fixed-price Remediation Assessment for Rails applications.
  Component inventory, a senior-management remediation plan written to PCI DSS
  12.3.4, the Ruby and Rails upgrade path, and fixed prices per phase.
---

Most upgrade projects are quoted from a conversation and a guess. That is why
they overrun. The cost of a Rails upgrade is dominated by things nobody can see
from outside: an abandoned gem with no maintained successor, framework
internals that have been monkey patched, a test suite with 8% meaningful
coverage, an application that will not boot on a fresh machine.

The assessment finds those first. It is underwriting, not a sales step, and it
is why we can hold a fixed price afterwards.

## What you get

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

**Fixed prices for each phase, valid 90 days.**

## The controls this speaks to

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

## Price, and the guarantee

<div class="price" markdown="0">
  <span class="price-figure">$12,500</span>
  <span class="price-terms">Fixed &middot; Two weeks</span>
  <p>One application. No hourly billing, no change orders inside the fixed scope, and no surprise at the end.</p>
</div>

The agreement is with {{ site.entity.name }}, {{ site.entity.form_short }}.

**If the assessment concludes you should not do this work, or should not do it
with us, you pay nothing.** We would rather tell you that in week two than
discover it in month four, and it means there is no incentive to manufacture
scope.

Remediation is quoted from the findings. We do not publish upgrade prices,
because the honest number depends on what the assessment turns up, and a
published range would only invite everyone to expect the bottom of it.
[How the two steps fit together]({{ '/services.html' | relative_url }}).

## How it starts

**Send us your `Gemfile.lock`.** One file, with no application source code in
it. It gives us your exact Rails version, your Ruby version, and every
dependency with its version, which means the first real conversation can be
about your actual stack instead of a generic pitch. It is shareable under a
one-page NDA if you need one.

From there: a video call to confirm scope and the forcing event, a short
agreement, and two weeks.

## How the work runs afterwards

Phased single-version hops. Each one ships to production and soaks before the
next begins, so a problem is always traceable to one change rather than to a
six-month merge.

Where the work happens is your choice: our own managed machine, your Anthropic
tenancy, or a virtual desktop you supply, on which your source code is never
downloaded at all. Whichever applies is named in the statement of work rather
than promised in a meeting, and each costs something.
[How we work with your code]({{ '/security.html' | relative_url }}).

The agreement also caps liability at fees paid and carries a review clause that
pauses the delivery clock if your reviewer is unavailable, rather than letting it
quietly consume the schedule.

<div class="cta-row" markdown="0">
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
  <a class="btn btn-secondary" href="{{ '/eol/' | relative_url }}">Check your exposure first</a>
</div>
