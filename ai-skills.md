---
layout: default
title: AI Skills
description: >-
  The AI Skills methodology: precisely structured business requirements that
  frontier models turn into production-ready code, applied to regulated
  financial systems.
---

## AI Skills
{:.no_toc}

**Contents**

* TOC
{:toc}

AI as a working engineering multiplier, not a slide.

## The problem

Frontier models can write good code. What they cannot do is guess the twenty implicit
constraints that make a change acceptable in a regulated financial system: which fields are
reportable, which log lines would leak PII, which error paths have a compliance obligation
attached, and which internal conventions a reviewer will reject a pull request over.

Most teams respond to this by treating AI as autocomplete and reviewing the output by hand,
which caps the benefit at typing speed. The bottleneck is not the model. It is the fact that
the requirements only exist in someone's head.

<div class="needs-input" markdown="1">
Reid: this section states the problem in general terms. If there is a specific incident or
class of failure that motivated the methodology (a category of bug that kept recurring, a
compliance finding, a review cycle that kept stalling), naming it here would make the page
far more concrete.
</div>

## What an AI Skill is

An **AI Skill** is a precisely structured statement of business requirements, written so that
a frontier model can turn it into production-ready code without a human having to re-supply
the missing context on every attempt.

The important word is *structured*. A prompt is prose, and prose leaves gaps the model fills
with plausible guesses. A Skill fixes the shape of the requirement: what the change must do,
what it must never do, which existing patterns it must follow, and what evidence counts as
proof it works.

<div class="needs-input" markdown="1">
Reid: this is the core of the page and the part I cannot write for you. Worth covering:

- The actual structure of a Skill. What are its sections? Is it a markdown file, a template,
  a directory convention? A short annotated example, even a redacted one, would carry this
  whole page.
- Where Skills live and who writes them. Engineers? Business analysts? Both?
- How a Skill differs from an acceptance criterion or a well-written ticket, since that is
  the first objection a reader will have.
- How Skills are kept current as the codebase changes.
</div>

## Applied: compliance review in CI/CD

The methodology runs in a production CI/CD pipeline where AI agents review every pull request
for:

- **Regulatory compliance** against the rules the business operates under.
- **Credit-bureau reporting**, specifically Metro 2 correctness.
- **Security violations**, including data handling and disclosure risks.

The agents run on every pull request, not on a sample, and not as an advisory step a developer
can quietly skip.

<div class="needs-input" markdown="1">
Reid: details that would strengthen this section:

- What happens when an agent flags something. Blocking check, comment, required human review?
- False positive rate, and how you tuned it. This is the question every skeptical engineer
  will ask.
- Roughly how many pull requests per week go through it.
- Which models, and whether the choice mattered.
</div>

## Results

- Roughly **doubled per-engineer productivity**.
- **Zero major compliance incidents** over the period the methodology has been in use.
- **Four open-source gems** released in July 2026 using agentic workflows, delivering in days
  what previously took weeks.

<div class="needs-input" markdown="1">
Reid: two things worth pinning down here, because both invite pushback:

- "Doubled productivity" needs a measure attached to be credible. Throughput of shipped
  changes? Cycle time? Whatever you measured, saying so converts this from a claim into
  evidence.
- The period the "zero major compliance incidents" figure covers, and ideally the baseline it
  is being compared against.
</div>

## The open-source proof

The clearest public evidence is the July 2026 release cycle. Four libraries
([Semantic Logger](https://logger.reidmorrison.com),
[Rails Semantic Logger](https://logger.reidmorrison.com/rails.html),
[IOStreams](https://iostreams.reidmorrison.com), and
[Parallel Minion](https://minion.reidmorrison.com)) shipped new versions built with agentic
workflows. The commit history, the documentation, and the released gems are all public and
can be inspected directly.

<div class="needs-input" markdown="1">
Reid: I inferred this list from release dates on RubyGems (semantic_logger 5.1.0 and
rails_semantic_logger 5.1.0 on 2026-07-20, iostreams 2.0.0 on 2026-06-19, parallel_minion
1.4.0 on 2026-04-10). Only the two Semantic Logger gems actually shipped in July. Please
confirm which four you meant, and I will correct the list and the dates.
</div>
