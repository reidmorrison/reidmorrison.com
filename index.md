---
layout: default
title: EOL Remediation for Rails
heading: Your Rails version is an audit finding. We close it at a fixed price.
standfirst: >-
  Reid Morrison Inc. upgrades production applications off end-of-life software
  and hands them back on a supported version, in weeks rather than quarters.
  Rails and Ruby first. The same fixed-price model fits any upgrade, migration
  or maintenance backlog with a compliance date attached.
description: >-
  Reid Morrison Inc. End-of-life remediation for Rails applications in
  PCI DSS, SOC 2, HIPAA and ISO 27001 scope. Remediation Assessment, $12,500
  fixed, two weeks.
---

{% assign r72 = site.data.eol.rails | where: "v", "7.2" | first %}
{% assign r80 = site.data.eol.rails | where: "v", "8.0" | first %}
{% assign target = site.data.eol.rails | where: "v", site.data.eol.target_rails | first %}
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

## Start with the assessment

PCI DSS 12.3.4 requires a remediation plan approved by senior management for
any component no longer receiving vendor security fixes. Most teams do not have
that document. It is the first thing we produce.

<div class="price" markdown="0">
  <span class="price-figure">$12,500</span>
  <span class="price-terms">Fixed &middot; Two weeks</span>
  <p>The Remediation Assessment. Component inventory, the 12.3.4 remediation plan itself, the upgrade path across both Ruby and Rails, and fixed prices for each phase that follows.</p>
</div>

If the assessment concludes you should not do this work, or should not do it
with us, you pay nothing.

Remediation is quoted from the assessment findings. Every codebase is
different, and anyone quoting an upgrade without reading your `Gemfile.lock` is
guessing.

[How an engagement works, and what the assessment contains]({{ '/services.html' | relative_url }})

## Why one engineer, and why this one

Twenty years building systems where being wrong was expensive: a real-time
credit bureau at 99.99% availability, healthcare, payments, and an event-driven
platform on Elixir and Kafka. Reid Morrison does that work himself. You are not
being sold a principal engineer and handed a junior.

He maintains **11 open-source Ruby libraries with over 79 million combined
downloads**, and shipped new versions of four of them in July 2026 using
agentic workflows. Those diffs are public. You can audit how he works, at what
increment size and in what order, before you hire anyone.
[See the libraries]({{ '/open-source.html' | relative_url }}).

The failure mode with AI tooling on a production upgrade is not that it is too
slow. It is that it is too fast. The value is knowing which step happens first
and how little to change in any one iteration, and that comes from having done
this before on systems where a bad deploy had consequences.

Where the work happens is your choice, and there are three postures: our own
managed machine, your Anthropic tenancy, or a virtual desktop you supply, on
which your source code is never downloaded at all. Whichever applies goes into
the agreement rather than being promised in a meeting.
[How we work with your code]({{ '/security.html' | relative_url }}).

## Who this is for

Mid-market companies in a regulated scope, weighted toward SaaS, healthcare,
insurance and payments, running business-critical Rails applications on
unsupported versions, with something forcing the timeline: an audit date, an
enterprise deal blocked on a security review, a penetration test finding, or a
specific unpatched CVE.

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% endif %}
  <a class="btn btn-secondary" href="{{ '/eol/' | relative_url }}">Check your exposure first</a>
</div>
