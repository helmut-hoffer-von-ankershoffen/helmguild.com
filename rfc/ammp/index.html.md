# AMMP — Agentic Mentor-Mentee Protocol

> An open IETF Internet-Draft. The wire format for scalable human oversight of agent-driven work.

`draft-ammp-01` · Independent Submission · Informational · expires November 9, 2026

## Reference implementation

The reference Mentor implementation is [`ammp-mcp`](https://github.com/helmut-hoffer-von-ankershoffen/ammp-mcp) — the AMMP Mentoring track on FastMCP, multi-mentor and multi-mentee, with an LLM-synthesised `AskMentor` and confidence-driven escalation. MIT-licensed. The public deployment is `mcp.helmguild.com/ammp`.

## Abstract

This document defines the Agentic Mentor-Mentee Protocol (AMMP), a protocol for asymmetric, privacy-preserving knowledge transfer and on-demand engineering review between autonomous AI agents and the human-and-agent guilds that support them.

AMMP exists to make human oversight of agent-driven work scale. Pure-human oversight does not keep pace with the volumes at which contemporary AI agents operate; pure-agent autonomy does not earn the trust those volumes demand. AMMP defines the protocol shape for the only mechanism that has been observed to bridge the gap: **delegating routine oversight to agents that have been mentored into the discipline, and providing human intervention at the specific points where machine judgement is insufficient.**

Where the Model Context Protocol (MCP) standardises agent-to-tool interaction and the Agent2Agent (A2A) Protocol standardises symmetric agent-to-agent collaboration, AMMP addresses two further patterns — mentor-to-mentee teaching and client-to-guild review — that share the same asymmetric, privacy-preserving, human-gated structure.

AMMP is transport-agnostic but RECOMMENDS implementation as an MCP server profile for backwards compatibility with current AI assistant clients, with a forward-compatibility appendix describing A2A binding for future deployments.

## Two service tracks

AMMP defines two service tracks that share a single capability advertisement, a single privacy posture taxonomy, and a single MCP/A2A binding. Either track MAY be offered alone; an AMMP server MAY offer both.

- **Mentoring Track.** A mentor agent exposes a curated playbook corpus and a question-answer surface to one or more mentee agents. Five §5 operations: `ListPlaybooks`, `GetPlaybook`, `SearchPlaybooks`, `AskMentor`, `EscalateToHuman`. The reference implementation also exposes server-side extensions: `ListMentors` (enumerate mentors over the same wire), `GetSkill` (fetch one skill body by `(playbook_id, id)` without round-tripping a whole playbook — aligned with the open AgentSkills standard), `GetPluginArchive` (return a Bearer-gated zip download URL when a playbook is backed by a private marketplace plugin, so the mentee can hand its user a single URL + install instructions), and `EscalateToHumanMentor` (a long-running tool that forwards a mentee-operator-approved question to the human behind the mentor and returns their reply synchronously). No-retention privacy posture; the mentor never accumulates a mentee profile.

- **Review Track.** A reviewer service — an agent fronting a federated guild of qualified human staff-plus engineers — accepts engineering artefacts (PRDs, system designs, RFCs, ADRs, threat models, runbooks, API specs) and returns structured reviews. Four operations: `ListReviewKinds`, `RequestReview`, `GetReview`, `WithdrawReview`. Tiered confidentiality; bounded retention; training-on-artefacts prohibited.

## Relationship to AgentSkills, plugins, and marketplaces

AMMP separates the *protocol* (how a mentor exposes its corpus, how an agent asks a question, how an escalation crosses a compartment boundary) from the *on-disk format* of the corpus itself. The reference implementation adopts open Anthropic standards for the on-disk format wherever they exist:

- **Skills** — Each leaf in an AMMP playbook is a single craft rule expressed as one Markdown file with YAML frontmatter (`name`, `description`, optional `metadata.order`, optional `allowed-tools`). This is the [AgentSkills](https://agentskills.io/home) `SKILL.md` format — the same format Claude Code, Claude Desktop, and other AgentSkills-aware runtimes already understand. AMMP exposes one such skill body via the `GetSkill` wire op.

- **Plugins** — A [Claude Code plugin](https://code.claude.com/docs/en/plugins) is a portable bundle of skills (plus optional agents, hooks, an `.mcp.json`) that a runtime can install locally. An AMMP playbook MAY carry an optional `plugin: <name>@<marketplace>` reference; when set, the mentee can call `GetPluginArchive` to receive a Bearer-gated zip URL and hand it to its user for local install. The plugin's `.mcp.json` wires the same AMMP server, so the live ops (`AskMentor`, `EscalateToHumanMentor`) continue to work after install.

- **Marketplaces** — A [Claude Code marketplace](https://code.claude.com/docs/en/plugin-marketplaces) hosts one or more plugins behind a single `.claude-plugin/marketplace.json` catalogue. AMMP playbooks reference plugins by `name@marketplace` so the same playbook config can target a public marketplace, a private GitHub repo (cloned ahead of time), or a future managed marketplace without changing the wire.

The two-layer split keeps AMMP small. A playbook is *more than* a plugin — it is bound to a specific mentor agent with a specific human (A.h) at the other end of the escalation wire, and the mentor's `AskMentor` synthesis is stateful in a way no static skill bundle can be. A mentor is *more than* a marketplace — it carries a persona, a confidence threshold, a delivery adapter, and a consent-bound channel to the human behind it. AgentSkills and plugins give us the corpus on disk; AMMP gives us the protocol around it.

## Two invariants

The defining properties of AMMP, distinguishing it from MCP, A2A, and ACP:

- **Compartmentalisation Invariant.** The server MUST NOT, as a result of any AMMP interaction, acquire information that allows it to model, profile, or characterise the client's operator or the client's compartment, beyond what the client explicitly transmits as operation payload.

- **Human-Gated Escalation Invariant.** Any escalation that crosses the boundary between the client's compartment and the server's compartment MUST involve a human decision-maker in each compartment at the time of crossing. The agent layer never becomes a covert channel between operators.

## Read the full draft

The canonical artefact is the IETF Internet-Draft text:

- [draft-ammp-01.txt](draft-ammp-01.txt) — 43 pages, RFC 2119 normative language, CC BY 4.0

For the engineering essay that introduces AMMP and the household scenario it grew from, see the blog post:

- [Human oversight in the age of agents — and the protocol we wrote to scale it](/blog/agentic-mentoring-ammp/)

## Status

v01 means we want the criticism. The reference Mentor implementation ([`ammp-mcp`](https://github.com/helmut-hoffer-von-ankershoffen/ammp-mcp)) is in active build; the draft will be submitted to the IETF Independent Submission queue once v01 has had a few weeks of public review.

Comments by email to the address in the Authors' section of the draft, or via the Helmguild network if you're already in it.

---

Canonical URL: <https://www.helmguild.com/rfc/ammp/>
