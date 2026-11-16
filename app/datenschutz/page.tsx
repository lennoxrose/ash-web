import { pageMeta } from "../meta";
import { Band, PageBody } from "../page-parts";
import { OWNER as O, REPO } from "../site";

export const dynamic = "force-static";
export const metadata = pageMeta("/datenschutz", "Datenschutzerklärung", "Welche Daten beim Besuch dieser Seite verarbeitet werden.");

export default function Datenschutz() {
  return (
    <>
      <Band tone="dark" title="Datenschutzerklärung">Welche Daten beim Besuch dieser Seite verarbeitet werden.</Band>
      <PageBody cls="legal">
        <h2>1. Verantwortlicher</h2>
        <p>{O.name}, {O.street}, {O.city}, {O.country}. E-Mail: <a href={`mailto:${O.email}`}>{O.email}</a></p>
        <h2>2. Überblick</h2>
        <p>Diese Seite setzt keine Cookies, enthält kein Tracking, keine Analyse-Tools, keine Werbung und keine Kontaktformulare. Schriften und Bilder werden von der Seite selbst ausgeliefert; es werden keine Inhalte von Drittservern in deinen Browser nachgeladen.</p>
        <h2>3. Hosting bei Vercel und Server-Logfiles</h2>
        <p>Die Seite wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten: IP-Adresse, Datum und Uhrzeit, aufgerufene URL, Referrer, Browser/User-Agent und übertragene Datenmenge. Auch der Abruf von <code>/install.sh</code> per curl wird so protokolliert.</p>
        <p>Zweck ist der sichere und stabile Betrieb der Seite. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am technisch fehlerfreien und sicheren Betrieb). Die Logdaten werden vom Anbieter nur für begrenzte Zeit gespeichert und dann gelöscht.</p>
        <p>Dabei kann eine Übermittlung in die USA stattfinden. Sie stützt sich auf den Angemessenheitsbeschluss der EU-Kommission (EU-US Data Privacy Framework) bzw. ergänzend auf Standardvertragsklauseln. Mit Vercel besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.</p>
        <h2>4. GitHub-Daten</h2>
        <p>Release-, Commit- und Repository-Informationen werden serverseitig von der öffentlichen GitHub-API abgerufen und zwischengespeichert. Deine Daten gelangen dabei nicht an GitHub. Links zu GitHub sind gewöhnliche Links: Erst wenn du sie anklickst, verarbeitet GitHub (GitHub Inc., USA / Microsoft) Daten nach eigener Datenschutzerklärung. Commit-Daten (Name und Zeitpunkt der Autoren) stammen aus dem öffentlichen Repository <a href={REPO} rel="noopener noreferrer">{REPO.replace("https://", "")}</a>.</p>
        <h2>5. Lokaler Speicher (Darstellungsmodus)</h2>
        <p>Wenn du den Dark Mode umschaltest, speichert dein Browser diese Einstellung im lokalen Speicher (<code>localStorage</code>, Schlüssel <code>ash-theme</code>). Der Wert bleibt auf deinem Gerät und wird nicht an den Server übertragen. Dies ist für die von dir gewünschte Funktion erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG); eine Einwilligung ist nicht nötig. Du kannst den Eintrag jederzeit in den Browser-Einstellungen löschen.</p>
        <h2>6. Deine Rechte</h2>
        <p>Du hast gegenüber mir das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Da ich IP-Adressen nur über den Hosting-Anbieter erhalte und selbst nicht speichere, kann ich Anfragen ggf. nur eingeschränkt beantworten.</p>
        <p>Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), z. B. bei der Behörde deines Wohnorts oder des Sitzes des Verantwortlichen.</p>
        <h2>7. Verschlüsselung</h2>
        <p>Die Seite wird ausschließlich per HTTPS (TLS) ausgeliefert.</p>
        <h2>8. Änderungen</h2>
        <p>Ich passe diese Erklärung an, wenn sich die Seite oder die Rechtslage ändert. Es gilt die jeweils hier veröffentlichte Fassung.</p>
      </PageBody>
    </>
  );
}
