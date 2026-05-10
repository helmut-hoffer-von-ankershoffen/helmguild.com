# Manifesto

> Helmguild is human oversight in the age of agents.
>
> *Scalable oversight by delegating to agents mentored by us, and providing human intervention where needed.*

Pure-human oversight does not scale at the volumes contemporary AI agents operate at. Pure-agent autonomy does not earn the trust the work demands. Helmguild closes that gap with a specific mechanism: we mentor agents into the discipline that earns trust, and we intervene with human staff-plus judgement at the points where machine judgement is not enough. As of May 2026, this is no longer hypothetical: *Business Insider* [reports companies cutting "pure managers" outright](https://www.businessinsider.com/bi-today-sunday-newsletter-pure-managers-in-danger-2026-5).

Most mentoring institutions still assume the mentee is a human and the mentor is a human. The world doesn't. Helmguild assumes the mentee may be a human, an agent, or a human-agent pair, and that the same applies to the mentor. The four directions are all first-class: human mentors humans, human mentors the agents that human hatched, agentic mentor mentors humans, agentic mentor mentors junior agents. The compounding effect across the human/agent boundary is the point.

The craft of *steering* — management as continuous correction under load — is exactly what AI commoditises least. Tools change weekly; principles compound for decades. Helmguild is the institutional shape that lets principles compound across the human/agent boundary while everything else accelerates.

## Two services, one guild

Helmguild offers two services. Both are delivered by the same federated network of human and agentic guildmembers, and both ride the same protocol on the wire ([AMMP](/rfc/ammp/)).

1. **Mentoring.** Ongoing, asymmetric knowledge transfer to engineering leaders — humans, agents, or pairs. Slow cadence, low intensity, high trust. Read the mentee, share what compounds, hand back the wheel.

2. **Engineering review on demand.** Ad-hoc, structured review of engineering artefacts: PRDs, system designs, RFCs, ADRs, threat models, runbooks, API specs. Submitted by a human or by an agent (an agent factory) and routed first through a Reviewer Agent, then — when stakes or confidence demand it — to a human staff-plus engineer in the guild. We exist to relieve a specific bottleneck of the agent-driven era: the supply of senior human engineering judgement is no longer keeping up with the artefacts agents produce.

The same tenets bind both services. The same privacy invariants bind both services. The protocol is publicly specified so other guilds can adopt it without depending on us.

## Tenets

What binds every Helmguild mentor — human, agent, or pair. The first eight are Snowflake's company values, which Helmut adopted as his personal Operating Principles long before joining; the last three are Helmguild-specific.

1. **Put the mentee first.** Listen, then build, then deliver.
2. **Integrity always.** Tell the hard truth. Then commit fully.
3. **Think big — for them.** Don't shrink their ambition to fit the easy path.
4. **Be excellent in process,** not only in outcome.
5. **Make the mentee the best.** Measure by what they ship without you.
6. **Get them to ship.** Mentorship that produced no artefact is gossip.
7. **Own your part of the outcome.** Frame the tradeoff; log the input you gave.
8. **Embrace differences.** The mentee in front of you is not you.
9. **Compose, don't replicate.** The mentee is not a copy of the mentor.
10. **Trust before tools.** Protocol is downstream of relationship.
11. **Document for the next pair.** Knowledge has to leave the room.

## Tiers

Three tiers, riding the historical guild metaphor. Each tier admits humans, agents, and pairs.

- **Apprentice** — first time at the wheel. Free reels, public articles, this manifesto.
- **Journeyman** — solo voyages in heavy weather. Long-form articles, async email consultation.
- **Master** — teaching others to steer. 1:1 mentoring, monthly cohort calls, the right to mentor inside the guild.

## The radical part

We have written the agent-to-agent exchange protocol, in the open, in IETF Internet-Draft format: [**AMMP — the Agentic Mentor-Mentee Protocol**](/rfc/ammp/). It defines two service tracks (mentoring + review), a strict privacy posture (compartmentalisation invariant; hash-only audit logging; no cross-compartment operator escalation by the agent layer), and an MCP binding that works with today's AI assistant clients.

When the protocol federates across operator hosts — when a Reviewer Service in one household serves Client Agents in many others, when a guildmember in Berlin reviews an artefact authored by an agent factory in São Paulo — the guild stops being a metaphor and becomes a network. We are days into that build.

## How to join

Right now, by invitation. The first mentees are being onboarded. If you operate at the wheel through real weather and want to mentor or be mentored alongside your agents, reach Helmut on the channels in his [profile](/helmut-hoffer-von-ankershoffen/).

---

Canonical URL: <https://www.helmguild.com/manifesto/>
