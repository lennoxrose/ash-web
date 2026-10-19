import { plural } from "../../../lib/format";
import type { DiffFile } from "../../../lib/github";
import { parsePatch } from "../../../lib/diff";

const MAX_LINES = 500;

const Stats = ({ a, d }: { a: number; d: number }) => (
  <span className="fstats"><b className="plus">+{a}</b><b className="minus">−{d}</b></span>
);

function Rows({ patch }: { patch: string }) {
  return (
    <div className="diff">
      {parsePatch(patch).map((r, i) => (
        <div key={i} className={`dr ${r.kind}`}>
          <span className="no">{r.old ?? ""}</span>
          <span className="no">{r.new ?? ""}</span>
          <code>{r.text}</code>
        </div>
      ))}
    </div>
  );
}

function Body({ f }: { f: DiffFile }) {
  if (!f.patch) {
    return (
      <p className="nodiff">
        {f.changes === 0 ? "No content changes." : "Binary file or diff too large to show."}{" "}
        {f.blob_url.startsWith("https://github.com/") && <a href={f.blob_url} rel="noopener noreferrer">View the file on GitHub</a>}
      </p>
    );
  }
  if (f.changes > MAX_LINES) {
    return <details className="big"><summary>Show diff ({plural(f.changes, "changed line")})</summary><Rows patch={f.patch} /></details>;
  }
  return <Rows patch={f.patch} />;
}

export const FileCard = ({ f }: { f: DiffFile }) => (
  <section className="file">
    <div className="fhead">
      <h2>
        <span className="fname">{f.previous_filename ? `${f.previous_filename} → ${f.filename}` : f.filename}</span>
        <span className="fpill">{f.status}</span>
      </h2>
      <Stats a={f.additions} d={f.deletions} />
    </div>
    <Body f={f} />
  </section>
);

