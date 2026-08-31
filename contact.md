---
layout: default
title: Contact
heading: Start a conversation
standfirst: >-
  Tell me what you are running and what is forcing the timeline. I read and
  answer these myself.
description: >-
  Get in touch with Reid Morrison about end-of-life remediation for a Rails
  application in a regulated environment.
---

Everything starts with a video call rather than a phone slot, so we can look at
the same screen. If you already have your `Gemfile.lock` to hand, mention it and
I will read it before we speak, which makes the first conversation specific
instead of general.

{% if site.booking_url and site.booking_url != "" %}
<div class="cta-row" markdown="0">
  <a class="btn btn-primary" href="{{ site.booking_url }}">Book a video call</a>
</div>

Or send the details below and I will come back to you.
{% endif %}

{% if site.web3forms_key and site.web3forms_key != "" %}
<form class="form" id="enquiry" autocomplete="on" markdown="0">
  <div class="form-row">
    <div class="field">
      <label for="name">Name</label>
      <input id="name" name="name" type="text" required>
    </div>
    <div class="field">
      <label for="email">Work email</label>
      <input id="email" name="email" type="email" required>
    </div>
  </div>

  <div class="field">
    <label for="company">Company</label>
    <input id="company" name="company" type="text" required>
  </div>

  <div class="field">
    <label for="rails">Rails version</label>
    <select id="rails" name="rails_version">
      <option value="">Select or skip</option>
      {% assign versions = site.data.eol.rails | sort: "v" | reverse %}
      {% for r in versions %}<option value="Rails {{ r.v }}">Rails {{ r.v }}</option>
      {% endfor %}<option value="Older than 4.2">Older than 4.2</option>
      <option value="Not sure">Not sure</option>
    </select>
    <p class="hint">It is on the last lines of your <code>Gemfile.lock</code>, next to <code>rails</code>.</p>
  </div>

  <div class="field">
    <label for="forcing">What is forcing the timeline?</label>
    <select id="forcing" name="forcing_event">
      <option value="">Select or skip</option>
      <option value="An audit or assessment date">An audit or assessment date</option>
      <option value="An enterprise deal blocked on security review">An enterprise deal blocked on security review</option>
      <option value="A penetration test finding">A penetration test finding</option>
      <option value="A specific unpatched CVE">A specific unpatched CVE</option>
      <option value="A transaction or diligence process">A transaction or diligence process</option>
      <option value="Nothing specific yet">Nothing specific yet</option>
    </select>
    <p class="hint">This changes the answer more than the version does.</p>
  </div>

  <div class="field">
    <label for="message">Anything else worth knowing</label>
    <textarea id="message" name="message"></textarea>
  </div>

  <input type="hidden" name="access_key" value="{{ site.web3forms_key }}">
  <input type="hidden" name="from_name" value="reidmorrison.com contact form">
  <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off">

  <button type="submit">Send</button>
  <p class="note" id="status" role="status"></p>
</form>

<div id="thanks" class="done hidden" markdown="0">
  Sent. I reply personally, usually the same day.
</div>

<script>
(function () {
  var form = document.getElementById("enquiry");
  if (!form) return;
  var status = document.getElementById("status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var button = form.querySelector("button[type=submit]");
    button.disabled = true;
    status.className = "note";
    status.textContent = "Sending...";

    var data = Object.fromEntries(new FormData(form));
    data.subject = "Enquiry: " + (data.company || "unknown company") +
                   (data.rails_version ? " on " + data.rails_version : "");

    try {
      var res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });
      var out = await res.json().catch(function () { return {}; });
      if (!res.ok) throw new Error(out.message || "Submission failed");
      form.classList.add("hidden");
      document.getElementById("thanks").classList.remove("hidden");
    } catch (err) {
      button.disabled = false;
      status.className = "note note--err";
      status.innerHTML = 'That did not send. Try again, or reach me on ' +
        '<a href="https://www.linkedin.com/in/reidmorrison">LinkedIn</a>.';
    }
  });
})();
</script>
{% else %}
The contact form is not configured. Reach me on
[LinkedIn](https://www.linkedin.com/in/{{ site.linkedin_username }}) in the
meantime.
{% endif %}

## Before we speak

Two things make a first conversation useful. Neither is a commitment.

**Your `Gemfile.lock`.** The single highest-information file in this
conversation. It carries your exact Rails and Ruby versions and every
dependency, which is what determines whether an upgrade is straightforward or
structural.

**What your assessor or your customer actually said.** The specific wording of a
finding, a security questionnaire, or a blocked deal tells me which control you
are being measured against, and that decides what the work has to produce.

## What I will ask you

Which frameworks you are assessed against. What is forcing the date, and how
firm it is. Who signs, and what they need to see. Whether the application has a
staging environment, continuous integration, and a test suite you would trust to
catch a regression.
