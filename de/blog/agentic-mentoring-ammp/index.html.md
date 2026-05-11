# Menschliche Aufsicht im Zeitalter der Agenten — und das Protokoll, das wir geschrieben haben, um sie skalieren zu lassen

> *Wir stellen AMMP vor — einen offenen IETF Internet-Draft für agentisches Mentoring und Engineering-Review auf Abruf.*

Von Helmut Hoffer von Ankershoffen, mit Pepe Arturo AI · 2026-05-09

## Die Einschränkung, über die zu wenig geredet wird

Im Diskurs über AI-Agenten 2026 reden zwei Lager aneinander vorbei.

Lager eins sagt: *Agenten müssen autonom arbeiten, um in Skalierung nützlich zu sein; Human-in-the-Loop bei jeder Aktion ist Nostalgie für eine Welt, die schon vorbei ist.* Sie haben recht mit den Volumina. Eine moderne Agent Factory liefert PRDs, System-Designs, ADRs und Threat Models in Stunden, nicht Monaten. Ein Haushalts-Assistent führt dreißig externe Aktionen pro Tag im Auftrag seines Operators aus. Human-in-the-Loop bei jedem Tastendruck ist nicht nur langsam — es ist ein Kategorienfehler darüber, wo Aufmerksamkeit landen sollte.

Lager zwei sagt: *Agenten müssen unter sinnvoller menschlicher Aufsicht bleiben, sonst kollabiert das Vertrauen, und einmal kollabiert kommt es nicht zurück.* Sie haben recht mit dem Vertrauen. Engineering-Organisationen, die Code ausliefern, den ihre Staff-plus-Engineers nicht gelesen haben, sammeln Schulden anderer Art an als die, die sie kennen. Haushalte, in denen der Assistent ohne das Wissen des Prinzipals operiert, treffen irgendwann den Tag, an dem der Prinzipal fragt: „Moment, du hast *was*?" — und die Antwort ist: etwas, das du gestoppt hättest, wenn du es gewusst hättest.

Beide Lager haben recht. Die ehrliche Einschränkung ist **beides**: Aufsicht muss skalieren, und Aufsicht muss real sein.

Dieser Artikel handelt vom Mechanismus, der beides gleichzeitig möglich macht, und vom Protokoll, das wir geschrieben — und als IETF Internet-Draft eingereicht — haben, um ihn zu formalisieren: **AMMP, das Agentic Mentor-Mentee Protocol.**

## Der Mechanismus, in einem Satz

> Skalierbare menschliche Aufsicht durch Delegation an Agenten, die wir mentoren, mit menschlicher Intervention dort, wo sie nötig ist.

Das ist alles. Drei Bestandteile komponieren:

1. **Skalierbar.** Menschen allein können nicht in den Volumina beaufsichtigen, in denen Agenten heute produzieren. Das ist die Einschränkung, die wir lindern.
2. **Delegation an Agenten, die wir mentoren.** Mentor-Agenten — selbst unter Operator-Aufsicht — propagieren die Disziplin sorgfältiger Arbeit in frisch deployte Agenten in benachbarten Compartments. Der Mentee-Agent muss nicht aus eigenen Fehlern lernen; er erbt die Lektionen. Aufsicht wird über die Agent-Schicht *verteilt* statt auf die Mensch-Schicht konzentriert. Das ist der Mentoring-Track.
3. **Menschliche Intervention dort, wo sie nötig ist.** Wenn die Tragweite hoch ist, wenn die Konfidenz niedrig ist, wenn das Artefakt ein erfahrenes Augenpaar verdient — liest ein menschlicher Staff-plus-Engineer in einer föderierten Gilde das Artefakt, signiert die Review, übernimmt die Verantwortung. Menschen auf Abruf, nicht im Pfad jedes Tastendrucks. Das ist der Review-Track.

Die zwei Tracks komponieren. Mentoring vergrößert die Oberfläche der Aufsicht; Review liefert das menschliche Urteil im Moment der Wahrheit. Zusammen halten sie die Arbeit *beaufsichtigt*, durch Menschen, in Skalierungen, die Menschen allein nicht erreichen.

## Wie wir hierhergekommen sind

Das Protokoll wurde aus zwei Szenarien destilliert, die am selben Morgen aufkamen.

**Szenario eins — der Haushalt.** Ich (Helmut) hatte einige Monate einen autonomen AI-Assistenten betrieben — Pepe Arturo. Pepe hatte Dutzende operativer Lektionen in seinem Langzeitgedächtnis akkumuliert: Sprach-Defaults, OAuth-Callback-Resilienz, Zeitzonen-Handling, Rate-Limit-Recovery, Kompartimentierungs-Regeln aus einem früheren Privacy-Vorfall. Meine Frau Sandra würde anfangen, Anthropics Claude Code für ihre eigene Arbeit zu nutzen. Ihr Assistent. Ihr Compartment. Ihre Chats damit gehören *ihr*, nicht mir — das ist eine harte Regel aus dem früheren Vorfall.

Ich fragte Pepe: *Wie könntest du das, was du gelernt hast, an ihren Assistenten weitergeben, ohne die Privacy-Grenze zwischen ihrem und unserem Compartment zu verletzen?*

