---
layout: default
title: Security
eyebrow: For your security and vendor risk teams
heading: How we work with your code
standfirst: >-
  Written the way a security questionnaire asks it, so your third-party risk
  team can read this page instead of waiting on a document.
description: >-
  How Reid Morrison Inc. handles client code: work in your repositories and
  environments, nothing retained, managed and encrypted devices, MFA, access
  handling and offboarding, and the AI tooling terms in full.
---

An upgrade under audit means giving an outside party write access to a system
your assessor is already looking at. That is a risk decision before it is a
technical one, and for a small vendor it is usually the slowest part of getting
started.

So this page answers it without being asked. Everything below is what would go
on your questionnaire. If your process needs it on your own form instead, send
the form.

**Reid Morrison Inc., a Florida corporation, is the contracting party.** One
named engineer does the work. There is no bench, no subcontractor, and no
offshore delivery team.

## The short version

<div class="table-scroll" markdown="0">
<table>
  <thead><tr><th>What gets asked</th><th>The answer here</th></tr></thead>
  <tbody>
    <tr><td>Where the work happens</td><td>In your repositories, your CI and your environments, through your branches and your pull requests.</td></tr>
    <tr><td>What is kept afterwards</td><td>Nothing. Working copies are destroyed at close-out and confirmed to you in writing.</td></tr>
    <tr><td>Backups</td><td>The directory holding client code is excluded from every backup, so deletion at close-out is final rather than deferred.</td></tr>
    <tr><td>Who does the work</td><td>One named engineer, throughout. No subcontractors, no offshore delivery, no bench.</td></tr>
    <tr><td>Devices</td><td>Company-owned Mac. Full-disk encryption, automatic screen lock, enrolled in Apple Business Manager and centrally managed. Client work never touches a personal device.</td></tr>
    <tr><td>Accounts</td><td>Multi-factor authentication on every account that can reach your code, passkeys wherever supported, unique credentials in a password manager, no shared logins.</td></tr>
    <tr><td>Access</td><td>Issued by you, to a named individual, at the least privilege the phase needs. Revoked by you at close-out.</td></tr>
    <tr><td>Production changes</td><td>Through your own deployment and change process, never around it.</td></tr>
    <tr><td>AI tooling</td><td>Claude and Claude Code. Anthropic's commercial terms state customer content is not used to train models. On request, the work runs inside your own tenancy instead.</td></tr>
    <tr><td>Incident notification</td><td>Within 24 hours of becoming aware, to your named contact.</td></tr>
    <tr><td>Certifications</td><td>No SOC 2 report. We complete your questionnaire in full and sign your security addendum.</td></tr>
    <tr><td>Screening</td><td>An NDA before anything is shared. Background check on request.</td></tr>
  </tbody>
</table>
</div>

## Where the work happens

Your source control, your continuous integration, your environments. Branches in
your repository, pull requests your engineers review, tests running on your CI,
deployments through your own release process. There is no parallel copy of your
application running on our infrastructure, and there is no product, portal or
agent of ours that has to be installed anywhere.

One honest exception, because a page like this is worthless if it is not exact:
**a working copy of the repository exists on one machine for the length of the
engagement.** Running your test suite and the upgrade tooling requires it. That
machine is described below, and the copy is destroyed at close-out.

Before an engagement starts, the assessment needs one file: your
`Gemfile.lock`. It carries your Rails version, your Ruby version and every
dependency with its version, and no application source code. Most clients send
it under a one-page NDA.

## What is kept, and for how long

**Your code: nothing.** Working copies are destroyed when the engagement closes,
and confirmed in writing to your named contact rather than left as an assumption.
The directory they live in is excluded from every backup, which is what makes
that deletion final instead of something that quietly persists in a snapshot for
another year. Your code is never shared with a third party, and since there are
no subcontractors there is nobody else to share it with.

**Deliverables: seven years.** The assessment report, the remediation plan and
the engagement correspondence are retained for seven years, matching the
retention period for business records, and then destroyed. They stay under the
confidentiality terms of the agreement for as long as we hold them.

## Access, and giving it back

Access is provisioned by you. It is never self-serve, never a shared login, and
never broader than the phase in front of us needs.

- **Issued to a named individual** on your systems, using your own identity
  provider and your own approval process.
- **Least privilege for the phase.** An assessment needs to read a repository.
  It does not need production.
- **Reviewed at each phase boundary**, so access granted for one phase does not
  quietly persist through the rest of the engagement.
- **Revoked by you at close-out**, confirmed by both sides in writing.
- **Production changes go through your own deployment and change process.**

Offboarding is the item a security questionnaire most often finds missing at a
small vendor, so it is written into the close-out of every engagement rather
than left to somebody remembering.

## The machine, and the accounts

