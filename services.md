---
layout: default
title: Services
heading: Two steps. Both at a fixed price.
standfirst: >-
  The assessment produces the remediation plan your assessor is asking for, and
  sizes the upgrade. The upgrade is quoted from it. Nothing is billed by the
  hour.
description: >-
  How an engagement with Reid Morrison Inc. works: a fixed-price Remediation
  Assessment, the compliance-ready upgrade plan as its deliverable, then a
  fixed-price quote for the upgrade itself. No hourly billing.
---

{% assign r80 = site.data.eol.rails | where: "v", "8.0" | first %}

Most upgrade work is sold as a rate and a rough estimate, which puts the risk
of the unknown on you. We sell it as two fixed prices, and the first one exists
to make the second one honest.

## Step one: the Remediation Assessment

<div class="price" markdown="0">
  <span class="price-figure">$12,500</span>
  <span class="price-terms">Fixed &middot; Two weeks &middot; One application</span>
  <p>Two weeks of reading your application rather than talking about it. It ends with a plan your senior management can approve and prices you can budget against.</p>
</div>

**The deliverable is the compliance-ready upgrade plan.** In one document:

- The **remediation plan approved at senior management level** that PCI DSS
  12.3.4 requires for any component no longer receiving vendor security fixes.
  Most teams are obliged to have this and do not.
- The **component inventory** PCI DSS 6.3.2 asks for, with the support status
  and end-of-life date of every runtime, framework and dependency.
- The **upgrade path across both Ruby and Rails**, sequenced together, because
  old Rails versions cap the Ruby version you can run and the two cannot be
  planned separately.
- The **error and flaky-test baselines**, recorded and acknowledged in writing
  before any code changes, so a genuine upgrade regression can be told apart
  from a bug that was always there.
- The **blocked dependency report**: abandoned gems, forks required, patched
  framework internals. This is where fixed-price bids usually go to die, and
  finding it here is the point.
- **Fixed prices for each phase that follows, valid 90 days.**

**If the assessment concludes you should not do this work, or should not do it
with us, you pay nothing.** We would rather tell you that in week two than
discover it in month four, and it means there is no incentive to manufacture
scope.

[Everything the assessment contains]({{ '/assessment.html' | relative_url }})

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

We do not publish upgrade prices. The honest number depends on what the
assessment turns up, and a published range would only invite everyone to expect
the bottom of it.

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

**Send us your `Gemfile.lock`.** One file, no application source code in it. It
carries your exact Rails version, your Ruby version and every dependency, which
means the first real conversation is about your stack rather than a generic
pitch. It is shareable under a one-page NDA if you need one.

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
