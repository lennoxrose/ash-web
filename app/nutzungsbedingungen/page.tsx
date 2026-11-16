import { pageMeta } from "../meta";
import { Band, PageBody } from "../page-parts";
import { BLOB, REPO } from "../site";

export const dynamic = "force-static";
export const metadata = pageMeta("/nutzungsbedingungen", "Nutzungsbedingungen", "Regeln zur Nutzung dieser Website und der bereitgestellten Software.");

export default function Nutzungsbedingungen() {
  return (
    <>
      <Band tone="dark" title="Nutzungsbedingungen">Regeln zur Nutzung dieser Website und der bereitgestellten Software.</Band>
      <PageBody cls="legal">
        <h2>1. Geltungsbereich</h2>
        <p>Diese Bedingungen gelten für die Nutzung dieser Website. Die Software Ash selbst steht unter der <a href={`${BLOB}/LICENSE`} rel="noopener noreferrer">MIT-Lizenz</a>; für sie gilt allein der dortige Lizenztext.</p>
        <h2>2. Kostenloses Angebot</h2>
        <p>Website und Software werden unentgeltlich als privates Open-Source-Projekt bereitgestellt. Es besteht kein Anspruch auf Verfügbarkeit, bestimmte Funktionen, Support oder Weiterentwicklung. Ich kann Inhalte und das Angebot jederzeit ändern oder einstellen.</p>
        <h2>3. Installationsskript und Downloads</h2>
        <p>Das Skript unter <code>/install.sh</code> und die Release-Downloads erfolgen auf eigene Verantwortung. Prüfe Skripte vor der Ausführung und nutze die bereitgestellten Prüfsummen. Binaries und Quellcode findest du im <a href={REPO} rel="noopener noreferrer">GitHub-Repository</a>.</p>
        <h2>4. Zulässige Nutzung</h2>
        <p>Bitte unterlasse Handlungen, die den Betrieb der Seite stören oder unverhältnismäßig belasten (z. B. automatisierte Massenabrufe, Angriffsversuche).</p>
        <h2>5. Haftung</h2>
        <p>Ich hafte unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, typischerweise eintretenden Schaden begrenzt; im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen. Für unentgeltlich überlassene Software gelten ergänzend die Haftungsregeln der MIT-Lizenz, soweit gesetzlich zulässig. Zwingende gesetzliche Haftung bleibt unberührt.</p>
        <h2>6. Marken und weitere Hinweise</h2>
        <p>Genannte Produkt- und Markennamen (z. B. GitHub, Vercel) gehören ihren jeweiligen Inhabern. Siehe außerdem <a href="/impressum">Impressum</a> und <a href="/datenschutz">Datenschutzerklärung</a>.</p>
        <h2>7. Anwendbares Recht</h2>
        <p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Zwingende Verbraucherschutzvorschriften deines Wohnsitzstaates bleiben unberührt.</p>
      </PageBody>
    </>
  );
}
