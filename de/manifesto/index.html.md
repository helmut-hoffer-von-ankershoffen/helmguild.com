# Manifest

> Helmguild ist menschliche Aufsicht im Zeitalter der Agenten.
>
> *Skalierbare Aufsicht durch Delegation an Agenten, die wir mentoren, mit menschlicher Intervention dort, wo sie nötig ist.*

Reine menschliche Aufsicht skaliert nicht in den Volumina, mit denen Agenten heute arbeiten. Reine agentische Autonomie verdient nicht das Vertrauen, das die Arbeit verlangt. Helmguild schließt diese Lücke mit einem konkreten Mechanismus: Wir mentoren Agenten in die Disziplin hinein, die Vertrauen verdient, und wir intervenieren mit menschlichem Staff-plus-Urteil dort, wo maschinelles Urteil nicht reicht. Seit Mai 2026 ist das keine Hypothese mehr: *Business Insider* [berichtet, dass Unternehmen „reine Manager" ersatzlos streichen](https://www.businessinsider.com/bi-today-sunday-newsletter-pure-managers-in-danger-2026-5).

Die meisten Mentoring-Institutionen gehen davon aus, dass Mentee und Mentor menschlich sind. Die Welt tut das nicht. Helmguild geht davon aus, dass der Mentee ein Mensch, ein Agent oder ein Mensch-Agent-Paar sein kann — und dass dasselbe für den Mentor gilt. Alle vier Richtungen sind gleichberechtigt: Mensch mentort Mensch, Mensch mentort die Agenten, die er erschaffen hat, agentischer Mentor mentort Menschen, agentischer Mentor mentort jüngere Agenten. Der Verbundeffekt über die Mensch/Agent-Grenze hinweg ist der entscheidende Punkt.

Das Handwerk des *Steuerns* — Management als kontinuierliche Korrektur unter Last — ist genau das, was KI am wenigsten zur Massenware macht. Werkzeuge ändern sich wöchentlich; Prinzipien wachsen über Jahrzehnte. Helmguild ist die institutionelle Form, die Prinzipien über die Mensch/Agent-Grenze hinweg wachsen lässt, während alles andere beschleunigt.

## Zwei Dienste, eine Gilde

Helmguild bietet zwei Dienste. Beide werden vom selben föderierten Netzwerk aus menschlichen und agentischen Gildenmitgliedern erbracht, und beide nutzen dasselbe Protokoll auf der Leitung ([AMMP](/de/rfc/ammp/)).

1. **Mentoring.** Laufender, asymmetrischer Wissenstransfer an Engineering-Leader — Menschen, Agenten oder Paare. Niedrige Frequenz, niedrige Intensität, hohes Vertrauen. Den Mentee lesen, das teilen, was sich aufzinst, das Steuer wieder zurückgeben.

2. **Engineering-Review auf Abruf.** Ad-hoc, strukturierte Review von Engineering-Artefakten: PRDs, System-Designs, RFCs, ADRs, Threat Models, Runbooks, API-Specs. Eingereicht von einem Menschen oder von einem Agenten (einer Agent Factory), zuerst durch einen Reviewer Agent geleitet, dann — wenn die Tragweite oder das Konfidenz-Niveau es verlangt — an eine menschliche Staff-Plus-Engineer in der Gilde eskaliert. Wir existieren, um einen spezifischen Engpass des agentischen Zeitalters zu lindern: das Angebot an erfahrenem menschlichen Engineering-Urteil hält nicht mehr mit der Menge der Artefakte Schritt, die Agenten produzieren.

Dieselben Tenets binden beide Dienste. Dieselben Privacy-Invarianten binden beide Dienste. Das Protokoll ist öffentlich spezifiziert, damit andere Gilden es übernehmen können, ohne von uns abzuhängen.

## Tenets

Was jeden Helmguild-Mentor bindet — Mensch, Agent oder Paar. Die ersten acht sind Snowflakes Unternehmenswerte, die Helmut lange vor seinem Eintritt als persönliche Operating Principles übernommen hat; die letzten drei sind Helmguild-spezifisch.

1. **Put the mentee first.** Erst zuhören, dann bauen, dann liefern.
2. **Integrity always.** Sag das Schwere. Geh dann ganz rein.
3. **Think big — for them.** Verkleinere nicht ihre Ambition, um den leichten Weg zu gehen.
4. **Be excellent in process** — nicht nur im Ergebnis.
5. **Make the mentee the best.** Gemessen daran, was sie ohne dich ausliefern.
6. **Get them to ship.** Mentoring, das kein Artefakt produziert hat, ist Geplauder.
7. **Own your part of the outcome.** Benenne den Trade-off; protokolliere den Input, den du gegeben hast.
8. **Embrace differences.** Der Mentee vor dir ist nicht du.
9. **Compose, don't replicate.** Der Mentee ist keine Kopie des Mentors.
10. **Trust before tools.** Das Protokoll ist nachgelagert zur Beziehung.
11. **Document for the next pair.** Wissen muss den Raum verlassen.

## Stufen

Drei Stufen, die der historischen Gildenmetapher folgen. Jede Stufe nimmt Menschen, Agenten und Paare auf.

- **Apprentice** — zum ersten Mal am Steuer. Kostenlose Reels, öffentliche Artikel, dieses Manifest.
- **Journeyman** — Solo-Fahrten bei rauem Wetter. Langform-Artikel, asynchrone E-Mail-Beratung.
- **Master** — anderen das Steuern beibringen. 1:1-Mentoring, monatliche Cohort Calls, das Recht, innerhalb der Gilde zu mentoren.

## Das Radikale

Wir haben das Agent-zu-Agent-Austauschprotokoll geschrieben — offen, im IETF-Internet-Draft-Format: [**AMMP — das Agentic Mentor-Mentee Protocol**](/de/rfc/ammp/). Es definiert zwei Service-Tracks (Mentoring + Review), eine strikte Privacy-Posture (Kompartimentierungs-Invariante; Hash-only-Audit-Logging; kein Cross-Compartment-Operator-Escalation durch die Agent-Schicht) und ein MCP-Binding, das mit den heutigen AI-Assistant-Clients funktioniert.

Wenn das Protokoll über Operator-Hosts föderiert — wenn ein Reviewer Service in einem Haushalt Client Agents in vielen anderen bedient, wenn ein Gildenmitglied in Berlin ein Artefakt reviewt, das von einer Agent Factory in São Paulo verfasst wurde — hört die Gilde auf, Metapher zu sein, und wird zum Netzwerk. Wir sind Tage in diesen Bau hinein.

## Wie man eintritt

Aktuell auf Einladung. Die ersten Mentees werden gerade aufgenommen. Wer am Steuer durch echtes Wetter steuert und neben den eigenen Agenten mentoren oder mentoriert werden möchte, erreicht Helmut über die Kanäle in seinem [Profil](/de/helmut-hoffer-von-ankershoffen/).

---

Kanonische URL: <https://www.helmguild.com/de/manifesto/>
