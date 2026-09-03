---
layout: default
title: About
heading: You are buying judgement, not capacity
standfirst: >-
  Anyone can point a coding agent at a Rails upgrade. The reason to hire me is
  twenty years of knowing what breaks, on systems where being wrong was
  expensive.
description: >-
  Reid Morrison. Twenty years building regulated production systems: credit
  bureau, healthcare, payments. Author of 11 open-source Ruby libraries with
  77M+ downloads. Now doing end-of-life remediation full time.
---

{% assign logger = site.data.projects | where: "name", "Semantic Logger" | first %}
{% assign crypto = site.data.projects | where: "name", "Symmetric Encryption" | first %}

<div class="about-intro" markdown="1">
![Reid Morrison]({{ '/images/reid-morrison.jpg' | relative_url }}){: class="avatar" }

> I remove end-of-life findings from production Rails applications at regulated
> companies. Fixed price, delivered in weeks, by the engineer who does the work.
</div>

## Why a buyer should care about experience here

An upgrade under audit is not a technical purchase. You are handing someone
write access to a system that regulators, customers, or an acquirer are
currently looking at, and asking them not to break it.

That makes experience the thing you are actually paying for. The market is full
of people with the same AI tooling I have and none of the scar tissue. The
failure mode with these tools is not that they are too slow. It is that they
are too fast: they will happily rewrite four things at once, pass a thin test
suite, and hand you a deploy nobody can bisect. Knowing which step goes first,
and how little to change in any one iteration, is the entire skill, and it does
not come from the tooling.

## Twenty years of systems where mistakes were expensive

- A **real-time credit bureau** processing 100,000+ inquiries per day at 99.99%
  availability with sub-second latency, which contributed directly to Clarity
  Services' $100M acquisition by Experian. Credit bureau work means Metro 2,
  dispute handling, and audit trails that have to survive an examiner.
- **Healthcare and payments systems**, where PCI and HIPAA obligations are not a
  compliance team's problem but a constraint on every design decision. Encryption
  in flight and at rest, key rotation, and credential handling are things I have
  implemented rather than reviewed.
- An **event-driven rules engine** on Elixir, Phoenix and Kafka that moved
  Salesloft from a static sales funnel to a real-time revenue workflow.
- **AI agents built into a production CI/CD pipeline** that review every pull
  request for regulatory compliance, credit-bureau reporting, and security
  violations. I built the methodology behind that: precisely structured
  requirements that frontier models turn into production-ready code. It roughly
  doubled per-engineer productivity **with zero major compliance incidents**,
  which is the half of that sentence that matters for this work.

## Proof you can audit before you hire me

Consulting references are selected and rehearsed. Source code is not.

I maintain **11 open-source Ruby libraries with over 77 million combined
downloads**, including [Semantic Logger]({{ logger.docs }}) at
{{ logger.downloads }} and [Symmetric Encryption]({{ crypto.docs }}) at
{{ crypto.downloads }}, in daily production use worldwide.

**I shipped new versions of four of them in July 2026 using agentic workflows.**
Those commits are public. Before signing anything, you can read them and judge
the increment size, the ordering, and the test discipline for yourself. That is
a far better basis for a decision than a case study I wrote about myself.
[See the libraries](open-source.html).

Symmetric Encryption exists because PCI scope requires encryption in flight and
at rest, including credentials in configuration files. A fair number of
PCI-scope Rails applications depend on it, which is a reasonable indication of
how long I have been working on this particular problem.

## You get me

This practice is deliberately one person. There is no bench, no account manager,
and no junior who does the work after the senior wins it. I take two engagements
at a time so that neither is being fitted around the other.

The trade is honest: I am not the right call for a twelve-team platform
migration. For one business-critical application that has fallen off supported
versions and now has a date attached to it, being solo is the feature.

**The agreement itself is with {{ site.entity.name }},
{{ site.entity.form_short }}.** You get me, and you get me from an entity your
procurement team can look up, insure against, and hold to a contract.

## How I work

Fixed price per milestone, never hourly, so you carry no risk on how long it
takes. Phased single-version hops, each shipped to production and soaked before
the next begins, so any problem traces to one change. Liability capped at fees
paid, and a review clause that pauses the clock instead of quietly eating the
schedule when your reviewer is unavailable.

Where the work happens is your choice, and all three postures are set out in
full on the [security page](security.html): my own managed machine, your
Anthropic tenancy, or a virtual desktop you supply, on which your source code is
never downloaded at all. Whichever applies goes into the statement of work
rather than being promised in a meeting.

[How an engagement works](services.html)

## Speaking

I have spoken at ElixirConf and RailsConf, and contributed a fix adopted by the
Rails core team. See [Talks](talks.html).

<div class="cta-row" markdown="0">
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
  <a class="btn btn-secondary" href="{{ '/eol/' | relative_url }}">Check your exposure</a>
</div>