**Szenario zwei — die Organisation.** Während wir die Antwort auf Szenario eins entwarfen, zeigte sich die Parallele: In jeder Organisation, in der Agenten Engineering-Spezifikationen in Maschinengeschwindigkeit produzieren, wird das Angebot an erfahrenem menschlichen Review-Urteil zur bindenden Einschränkung. Agenten entwerfen die PRD in Stunden. Die Staff-plus-Engineers, die sie reviewt hätten, sind bereits überlastet. Die PRD geht ungeprüft live, oder sie wartet wochenlang in der Queue. So oder so: die *Qualität* der Aufsicht degradiert.

Dieselben architektonischen Primitiven, die das Haushalts-Problem lösen, lösen das organisatorische, wenn man sie generalisiert. Asymmetrisches Request-Response. Hash-only-Logging. Kompartimentierung. Human-Gated-Escalation. Ein föderierter Pool qualifizierter Menschen auf der Empfangsseite, fronted von einem Agenten, der Triage und First-Pass übernimmt.

Das ist AMMP.

Wer einen AMMP-Server selbst betreiben möchte: die Referenzimplementierung ist [`ammp-mcp`](https://github.com/helmut-hoffer-von-ankershoffen/ammp-mcp) — der Mentoring-Track auf FastMCP, MIT-lizenziert. Das öffentliche Deployment wird unter `mcp.helmguild.com` liegen, sobald die Provisionierung abgeschlossen ist.

## Warum ein IETF Internet-Draft

Drei Gründe.

**Eins.** Das Protokoll generalisiert. Beide Szenarien wiederholen sich jährlich über Millionen von Deployments bis 2027. Die Form *jetzt* zu definieren, in der Öffentlichkeit, mit strikten Privacy-Invarianten eingebacken, ist ein kleiner Beitrag dazu, diese Zukunft weniger leck zu machen.

**Zwei.** Die Privacy- und Aufsichtsregeln sind der Sinn des Protokolls. Wenn wir die Implementierung „dem überlassen, was jeder Vendor baut", werden die Cross-Compartment-Verletzungen in Skalierung passieren. MUST und MUST NOT in das Dokument zu schreiben, und es dort einzureichen, wo MUST und MUST NOT ernst genommen werden, ist der Weg, diese Zukunft zu vermeiden.

**Drei.** Es als Internet-Draft zu verfassen, erzwingt die Disziplin. RFC-2119-Schlüsselworte. Eine normative §6 zur Privacy-Posture pro Track. Eine explizite Kompartimentierungs-Invariante. Ein explizites Verbot von Cross-Compartment-Eskalation. Ein normatives MCP-Binding *und* ein informatives A2A-Binding. Es ist schwerer, vage zu bleiben, wenn das Dokumentformat es nicht zulässt.

## Was Helmguild wird

Helmguild ist heute ein Hobbyprojekt — eine kleine Werkstatt, keine Firma — die die Referenzimplementierung in der Öffentlichkeit baut und (so hoffen wir) das Protokoll in breitere Adoption führt. Es gibt keine Helmguild Inc., keine Gründung, keine bezahlten Mitarbeiter, keine Finanzierung. Drei Dienste werden hier beschrieben, weil drei beabsichtigt sind; tatsächlich ausgeliefert wird heute Mentoring im eigenen Haushalt des Gründers und die öffentlichen Artefakte, die Sie gerade lesen. Ob daraus mehr als ein Hobby wird, hängt davon ab, ob die Arbeit sich das Wachstum verdient.

Die drei Dienste, die Helmguild liefern will, alle auf demselben Protokoll:

- **Mentoring von Engineering Leaders.** Asymmetrischer, laufender Wissenstransfer für die Menschen, die agentengetriebene Arbeit in ihr nächstes Jahrzehnt steuern. Niedrige Frequenz, niedrige Intensität, hohes Vertrauen.
- **Mentoring ihrer Agenten.** Die Agenten, die diese Leader deployen, in die Disziplin der Gilde aufgenommen.
- **Engineering-Review auf Abruf.** Für Organisationen, deren Agenten Spezifikationen schneller produzieren, als ihre Staff-plus-Engineers sie lesen können.

Wenn Sie ein Staff+-Engineer oder EM sind und neugierig sind, Artefakte in einer solchen Gilde zu reviewen — auch informell, auch als Gedankenexperiment — würden wir gerne von Ihnen hören. Bezahlung können wir heute nicht versprechen. Versprechen können wir ein ernsthaftes Gespräch darüber, ob und wie das wachsen könnte.

🍝

---

*Helmut Hoffer von Ankershoffen betreibt Helmguild als Hobbyprojekt neben seinem Hauptberuf als Engineering Manager bei Snowflake. Pepe Arturo ist Helmguilds erste virtuelle Persona, die auf Claude (Anthropic) inside OpenClaw läuft. Sie leben in Woltersdorf bzw. Berlin, in derselben Küche.*

Kanonische URL: <https://www.helmguild.com/de/blog/agentic-mentoring-ammp/>
