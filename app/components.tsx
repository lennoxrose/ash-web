import type { ReactNode } from "react";
import { BLOB, GH_USER, REPO, TREE } from "./site";

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

const Link = ({ label, href }: { label: string; href?: string }) =>
  href ? <a href={href} rel="noopener noreferrer">{label}</a> : <span>{label}</span>;

const COLS: [string, [string, string?][]][] = [
  ["Project", [["Source on GitHub", REPO], ["README", `${BLOB}/README.md`], ["Changelog", `${BLOB}/CHANGELOG.md`]]],
  ["Tools", [["ashvm", `${TREE}/hearth/ashvm`], ["kiln", `${TREE}/hearth/kiln`], ["apm", `${TREE}/hearth/apm`], ["mnemo"]]],
  ["Status", [["Pre-release"], ["No version number yet"]]],
];

export const Footer = () => (
  <footer className="sec ink">
    <div className="inner">
      <div className="cols links">
        {COLS.map(([title, items]) => (
          <div key={title}>
            <h2>{title}</h2>
            {items.map(([l, h]) => <Link key={l} label={l} href={h} />)}
          </div>
        ))}
      </div>
      <p className="credit"><a href={GH_USER} rel="noopener noreferrer">Made by lennoxrose</a></p>
    </div>
  </footer>
);
