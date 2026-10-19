import { fmtDate, fmtSize, plural } from "../../lib/format";
import type { Asset, Release } from "../../lib/github";
import { Notes } from "./notes";

// "sha256:<64 hex>" -> "sha256: <first 16>…<last 8>"
const short = (digest: string) => {
  const hex = digest.replace(/^sha256:/, "");
  return `sha256: ${hex.slice(0, 16)}…${hex.slice(-8)}`;
};

const AssetRow = ({ a }: { a: Asset }) => {
  const meta = [a.digest?.startsWith("sha256:") && short(a.digest), plural(a.download_count, "download")].filter(Boolean).join(" · ");
  return (
    <li>
      <div className="a-text"><b>{a.name}</b><span>{meta}</span></div>
      <div className="a-act">
        <span>{fmtSize(a.size)}</span>
        {a.browser_download_url.startsWith("https://github.com/") && (
          <a className="dl" href={a.browser_download_url} rel="noopener noreferrer" aria-label={`Download ${a.name}`}>Download</a>
        )}
      </div>
    </li>
  );
};

export const ReleaseCard = ({ r, latest }: { r: Release; latest: boolean }) => (
  <article className="rel">
    <div className="rel-head">
      <div className="tags">
        <span className="pill">{r.tag_name}</span>
        {latest && <span className="pill solid">Latest</span>}
      </div>
      <time dateTime={r.published_at ?? r.created_at}>{fmtDate(r.published_at ?? r.created_at)}</time>
    </div>
    <h2>{r.name || r.tag_name}</h2>
    {r.body?.trim() && <Notes body={r.body} />}
    <hr />
    <h3>Assets</h3>
    <ul className="assets">
      {r.assets.filter((a) => a.state === "uploaded").map((a) => <AssetRow key={a.name} a={a} />)}
      <li><div className="a-text"><a href={r.zipball_url} rel="noopener noreferrer"><b>Source code (zip)</b></a></div></li>
      <li><div className="a-text"><a href={r.tarball_url} rel="noopener noreferrer"><b>Source code (tar.gz)</b></a></div></li>
    </ul>
  </article>
);
