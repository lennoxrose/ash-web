import { pageMeta } from "../meta";
import { Band, PageBody } from "../page-parts";
import { GH_USER, OWNER as O } from "../site";

export const dynamic = "force-static";
export const metadata = pageMeta("/impressum", "Impressum", "Anbieterkennzeichnung nach § 5 DDG.");

export default function Impressum() {
  return (
    <>
      <Band tone="dark" title="Impressum">Angaben gemäß § 5 DDG</Band>
      <PageBody cls="legal">
        <h2>Anbieter</h2>
        <p>{O.name}<br />{O.street}<br />{O.city}<br />{O.country}</p>
        <h2>Kontakt</h2>
        <p>E-Mail: <a href={`mailto:${O.email}`}>{O.email}</a></p>
        <h2>Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
        <p>{O.name}, Anschrift wie oben.</p>
        <h2>Hinweis zum Projekt</h2>
        <p>Ash ist ein privates, nicht-kommerzielles Open-Source-Projekt (<a href={GH_USER} rel="noopener noreferrer">GitHub</a>). Diese Seite ist ein rein privates Informationsangebot.</p>
        <h2>Haftung für Inhalte</h2>
        <p>Als Diensteanbieter bin ich nach den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Nach §§ 8 bis 10 DDG bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben unberührt. Eine Haftung ist erst ab Kenntnis einer konkreten Rechtsverletzung möglich; bei Bekanntwerden entsprechender Rechtsverletzungen entferne ich diese Inhalte umgehend.</p>
        <h2>Haftung für Links</h2>
        <p>Diese Seite enthält Links zu externen Websites Dritter (insbesondere GitHub), auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte kann ich keine Gewähr übernehmen; verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von Rechtsverletzungen entferne ich solche Links umgehend.</p>
        <h2>Urheberrecht</h2>
        <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Der Quellcode des Projekts steht unter der MIT-Lizenz (siehe Repository). Beiträge Dritter sind als solche gekennzeichnet. Bei Bekanntwerden von Urheberrechtsverletzungen entferne ich entsprechende Inhalte umgehend.</p>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>Ich bin weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </PageBody>
    </>
  );
}