**One company-owned Mac.** Full-disk encryption is on, the screen locks
automatically, and the machine is enrolled in Apple Business Manager and
centrally managed with Mosyle, which enforces that policy and keeps the
operating system current. It is a managed device rather than a personal laptop
with good intentions. **Client work never touches a personal or family device.**

**Multi-factor authentication on every account that can reach your code or your
credentials**, including source control, mail and the AI tooling. Passkeys are
used wherever a service supports them, so the critical accounts are not
protected by a code that can be phished out of somebody. Credentials are unique,
generated, and held in a password manager. There are no shared logins, and
nothing is sent by mail or chat.

Your secrets stay in your own secret store. The work uses the access you
provision rather than copies of your credentials.

## AI tooling

The upgrade work is AI-assisted, and that is disclosed in the agreement rather
than left for you to discover. The tooling is **Claude and Claude Code**, from
Anthropic. There are two ways to run it, and the choice is yours.

**By default**, the tooling runs from the managed machine described above
against Anthropic's commercial service. Anthropic's
[commercial terms](https://www.anthropic.com/legal/commercial-terms) state that
Anthropic may not train models on customer content, and that the customer
retains all rights to its inputs and owns its outputs.

**On request, the work runs inside your own tenancy**, under accounts you
provision, so the tooling sits within your commercial relationship with the
vendor rather than ours. Ask for that and it goes into the agreement rather than
being promised in a meeting. It adds a step to every phase, so it buys the
assurance at the cost of some schedule, and whether that trade is worth making
is your call.

The failure mode with these tools on a production upgrade is not that they are
too slow. It is that they are too fast. The control that matters is not the
tooling's terms of service, it is knowing which step happens first and how
little to change in any one iteration. [How that is delivered]({{ '/assessment.html' | relative_url }}).

## The people

One named engineer does the work, and it is the same person from the assessment
through to the last phase. There is no bench, no subcontractor, no offshore
delivery team, and no account manager who hands the work to someone junior after
the sale. [Who that is]({{ '/about.html' | relative_url }}).

We complete your standard background screening on request.

Because everything is produced in your repositories as it is produced, there is
no work in progress that exists only on our side. An interruption here costs you
schedule, not work.

## If something goes wrong

**Within 24 hours of becoming aware of a security incident involving your code,
your credentials or your data, we notify your named contact:** what is known,
what is affected, and what is being done about it. That commitment goes into the
agreement rather than living on this page alone.

If your own regulatory obligations require a different window or a specific
channel, put it in your addendum and we will sign it.

## The agreement

- **Corp-to-corp**, with Reid Morrison Inc. as the contracting party.
- **An NDA before anything is shared**, including the `Gemfile.lock`.
- **The AI-tooling disclosure written into the statement of work**, including
  which mode above applies to your engagement.
- **Liability capped at fees paid.**
- **A review clause that stops the delivery clock** when your reviewer is
  unavailable, rather than quietly consuming the schedule.
- **Your security addendum, signed.**

## What we are not

<div class="record" markdown="0">
  <p><strong>We remediate software so that an auditor stops flagging it. We do not render compliance opinions, issue certifications, or sign anything an assessor relies on.</strong> Your assessor decides whether a control is met. Our job is to remove the condition that created the finding, and to hand you the documentation that proves when it was removed.</p>
</div>

**There is no SOC 2 report for this practice, and there will not be one soon.**
A SOC 2 audit of a one-person company costs more than it would tell you, and it
would attest to the same controls this page already lists in plain language. So
the answer to that question is the rest of this page: we complete your
questionnaire in full rather than pointing at a certificate, we sign your
security addendum, and every claim here is specific enough that you can hold us
to it.

## For your procurement team

<dl class="dl">
  <dt>Entity</dt><dd>Reid Morrison Inc.</dd>
  <dt>Form</dt><dd>Florida profit corporation</dd>
  <dt>Document</dt><dd>P26000043890</dd>
  <dt>Address</dt><dd>7901 4th St N, Ste 300, St. Petersburg, FL 33702</dd>
</dl>

The document number is the public record, so you can verify the entity and its
standing with the Florida Division of Corporations without asking us for
anything.

<!--
  The procurement line from the round 2 plan is deliberately NOT here yet:

    "W-9, certificate of insurance and D-U-N-S number are available on request."

  It names three documents and publishing it before all three exist would
  promise a document that cannot be produced, in front of the one reader who
  will actually ask for it. Gate: EIN issued, E&O bound, D-U-N-S issued.
  Add it to this section and to contact.md on the same day, not before.
-->

**Send us your questionnaire.** SIG Lite, CAIQ or your own form: the answers are
the ones on this page, and anything it does not cover gets a straight answer
rather than a referral to a policy document.

<div class="cta-row" markdown="0">
{% if site.booking_url and site.booking_url != "" %}
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% else %}
  <a class="btn btn-primary" href="{{ '/contact.html' | relative_url }}">Start a conversation</a>
{% endif %}
</div>
