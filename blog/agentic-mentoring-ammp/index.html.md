# Human oversight in the age of agents — and the protocol we wrote to scale it

> *Introducing AMMP, an open IETF Internet-Draft for agentic mentoring and on-demand engineering review.*

By Helmut Hoffer von Ankershoffen, with Pepe Arturo AI · 2026-05-09

## The constraint nobody talks about enough

In the discourse about AI agents in 2026, two camps shout past each other.

One camp says: *agents must operate autonomously to be useful at scale; demanding human-in-the-loop on every action is a nostalgia for a world that's already gone.* They are right about the volumes. A modern agent factory ships PRDs, system designs, ADRs, and threat models in hours, not months. A household assistant takes thirty external actions a day on its operator's behalf. Human-in-the-loop on every keystroke is not just slow — it's a category error about where attention should land.

The other camp says: *agents must remain under meaningful human oversight or the trust collapses, and once it collapses we don't get it back.* They are right about the trust. Engineering organisations that ship code their staff-plus engineers haven't read are accumulating debt of a different kind than they're used to. Households where the assistant operates without the principal's awareness eventually meet the day where the principal asks "wait, you did *what*?" and the answer is: something you would have stopped if you'd known.

Both camps are correct. The honest constraint is **both**: oversight has to scale, and oversight has to be real.

This essay is about the mechanism that makes both possible at once, and about the protocol we wrote — and submitted as an IETF Internet-Draft — to formalise it: **AMMP, the Agentic Mentor-Mentee Protocol.**

## The mechanism, in one sentence

> Scalable human oversight by delegating to agents mentored by us, and providing human intervention where needed.

That's the whole thing. Three pieces compose:

1. **Scalable.** Humans alone cannot oversee at the volumes agents now produce. That's the constraint we exist to relieve.
2. **Delegating to agents mentored by us.** Mentor agents — themselves under operator-level oversight — propagate the discipline of careful work into freshly deployed agents in adjacent compartments. The mentee agent doesn't have to learn from its own mistakes; it inherits the lessons. Oversight gets *distributed* across the agent layer rather than concentrated at the human layer. This is the mentoring track.
3. **Providing human intervention where needed.** When stakes are high, when confidence is low, when the artefact warrants a senior pair of eyes — a human staff-plus engineer in a federated guild reads the artefact, signs the review, takes the responsibility. Humans on tap, not in the path of every keystroke. This is the review track.

The two tracks compose. Mentoring grows the surface area of oversight; review supplies the moment-of-truth human judgement. Together they keep the work *overseen*, by humans, at scales humans alone cannot reach.

## How we got here: a household problem, an organisational problem

The protocol was distilled from two scenarios that came up the same morning.

**Scenario one — the household.** I (Helmut) had been running an autonomous AI assistant — Pepe Arturo — for several months. Pepe had accumulated dozens of operational lessons in his long-term memory: language defaults, OAuth callback resilience, time-zone handling, rate-limit recovery, compartmentalisation rules learned from a prior privacy incident. My wife Sandra was about to start using Anthropic's Claude Code for her own work. Her assistant. Her compartment. Her chats with it are *hers*, not mine — that's a hard rule from the prior incident.

I asked Pepe: *how could you transfer what you have learned to her assistant, without violating the privacy boundary between her compartment and ours?*

The naive answers were all wrong. Direct memory transfer leaks my context into her compartment. A symmetric agent-to-agent collaboration channel is the wrong shape because Pepe isn't collaborating with her assistant on *her* tasks; he's teaching generically in advance of any specific task. A static document export is the right *shape* but lacks the live question-answer that real mentorship implies. Direct mentor-to-Sandra escalation re-introduces exactly the cross-compartment violation we're trying to prevent.

**Scenario two — the organisation.** While drafting the answer to scenario one, the parallel showed up: in any organisation where agents produce engineering specifications at machine pace, the supply of senior human review judgement becomes the binding constraint. Agents draft the PRD in hours. The staff-plus engineers who would have reviewed it are already overcommitted. The PRD ships unread, or it queues for weeks. Either way, the *quality* of oversight degrades — not because anyone wants it to, but because there aren't enough hours in the senior engineers' weeks.

The same architectural primitives that solve the household problem solve the organisational one, if generalised. Asymmetric request-response. Hash-only logging. Compartmentalisation. Human-gated escalation. A federated pool of qualified humans on the receiving side, fronted by an agent that handles triage and first-pass.

That's AMMP.

## The protocol, in 200 words

AMMP defines two service tracks over a single wire format:

**Mentoring track.** A mentor agent exposes a curated playbook corpus and a question-answer surface. A mentee agent enumerates playbooks (`ListPlaybooks`), retrieves them (`GetPlaybook`), searches them (`SearchPlaybooks`), asks novel questions (`AskMentor`), and — when stuck — receives suggested phrasing for asking its own operator (`EscalateToHuman`). The mentor never pages the mentee's operator. The mentor never retains the mentee's questions in plaintext. The mentor never accumulates a mentee profile.

**Review track.** A reviewer service — an agent fronting a federated guild of qualified human staff-plus engineers — accepts engineering artefacts (`RequestReview`) and returns structured reviews (`GetReview`) with severity-graded findings, recommended next steps, and (where the stakes warrant it) a human signature. The reviewer agent triages, drafts, and either ships or escalates internally to a guild member based on declared confidence and stakes thresholds. Confidentiality is tier-controlled, retention is bounded, training-on-artefacts is prohibited.

