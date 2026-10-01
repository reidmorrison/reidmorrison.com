---
layout: default
title: EOL Remediation
eyebrow: End-of-life remediation
heading: Your Rails version is an audit finding. We close it at a fixed price.
standfirst: >-
  We upgrade production applications off end-of-life software and hand them
  back on a supported version, in weeks rather than quarters. Rails and Ruby
  first. The same fixed-price model fits any upgrade, migration or maintenance
  backlog with a compliance date attached.
nav_parent: services.html
image:
  path: /images/og/og-remediation.png
  width: 1200
  height: 630
description: >-
  End-of-life remediation for Rails applications in PCI DSS, SOC 2, HIPAA and
  ISO 27001 scope, by Reid Morrison Inc. The Remediation Assessment, $12,500
  fixed, two weeks, with the PCI DSS 12.3.4 remediation plan as its deliverable.
# /assessment.html described the Remediation Assessment until 2026-09-03, was
# folded into /services.html, and lands here since services.html became the
# hub for all three lines on 2026-10-01. See CLAUDE.md.
redirect_from: /assessment.html
---

{% assign r72 = site.data.eol.rails | where: "v", "7.2" | first %}
{% assign r80 = site.data.eol.rails | where: "v", "8.0" | first %}
{% assign ruby32 = site.data.eol.ruby | where: "v", "3.2" | first %}

<div class="cta-row" markdown="0">
  <a class="btn btn-primary" href="{{ '/eol/' | relative_url }}">Check your exposure</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
</div>

Rails {{ r72.v }} stopped receiving security patches on
{{ r72.eol | date: "%-d %B %Y" }}. Rails {{ r80.v }} follows on
{{ r80.eol | date: "%-d %B %Y" }}, and after that Rails
{{ site.data.eol.target_rails }} is the only series still receiving them. Ruby
{{ ruby32.v }} went end of life on {{ ruby32.eol | date: "%-d %B %Y" }}.

If you are assessed against PCI DSS, SOC 2, HIPAA or ISO 27001, that is not a
preference about upgrades. It is a control with a number attached, and an
assessor who will ask you about it.

## The trap most teams find halfway through

Old Rails versions impose a *maximum* Ruby version, not just a minimum. Rails
6.0 caps at Ruby below 3.0. Rails 5.2 caps at below 2.7. Every supported Rails
release requires Ruby 3.2 or later.

So a company on Rails 6.0 or earlier cannot upgrade Ruby without first
upgrading Rails, and cannot upgrade Rails without first upgrading Ruby. No
single upgrade resolves it, and the gap widens on both axes at once. Teams
routinely scope one axis, start work, and discover the other.

[See the exact path your versions force]({{ '/eol/' | relative_url }}), including
the days each has gone unpatched and the controls it implicates.

## Three ways to answer the finding

<div class="options" markdown="0">
  <div class="option option--crit">
    <p class="verdict">Costs nothing now</p>
    <h3>Leave it</h3>
    <p>The finding stays open and the days unpatched keep climbing. Under HIPAA, documented awareness without action is what moves an incident toward willful neglect, and the penalty tiers scale by culpability.</p>
  </div>
  <div class="option option--warn">
    <p class="verdict">Recurring</p>
    <h3>Buy extended support</h3>
    <p>A third party backports patches to your unsupported version for an annual fee. The bill recurs for as long as you stay, and the framework is still not receiving vendor fixes, so the control language still applies.</p>
  </div>
  <div class="option option--ok">
    <p class="verdict">Ends the finding</p>
    <h3>Get current</h3>
    <p>Move onto a supported version and the condition that created the finding is gone. Historically expensive and slow, which is the actual reason it keeps getting deferred. That is the part we have changed.</p>
  </div>
</div>

## Step one: the Remediation Assessment

<div class="price" markdown="0">
  <span class="price-figure">$12,500</span>
  <span class="price-terms">Fixed &middot; Two weeks &middot; One application</span>
  <p>Two weeks of reading your application rather than talking about it. No hourly billing, no change orders inside the fixed scope, and no surprise at the end.</p>
</div>

The cost of an upgrade is dominated by things nobody can see from outside: an
abandoned gem with no maintained successor, framework internals that have been
monkey patched, a test suite with 8% meaningful coverage, an application that
will not boot on a fresh machine. The assessment finds those first. It is
underwriting rather than a sales step, and it is why we can hold a fixed price
afterwards.

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

**If the assessment concludes you should not do this work, or should not do it
with us, you pay nothing.**

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

We do not publish upgrade prices. The honest number depends on what the
assessment turns up, and a published range would only invite everyone to expect
the bottom of it. Anyone quoting an upgrade without reading your
`Gemfile.lock` is guessing.

The terms that apply to every engagement, from the review clause to the
liability cap, are on [how an engagement works]({{ '/services.html' | relative_url }}).

## Where this extends

Rails is where we start, because the clock is loudest there: every series below
Rails {{ r80.v }} has already stopped receiving security patches, and
{{ r80.v }} itself stops on {{ r80.eol | date: "%-d %B %Y" }}. The model is not
Rails-specific. It fits any source-code upgrade, migration or maintenance
backlog where the finding says unsupported software and the fix is engineering
rather than a policy memo.

<div class="record" markdown="0">
  <p><strong>We remediate software so that an auditor stops flagging it. We do not render compliance opinions, issue certifications, or sign anything an assessor relies on.</strong> Your assessor decides whether a control is met. Our job is to remove the condition that created the finding, and to hand you the documentation that proves when it was removed.</p>
</div>

## Who this is for

Mid-market companies in a regulated scope, weighted toward SaaS, healthcare,
insurance and payments, running business-critical Rails applications on
unsupported versions, with something forcing the timeline: an audit date, an
enterprise deal blocked on a security review, a penetration test finding, or a
specific unpatched CVE.

**Send us your `Gemfile.lock`.** One file, with no application source code in
it. It carries your exact Rails version, your Ruby version and every dependency
with its version, which means the first real conversation is about your actual
stack instead of a generic pitch. It is shareable under a one-page NDA if you
need one.

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}?line=eol">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}?line=eol">Start a conversation</a>
{% endif %}
  <a class="btn btn-secondary" href="{{ '/eol/' | relative_url }}">Check your exposure first</a>
</div>
