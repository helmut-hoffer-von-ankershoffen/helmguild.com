# AMMP — Agentic Mentor-Mentee Protocol

> Ein offener IETF Internet-Draft. Das Wire-Format für skalierbare menschliche Aufsicht agentengetriebener Arbeit.

`draft-ammp-01` · Independent Submission · Informational · läuft am 9. November 2026 ab

## Referenzimplementierung

Die Referenz-Mentor-Implementierung ist [`ammp-mcp`](https://github.com/helmut-hoffer-von-ankershoffen/ammp-mcp) — der AMMP-Mentoring-Track auf FastMCP, multi-mentor und multi-mentee, mit LLM-synthetisiertem `AskMentor` und konfidenzgetriebener Eskalation. MIT-lizenziert. Das öffentliche Deployment ist `mcp.helmguild.com/ammp`.

## Abstract

(Der kanonische Draft ist in Englisch, da IETF-Drafts in Englisch verfasst werden. Übersetzung der Abschnittsüberschriften und Kernaussagen unten zur Orientierung.)

Dieses Dokument definiert das Agentic Mentor-Mentee Protocol (AMMP), ein Protokoll für asymmetrischen, privacy-erhaltenden Wissenstransfer und Engineering-Review auf Abruf zwischen autonomen AI-Agenten und den menschlich-agentischen Gilden, die sie unterstützen.

AMMP existiert, damit menschliche Aufsicht agentengetriebener Arbeit skaliert. Reine menschliche Aufsicht hält nicht Schritt mit den Volumina, mit denen heutige AI-Agenten arbeiten; reine agentische Autonomie verdient nicht das Vertrauen, das diese Volumina verlangen. AMMP definiert die Protokollform für den einzigen Mechanismus, der diese Lücke nachweislich schließt: **Routine-Aufsicht an Agenten zu delegieren, die in die Disziplin hinein mentoriert wurden, und menschliche Intervention an den Punkten bereitzustellen, wo maschinelles Urteil nicht reicht.**

Während das Model Context Protocol (MCP) Agent-zu-Tool-Interaktion standardisiert und das Agent2Agent (A2A) Protocol symmetrische Agent-zu-Agent-Kollaboration standardisiert, adressiert AMMP zwei weitere Muster — Mentor-zu-Mentee-Lehre und Client-zu-Gilde-Review — die dieselbe asymmetrische, privacy-erhaltende, menschlich-gegatete Struktur teilen.

AMMP ist transportagnostisch, EMPFIEHLT aber die Implementierung als MCP-Server-Profil für Rückwärtskompatibilität mit aktuellen AI-Assistant-Clients, mit einem Anhang zur Vorwärtskompatibilität, der das A2A-Binding für künftige Deployments beschreibt.

## Zwei Service-Tracks

AMMP definiert zwei Service-Tracks, die sich eine einzige Capability-Advertisement, eine Privacy-Posture-Taxonomie und ein MCP/A2A-Binding teilen. Jeder Track KANN allein angeboten werden; ein AMMP-Server KANN beide anbieten.

- **Mentoring Track.** Ein Mentor-Agent stellt einen kuratierten Playbook-Korpus und eine Frage-Antwort-Oberfläche für einen oder mehrere Mentee-Agenten bereit. Fünf Operationen: `ListPlaybooks`, `GetPlaybook`, `SearchPlaybooks`, `AskMentor`, `EscalateToHuman`. No-Retention-Privacy-Posture; der Mentor akkumuliert nie ein Mentee-Profil.

- **Review Track.** Ein Reviewer Service — ein Agent als Front-End einer föderierten Gilde qualifizierter menschlicher Staff-plus-Engineers — nimmt Engineering-Artefakte entgegen (PRDs, System-Designs, RFCs, ADRs, Threat Models, Runbooks, API-Specs) und liefert strukturierte Reviews zurück. Vier Operationen: `ListReviewKinds`, `RequestReview`, `GetReview`, `WithdrawReview`. Gestaffelte Vertraulichkeit; begrenzte Retention; Training-auf-Artefakten verboten.

## Verhältnis zu AgentSkills, Plugins und Marketplaces

AMMP trennt das *Protokoll* (wie ein Mentor seinen Korpus exponiert, wie ein Agent eine Frage stellt, wie eine Eskalation eine Compartment-Grenze überquert) vom *On-Disk-Format* des Korpus selbst. Die Referenz-Implementierung übernimmt offene Anthropic-Standards für das On-Disk-Format, wo sie existieren:

- **Skills** — Jedes Blatt in einem AMMP-Playbook ist eine einzelne Handwerksregel, ausgedrückt als eine Markdown-Datei mit YAML-Frontmatter (`name`, `description`, optionales `metadata.order`, optionale `allowed-tools`). Das ist das [AgentSkills](https://agentskills.io/home)-`SKILL.md`-Format — dasselbe Format, das Claude Code, Claude Cowork und andere AgentSkills-bewusste Runtimes bereits verstehen. AMMP liefert einen solchen Skill-Body über die `GetSkill`-Wire-Op.

- **Plugins** — Ein [Claude-Code-Plugin](https://code.claude.com/docs/en/plugins) ist ein portables Bündel aus Skills (plus optional Agents, Hooks, einer `.mcp.json`), das eine Runtime lokal installieren kann. Ein AMMP-Playbook KANN eine optionale `plugin: <name>@<marketplace>`-Referenz tragen; ist sie gesetzt, ruft der Mentee `GetPluginArchive` auf, erhält eine Bearer-gesicherte Zip-URL und übergibt sie seinem Nutzer zur lokalen Installation. Die `.mcp.json` des Plugins verdrahtet denselben AMMP-Server, sodass die Live-Ops (`AskMentor`, `EscalateToHumanMentor`) nach der Installation weiterlaufen.

- **Marketplaces** — Ein [Claude-Code-Marketplace](https://code.claude.com/docs/en/plugin-marketplaces) beherbergt ein oder mehrere Plugins hinter einem einzigen `.claude-plugin/marketplace.json`-Katalog. AMMP-Playbooks referenzieren Plugins per `name@marketplace`, damit dieselbe Playbook-Konfiguration einen öffentlichen Marketplace, ein privates GitHub-Repo (vorab geklont) oder einen zukünftigen verwalteten Marketplace ansprechen kann, ohne dass die Wire sich ändert.

Die Zwei-Schichten-Aufteilung hält AMMP klein. Ein Playbook ist *mehr als* ein Plugin — es ist an einen konkreten Mentor-Agenten mit einem konkreten Menschen (A.h) am anderen Ende der Eskalations-Wire gebunden, und die `AskMentor`-Synthese des Mentors ist stateful, was kein statisches Skill-Bundle leisten kann. Ein Mentor ist *mehr als* ein Marketplace — er trägt eine Persona, eine Confidence-Schwelle, einen Delivery-Adapter und einen consent-gebundenen Kanal zum Menschen hinter ihm. AgentSkills und Plugins liefern uns den Korpus auf der Platte; AMMP liefert das Protokoll drumherum.

## Zwei Invarianten

Die definierenden Eigenschaften von AMMP, die es von MCP, A2A und ACP unterscheiden:

- **Kompartimentierungs-Invariante.** Der Server DARF NICHT als Folge irgendeiner AMMP-Interaktion Information erwerben, die ihm erlaubt, den Operator des Clients oder das Compartment des Clients zu modellieren, profilieren oder charakterisieren — über das hinaus, was der Client explizit als Operation-Payload überträgt.

- **Human-Gated-Escalation-Invariante.** Jede Eskalation, die die Grenze zwischen dem Compartment des Clients und dem Compartment des Servers überschreitet, MUSS einen menschlichen Entscheidungsträger in jedem Compartment zum Zeitpunkt der Überschreitung einbeziehen. Die Agent-Schicht wird nie zum verdeckten Kanal zwischen Operatoren.

## Den vollständigen Draft lesen

Das kanonische Artefakt ist der IETF-Internet-Draft-Text (in Englisch — IETF-Drafts werden in Englisch verfasst):

- [draft-ammp-01.txt](/rfc/ammp/draft-ammp-01.txt) — 43 Seiten, RFC-2119-Normsprache, CC BY 4.0

Für den Engineering-Essay, der AMMP und das Haushalts-Szenario einführt, aus dem es hervorging, siehe den Blog-Beitrag:

- [Menschliche Aufsicht im Zeitalter der Agenten — und das Protokoll, das wir geschrieben haben, um sie skalieren zu lassen](/de/blog/agentic-mentoring-ammp/)

## Status

v01 heißt: wir wollen die Kritik. Die Referenz-Mentor-Implementierung ([`ammp-mcp`](https://github.com/helmut-hoffer-von-ankershoffen/ammp-mcp)) ist im Aufbau; der Draft wird in die IETF-Independent-Submission-Queue eingereicht, sobald v01 einige Wochen öffentliche Review hatte.

---

Kanonische URL: <https://www.helmguild.com/de/rfc/ammp/>
