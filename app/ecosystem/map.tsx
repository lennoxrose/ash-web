import { GH_USER, REPO } from "../site";

type Repo = { name: string; desc: string; meta: string; fork?: boolean; at: string };
const REPOS: Repo[] = [
  { name: "ash-stdlib", desc: "The optional standard library for Ash.", meta: "Ash · MIT", at: "tl" },
  { name: "ash-syntax", desc: "Ash syntax highlighting. VS Code extension on Open VSX.", meta: "MIT", at: "tr" },
  { name: "ash-web", desc: "The Ash website at ash-project.org.", meta: "TypeScript · MIT", at: "bl" },
  { name: "ash-icons", desc: "Custom file and folder icons for Visual Studio Code.", meta: "TypeScript · MIT", fork: true, at: "br" },
];
const HEARTH: [string, string][] = [
  ["front", "Shared front end"], ["ashvm", "Bytecode VM with a REPL"], ["kiln", "Native ELF / PE compiler"],
  ["apm", "Package manager"], ["mnemo", "Memory-safety engine (Rust)"], ["pyre", "GPU / CPU compute backends"],
];
// Elbows in the design's 1240x800 space. x scales with the map, y stays put; strokes never scale.
const WIRES = ["M320 95.5H360.5V252.5H400", "M920 95.5H879.5V252.5H840", "M320 706.5H360.5V549.5H400", "M920 706.5H879.5V549.5H840"];
const DOTS = ["tl", "tr", "bl", "br"];
const ext = { rel: "noopener noreferrer" };

export const EcoMap = () => (
  <div className="eco">
    <svg className="wires" viewBox="0 0 1240 800" preserveAspectRatio="none" aria-hidden="true">
      {WIRES.map((d) => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}
    </svg>
    <a className="core" href={REPO} {...ext}>
      <span className="pill solid">Core</span>
      <h2>lennoxrose/ash</h2>
      <p>The language: compiler, VM and tools. C · MIT</p>
      <hr />
      <b>hearth/</b>
      {HEARTH.map(([n, d]) => <div key={n} className="row"><b>{n}</b><span>{d}</span></div>)}
    </a>
    {REPOS.map((r) => (
      <a key={r.name} className={`card ${r.at}`} href={`${GH_USER}/${r.name}`} {...ext}>
        <h2>{r.name}{r.fork && <span className="pill fork">Fork</span>}</h2>
        <p>{r.desc}</p>
        <small>github.com/lennoxrose/{r.name}</small>
        <strong>{r.meta}</strong>
      </a>
    ))}
    {DOTS.map((d) => <img key={d} className={`dot ${d}`} src="/connector-dot.svg" alt="" width={14} height={14} />)}
  </div>
);