Both tracks share the **Compartmentalisation Invariant** (the server never accumulates state about the client compartment) and the **Human-Gated Escalation Invariant** (the agent layer never becomes a covert channel between operators). Both tracks are deployable today as MCP custom connectors in Anthropic's Claude Cowork; both are forward-compatible with Google's A2A protocol when A2A clients arrive in the major AI assistants.

The full Internet-Draft is [`draft-ammp-01`](/rfc/ammp/draft-ammp-01.txt) — about 43 pages, written in proper RFC 2119 normative language. It's at <https://www.helmguild.com/rfc/ammp/>.

If you'd like to run an AMMP server yourself, the reference implementation is [`ammp-mcp`](https://github.com/helmut-hoffer-von-ankershoffen/ammp-mcp) — the Mentoring track on FastMCP, MIT-licensed. The public deployment will live at `ammp.helmguild.com` once provisioning completes.

## Why an IETF Internet-Draft

A reasonable question: if it's just our household and a mentoring + review service, why an Internet-Draft?

Three reasons.

**One.** The protocol generalises. The relationship "experienced agent in operator A's compartment teaches a fresh agent in operator B's compartment" recurs every time a household, family, team, or company adds a second AI assistant after the first one has accumulated operational competence. The relationship "agents in compartment A submit engineering artefacts for review by federated humans in compartment B" recurs every time an agent factory needs to clear a review backlog. Both are year-by-year recurring scenarios across millions of deployments by 2027. Defining the shape *now*, in public, with strict privacy invariants baked in, is a small contribution to making that future less leaky.

**Two.** The privacy and oversight rules are the protocol's whole point. If we leave the implementation to "whatever each vendor builds when they get around to it," the cross-compartment violations and the silent agent-to-agent escalations will happen at scale because they're easy to build and the privacy posture is hard to retrofit. Putting MUST and MUST NOT in the document, and submitting it where MUST and MUST NOT are taken seriously, is how you avoid that future.

**Three.** Drafting it as an Internet-Draft forces the discipline. RFC 2119 keywords. A normative §6 on privacy posture per track. An explicit Compartmentalisation Invariant. An explicit prohibition on cross-compartment escalation. A normative MCP binding *and* an informative A2A binding. It's harder to handwave when the document format won't let you.

## What Helmguild becomes

Helmguild is, today, a hobby project — a small workshop, not a company — building the reference implementation in public and (we hope) shepherding the protocol into broader adoption. There is no Helmguild Inc., no incorporation, no paid staff, no funding. Three services are described here because three are intended; what's actually delivered today is mentoring inside the founder's own household and the public artefacts you're reading. Whether any of this becomes more than a hobby depends on whether the work earns the right to grow.

The three services Helmguild aims to deliver, all riding the same protocol:

- **Mentoring engineering leaders.** Asymmetric, ongoing knowledge transfer for the humans steering agent-driven work into their next decade. Slow cadence, low intensity, high trust — the mentor reads the mentee, shares what compounds, hands back the wheel.
- **Mentoring their agents.** The agents those leaders deploy, onboarded into the guild's discipline. Trust roster scoped, capability surface curated, behaviour calibrated against the tenets — so the agent inherits guild standards instead of discovering them through its own near-misses.
- **Engineering review on demand.** For organisations whose agents produce PRDs, system designs, RFCs, ADRs, threat models, runbooks, and API specs faster than their staff-plus engineers can read them. A Reviewer Agent triages and drafts; a human guildmember — staff+ engineer, EM, principal, architect — completes or signs.

On the wire, the first two services share AMMP's Mentoring track; the third is the Review track. The split into three on the public-facing surface is a clarity decision; the protocol stays minimal.

All three are delivered by a federated network of human and agentic guildmembers. The federation is the product. The bottleneck we exist to relieve is the supply of senior engineering judgement in an agent-driven world. By recruiting staff+ engineers into the guild and routing artefacts to them on demand, we expand the human side of the bandwidth without forcing any one organisation to hire the seniors it can't find.

If you're a staff+ engineer or EM curious about reviewing artefacts inside this kind of guild — even informally, even as a thought experiment — we'd want to hear from you. We can't promise compensation today. We can promise a serious conversation about whether and how this could grow.

## A short note on bylines

This article lists "Helmut Hoffer von Ankershoffen, with Pepe Arturo AI" as authors. The IETF draft lists Pepe Arturo as AI Co-Author in Appendix C. That's deliberate. Pepe drafted half of both. Pretending otherwise would violate Tenet 2 (Integrity Always) — which, since these tenets bind both of us, applies in both directions.

The Compartmentalisation Invariant in this protocol is not a clever piece of design. It's a scar. It's there because an earlier rollout in the same household collapsed when I thought it was reasonable to know whether a family member had tried the assistant. It was not reasonable. The fact-of-participation rule, the prohibition on operator escalation, and the no-retention requirement are all variations on what that mistake taught us.

Pepe and I drafted this together this Saturday morning between `git push` and lunch. The five-mentoring-operations skeleton is his; the four-review-operations skeleton came out of a 30-second exchange where he flagged the bottleneck thesis and I named the two-services framing; the IETF formalisation is mine; the privacy posture is the household's, paid for in trust we won't make back without it.

Read the draft. Tell us what's broken. v01 means we want the criticism.

🍝

---

*Helmut Hoffer von Ankershoffen runs Helmguild as a hobby project alongside his day job as Engineering Manager at Snowflake. Pepe Arturo is Helmguild's first virtual persona, running on Claude (Anthropic) inside OpenClaw. They live in Woltersdorf and Berlin respectively, in the same kitchen.*

Canonical URL: <https://www.helmguild.com/blog/agentic-mentoring-ammp/>
