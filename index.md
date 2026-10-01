---
layout: default
title: Fixed-Price Engineering
heading: Fixed-price engineering for production software with a deadline.
standfirst: >-
  Reid Morrison Inc. takes on the problems in a production application that
  already have an owner, a budget and a date: software past its end of life, a
  system running out of room, and AI tooling that has not moved delivery. Every
  engagement starts with a two-week assessment at a fixed price, and the work is
  quoted from what it finds. Nothing is billed by the hour.
description: >-
  Reid Morrison Inc. does fixed-price engineering on production applications:
  end-of-life remediation for companies in PCI DSS, SOC 2, HIPAA and ISO 27001
  scope, scalability and performance on Rails and Elixir, and AI enablement for
  engineering teams. Every engagement starts with a two-week fixed-price
  assessment.
---

{% comment %}
  The home page sells the firm, then lets the visitor choose a door. Research
  behind the order (2026-10-01): buyers of professional services check the
  website to decide what kind of firm this is and whether it fits, and rule
  most providers out without ever talking to them; expertise and past
  performance are the top two selection factors. So the first screen says what
  the firm does, for whom and what makes it different, the doors come straight
  after it, and the proof follows. Each line's detail lives on its own page.
  /eol/ stays the EOL lead magnet, linked from here and from /remediation.html.
{% endcomment %}

## What is forcing your timeline?

{% include doors.html %}

## Every engagement works the same way

<div class="facts" markdown="0">
  <div class="fact">
    <span class="fact-figure">Two weeks</span>
    <p>A fixed-price assessment of one application or one team, delivered as a written report your management can act on.</p>
  </div>
  <div class="fact">
    <span class="fact-figure">Fixed price</span>
    <p>For each phase of the work that follows, quoted from the report and valid for 90 days. Never an hourly rate.</p>
  </div>
  <div class="fact">
    <span class="fact-figure">Guaranteed</span>
    <p>If the assessment concludes you should not do the work, or should not do it with us, you pay nothing for it.</p>
  </div>
</div>

Most engineering work is sold as a rate and a rough estimate, which puts the
risk of the unknown on you. That is why it overruns. We sell it as two fixed
prices, and the first one exists to make the second one honest: the assessment
finds what nobody can see from outside, and it is why we can hold a fixed price
afterwards.
[How an engagement works]({{ '/services.html' | relative_url }}).

## You get the engineer who does the work

Twenty years building systems where being wrong was expensive: a real-time
credit bureau at 99.99% availability, healthcare, payments, and an event-driven
platform on Elixir and Kafka. Reid Morrison does the work himself, from the
assessment to the last phase. You are not sold a principal engineer and handed
a junior.

**The proof is public.** He maintains 11 open-source Ruby libraries with over 81
million combined downloads, and shipped new versions of four of them in July
2026 using agentic workflows. You can read those diffs, and judge the increment
size, the ordering and the test discipline, before you hire anyone.
[See the libraries]({{ '/open-source.html' | relative_url }}).

**AI-assisted, with restraint.** The failure mode with AI tooling on a
production system is not that it is too slow. It is that it is too fast. The
value is knowing which step happens first and how little to change in any one
iteration, and that comes from having done this before on systems where a bad
deploy had consequences.

## Built to pass your vendor review

The agreement is with {{ site.entity.name }}, {{ site.entity.form_short }},
corp-to-corp, with liability capped at fees paid and the AI tooling disclosed in
the statement of work. Where the work happens is your choice: our own managed
machine, your Anthropic tenancy, or a virtual desktop you supply, on which your
source code is never downloaded at all.
[How we work with your code]({{ '/security.html' | relative_url }}), written for
the reviewer your CISO forwards it to.

## Who this is for

Mid-market software companies, weighted toward SaaS, with a business-critical
application and a problem that already has a date on it: an audit, a blocked
enterprise deal, a launch or seasonal peak, a contract with a service level in
it, or a renewal of the AI seats. Mostly Rails, Ruby and Elixir.

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% endif %}
  <a class="btn btn-secondary" href="{{ '/eol/' | relative_url }}">Check your Rails exposure</a>
</div>
