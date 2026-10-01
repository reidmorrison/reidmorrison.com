---
layout: default
title: Scalability and Performance
eyebrow: Scalability and performance &middot; Rails and Elixir
heading: Find where your system breaks before your busiest day does.
standfirst: >-
  A capacity ceiling, a missed service level, a cloud bill growing faster than
  your traffic, or a big day already on the calendar. We measure where a Rails
  or Elixir system runs out of room, rank what to fix, and fix it at a fixed
  price.
nav_parent: services.html
image:
  path: /images/og/og-scalability.png
  width: 1200
  height: 630
description: >-
  Scalability and performance work on Rails and Elixir, by Reid Morrison Inc.
  The Scalability Assessment, $12,500 fixed, two weeks, measured from your own
  production telemetry, then the fixes at a fixed price.
---

Performance work is usually sold by the week, with a promise to look around
and see what turns up. That puts the cost of not knowing on you. We sell it the
way we sell everything else: two weeks of measurement at a fixed price, a
written report that names the bottleneck with the evidence behind it, and then
the fixes, quoted phase by phase from that report.

## Step one: the Scalability Assessment

<div class="price" markdown="0">
  <span class="price-figure">$12,500</span>
  <span class="price-terms">Fixed &middot; Two weeks &middot; One application</span>
  <p>Measured from your own production telemetry, on Rails or Elixir. No hourly billing, and no change orders inside the fixed scope.</p>
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
past end of life, this is where it shows up, and
[end-of-life remediation]({{ '/remediation.html' | relative_url }}) is the
same method applied to that problem.

**Fixed prices for each fix phase, valid 90 days.**

If you have no application performance monitoring, the first step is a
lightweight install, agreed and priced before the two weeks start, so that the
measurements are real.

**If the assessment concludes you should not do the work, or should not do it
with us, you pay nothing.**

## Step two: the fixes, at a fixed price

Quoted from the assessment, phase by phase. **What we fix is the work, and a
target measured in an environment we agree with you before it starts**: for
example, response times for named endpoints at twice today's peak, in staging.
Production depends on traffic and features that change while the work is under
way, so we measure it and report it rather than promise it. Infrastructure
changes are specified for your team to apply; we never hold write access to
production.

<div class="record" markdown="0">
  <p><strong>We do not promise performance numbers in production.</strong> Production results depend on traffic, features and infrastructure that all move at once, so we agree a target and the environment it is measured in before the work starts, and report what production does.</p>
</div>

## Why us for this

Twenty years of systems that had to stay up under load: a real-time credit
bureau answering 100,000+ inquiries a day at 99.99% availability with
sub-second latency, and an event-driven platform on Elixir, Phoenix and Kafka.
Rails and Elixir are both first languages here, which matters when the
bottleneck sits between a Rails monolith and the Elixir service beside it.

The [libraries we maintain]({{ '/open-source.html' | relative_url }}) run
inside other people's production systems every day, and their diffs are public,
so you can judge how we change code that has to keep running before you hire
us.

## Who this is for

The CTO or VP Engineering who owns the outage, the latency complaint or the
capacity plan, or the finance lead who owns the bill, with a date attached: a
launch, a seasonal peak, a large customer going live, a contract renewal with a
service level in it, or a budget review where the hosting line has to come down.

**Tell us what is breaking and when your next big day is.** That, and whether
you have application performance monitoring, is enough for the first
conversation.

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}?line=performance">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}?line=performance">Start a conversation</a>
{% endif %}
  <a class="btn btn-secondary" href="{{ '/services.html' | relative_url }}">How an engagement works</a>
</div>
