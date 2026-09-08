---
layout: default
title: Privacy
eyebrow: Effective 8 September 2026
heading: What this site collects, and who else sees you
standfirst: >-
  Short, because there is little to say. This site sets no cookies, writes
  nothing to your browser, and learns nothing about you as an individual. It
  counts page views, and that is the whole of it.
description: >-
  The privacy policy for reidmorrison.com. No cookies, cookieless page-view
  counting, the five third parties a visitor's browser contacts, and what
  happens to an enquiry.
---

This policy covers `reidmorrison.com`, the website of
{{ site.entity.name }}, {{ site.entity.form_short }}. It does not cover the
project documentation sites on subdomains, which serve open-source
documentation and are described below, and it is not the confidentiality term
in a client agreement: how client code and client data are handled is set out
on [our security page]({{ '/security.html' | relative_url }}) and in the
agreement itself.

## The short version

**No cookies are set by this site.** No tag manager, no tracking pixel, no
advertising network, no session recording, no fingerprinting. Nothing is
written to your browser's storage.

**One thing is measured, and it is how many people read which page.** That is
done by Cloudflare Web Analytics, which counts page views without cookies and
without storing any identifier on your device. What we see is totals: which
pages were read, roughly where readers arrived from, which country and which
browser. We cannot see you, we cannot follow you from one visit to the next,
and there is no profile of you to build. The detail is in the table below.

There is no account to create and no mailing list to leave. If you send an
enquiry or book a call, we receive what you typed and nothing else.

## Who your browser contacts

Loading a page means asking somebody for it, so visiting this site means a
small number of other companies can see your IP address and your browser's user
agent. Each is here because the site needs it to work, and each publishes its
own statement.

<div class="table-scroll" markdown="0">
<table>
  <thead><tr><th>Third party</th><th>Why it is involved</th><th>When</th></tr></thead>
  <tbody>
    <tr>
      <td><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Pages</a></td>
      <td>Hosts and serves this site. GitHub keeps its own server logs of requests, which we do not receive and cannot read.</td>
      <td>Every page</td>
    </tr>
    <tr>
      <td><a href="https://developers.google.com/fonts/faq/privacy">Google Fonts</a></td>
      <td>Serves the three typefaces the site is set in. Google states that the Fonts API logs requests and does not set cookies.</td>
      <td>Every page</td>
    </tr>
    <tr>
      <td><a href="https://www.cloudflare.com/privacypolicy/">Cloudflare Web Analytics</a></td>
      <td>Counts page views. A small script loads from Cloudflare and reports which page you are on, the address you arrived from, and your browser's own page-load timings. It sets no cookies and leaves nothing on your device, and Cloudflare states the data is not used to identify or profile visitors.</td>
      <td>Every page</td>
    </tr>
    <tr>
      <td><a href="https://web3forms.com/">Web3Forms</a></td>
      <td>Receives a submitted form and forwards it to us as email. It sees whatever you put in the fields.</td>
      <td>Only when you press Send on a form</td>
    </tr>
    <tr>
      <td><a href="https://policies.google.com/privacy">Google Calendar</a></td>
      <td>Runs the booking page and creates the meeting. Everything from the click onward happens on Google's own page, under Google's terms.</td>
      <td>Only when you follow "Book a video call"</td>
    </tr>
  </tbody>
</table>
</div>

Nothing else is embedded. No fonts, scripts, images or frames are loaded from
anywhere other than this site and the sources above.

If your browser or an extension blocks the analytics beacon, every page here
still works exactly as it should. We would rather you blocked it than felt
watched, and nothing on this site is gated on being counted.

## The EOL exposure check

[The check at `/eol/`]({{ '/eol/' | relative_url }}) runs entirely in your
browser. The versions you select never leave the page: the dates, the days
unpatched, the controls and the upgrade path are all computed locally, nothing
is uploaded, and nothing is saved.

That is a property of how the page is built rather than a promise we are asking
you to take on trust. The site is static and has no backend to receive
anything, and you can confirm it in your browser's network tab in about ten
seconds. Look there and you will also see the analytics beacon described above:
it records that the page was viewed, and it carries none of what you selected.
Printing the finding is your browser printing a page, not a request to us.

The check carries a separate, clearly marked form. That form is the only part
of the page that sends anything anywhere, and only if you fill it in.

## If you send us an enquiry

The forms on the contact page and on the EOL check ask for your name, work
email, company, the version you are running, what is forcing your timeline, and
anything else you want to add. They are the same questions we would ask on a
first call, and they exist so that the reply is specific rather than generic.

**What happens to it.** It reaches us as email, through Web3Forms, and it is
answered by a person. It is used to reply to you and to prepare for a
conversation, and for nothing else. It is never sold, rented, shared for
anyone else's marketing, or added to a mailing list. There is no automated
sequence, and pressing Send does not subscribe you to anything.

**How long it is kept.** While the conversation is live, and afterwards as a
business record if it becomes an engagement, under the seven-year retention
described on [our security page]({{ '/security.html' | relative_url }}). If it
does not become an engagement and you would rather it were not kept, ask and we
will delete it.

**Ask us anything about it.** To see what we hold about you, correct it, or
have it deleted, use the [contact form]({{ '/contact.html' | relative_url }}),
or write to the address at the foot of this page. We do not require you to
prove a legal basis for asking.

## The documentation subdomains

Six subdomains (`logger`, `encryption`, `rocketjob`, `config`, `iostreams` and
`minion`) serve documentation for open-source Ruby libraries. They are static
sites hosted the same way, they set no cookies either, they carry no analytics
beacon at all, and they exist to document software rather than to sell
anything.

## Changes to this policy

This page is dated at the top, and material changes are listed here rather than
made quietly.

- **8 September 2026.** Cloudflare Web Analytics added, and this page changed
  in the same commit: a row in the table above, and the "no analytics" line in
  the summary replaced with what is now true.
- **3 September 2026.** First published.

<div class="cta-row" markdown="0">
  <a class="btn btn-secondary" href="{{ '/security.html' | relative_url }}">How we work with your code</a>
  <a class="btn btn-secondary" href="{{ '/contact.html' | relative_url }}">Contact</a>
</div>
