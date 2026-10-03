---
paths:
  - "security.md"
  - "contact.md"
---

# `/security.html` is written to be forwarded, not read

The reader is a third-party risk or vendor-security reviewer who arrives because
a CISO sent them the link. Publishing it unprompted shortens their review cycle:
they read the page instead of waiting on a questionnaire round trip.

**Every claim on it was confirmed by Reid.** Nothing there is inferred, and
nothing may be added that has not been through the same check. It is the one
page where a plausible guess is a liability rather than a placeholder, because a
reviewer will hold the company to it and an auditor may read it. The facts:

- Company-owned Mac, full-disk encryption, automatic screen lock, enrolled in
  **Apple Business Manager** and centrally managed with **Mosyle**. Client work
  never touches a personal device. The page says "centrally managed" rather than
  naming Mosyle, because the vendor can change and the control cannot.
- MFA on every account that can reach client code, **passkeys wherever
  supported**, unique credentials in a password manager, no shared logins.
- **Client code: destroyed at close-out, confirmed in writing, and excluded from
  every backup.** The backup exclusion is what makes the deletion claim
  complete, and it is the follow-up question a reviewer always asks.
- **Deliverables and correspondence: seven years, then destroyed.**
- **Incident notification within 24 hours** of becoming aware.
- **Background check on request.**
- AI tooling is **Claude and Claude Code** on a **commercial account** (Team,
  Enterprise or API). That account type is what makes the citation correct: the
  **Commercial** Terms carry the no-training clause, and a personal Pro or Max
  plan would fall under the Consumer Terms, making the sentence on the page
  wrong. If the account changes, the page changes with it. The claim is limited
  to what those terms say: Anthropic may not train models on customer content,
  and the customer retains its inputs and owns its outputs. **Do not add a
  zero-retention claim**; there is no such agreement.

### The three hosting postures

The page presents where the work is hosted as the client's choice, ordered by
assurance, using the `.options` component with **no severity modifier**: all
three are acceptable, so painting one `--crit` would say the default posture is
bad.

1. **Our managed machine.** The default. A working copy lives on the managed
   Mac, destroyed at close-out, excluded from backups. Tooling on our account.
2. **Your Anthropic tenancy.** Same for the code; the tooling runs under
   accounts the client provisions.
3. **Your virtual desktop.** The strongest. **Source code is never downloaded**,
   so there is nothing on our side to retain, delete or lose.

**The VDI posture is not the default, deliberately.** It makes the client's
infrastructure a precondition for starting, which trades a security objection
for a procurement delay. See `risks-and-counterarguments.md` in the business
folder before promoting it.

**Claude Code must run inside the virtual desktop, and the page states this as a
requirement rather than a preference.** A VDI that will not permit it is not a
viable environment, and it is cheaper to learn that before the agreement than
after. Two ways to satisfy it, both stated publicly:

- **Reid's own subscription, used from inside the client's desktop.** Preferred,
  and nothing for the client to buy.
- **The client's own subscription**, if their policy demands it. It **must
  include the latest Claude Opus AND Claude Fable models, at their cost.** Both,
  not either. This is a real precondition with a real price, so it is on the
  public page rather than saved for scoping.

**If the client will fund neither route, the VDI posture is off the table** and
the work runs under one of the other two. That is a decision about posture, not
a disqualifier. The only true disqualifier is a client who will permit neither
their own desktop nor our machine, which leaves nowhere for the work to happen.
Scoping questions live in `pre-quote-checklist.md`, under B5.

**Under VDI the assessment report is written inside the virtual desktop and
leaves it as the deliverable**, carrying findings, version data, dependency
status and the agreed baselines, and no application source. **Reid keeps his
copy**, under the same seven-year rule: the report is the underwriting record
the fixed price rests on, and the acknowledged error and flaky-test baselines
are what separate a genuine upgrade regression from a pre-existing bug.

Three things the page does deliberately, which look like omissions:

1. **It admits the working copy exists**, scoped to the first two postures. A
   local clone lives on one machine for the length of the engagement, because
   running the suite requires it. Saying otherwise would be false, and the
   admission is what makes the rest credible. Under VDI the exception genuinely
   disappears, and the page says so.
2. **It keeps in-tenancy AI conditional.** The default is Anthropic's commercial
   service; the client's own tenancy is available on request, goes into the
   agreement, and costs schedule.
3. **It makes no claim about production data.** The delivery playbook allows a
   shadow-replay harness where traffic volume justifies it, so a blanket "we
   never touch production data" would be wrong.
