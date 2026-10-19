import type { ReactNode } from "react";
import { REPO } from "./site";

export const Band = ({ tone, title, children }: { tone: string; title: string; children: ReactNode }) => (
  <section className={`sec band ${tone}`}>
    <div className="inner">
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  </section>
);

export const PageBody = ({ children, cls = "" }: { children: ReactNode; cls?: string }) => (
  <section className={`sec pg ${cls}`}><div className="inner">{children}</div></section>
);

export const Fallback = ({ href = REPO, what = "this" }: { href?: string; what?: string }) => (
  <p className="fallback" role="status">Couldn&apos;t load {what} from GitHub right now. <a href={href} rel="noopener noreferrer">View it on GitHub</a>.</p>
);
