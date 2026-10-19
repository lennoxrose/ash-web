import type { ReactNode } from "react";
import { fmtDate } from "../lib/format";
import { getReleases, latestOf } from "../lib/github";
import { BLOB, GH_USER, REPO, RELEASES, TREE } from "./site";

export const Section = ({ tone, title, id, children }: { tone: string; title: string; id?: string; children: ReactNode }) => (
  <section id={id} className={`sec ${tone}`}>
    <div className="inner">
      <h2>{title}</h2>
      {children}
    </div>
  </section>
);

export const Code = ({ lines, wide }: { lines: string[]; wide?: boolean }) => (
  <pre className={`code${wide ? " wide" : ""}`} tabIndex={0}>{lines.join("\n")}</pre>
);

export const Button = ({ href, children, tone = "amber" }: { href: string; children: ReactNode; tone?: string }) => (
  <a className={`btn ${tone}`} href={href} {...(href.startsWith("http") && { rel: "noopener noreferrer" })}>{children}</a>
);

export const Cols = ({ items, tag }: { items: [string, string][]; tag?: boolean }) => (
  <div className="cols">
    {items.map(([h, p]) => (
      <div key={h}>
        {tag ? <span className="tag">{h}</span> : <h3>{h}</h3>}
        <p>{p}</p>
      </div>
    ))}
  </div>
);

const Link = ({ label, href }: { label: string; href: string }) => <a href={href} rel="noopener noreferrer">{label}</a>;

const GH = `${REPO}/blob/main/.github`;
const COLS: [string, [string, string][]][] = [
  ["Project", [["Source on GitHub", REPO], ["README", `${BLOB}/README.md`], ["Changelog", `${BLOB}/CHANGELOG.md`], ["License (MIT)", `${BLOB}/LICENSE`]]],
  ["Community", [["Code of Conduct", `${GH}/CODE_OF_CONDUCT.md`], ["Contributing", `${GH}/CONTRIBUTING.md`], ["Security policy", `${GH}/SECURITY.md`], ["Support", `${GH}/SUPPORT.md`]]],
  ["Tools", [["ashvm", `${TREE}/hearth/ashvm`], ["kiln", `${TREE}/hearth/kiln`], ["apm", `${TREE}/hearth/apm`], ["mnemo", `${TREE}/hearth/mnemo`]]],
];

export async function Footer() {
  const latest = latestOf(await getReleases());
  return (
    <footer className="sec ink">
      <div className="inner">
        <div className="cols links">
          {COLS.map(([title, items]) => (
            <div key={title}>
              <h2>{title}</h2>
              {items.map(([l, h]) => <Link key={l} label={l} href={h} />)}
            </div>
          ))}
          <div>
            <h2>Latest release</h2>
            {latest ? (
              <>
                <Link label={latest.tag_name} href={`${RELEASES}/latest`} />
                <span>{fmtDate(latest.published_at ?? latest.created_at)}</span>
              </>
            ) : <Link label="Releases on GitHub" href={RELEASES} />}
          </div>
        </div>
        <p className="credit"><a href={GH_USER} rel="noopener noreferrer">Made by lennoxrose</a></p>
      </div>
    </footer>
  );
}
