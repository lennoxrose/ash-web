import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fmtDate, fmtTime, plural } from "../../../lib/format";
import { getCommit, getCommits, type CommitDetail } from "../../../lib/github";
import { Button } from "../../components";
import { pageMeta } from "../../meta";
import { Fallback, PageBody } from "../../page-parts";
import { REPO } from "../../site";
import "../../pages.css";
import "./detail.css";
import { FileCard } from "./diff";

export const revalidate = 86400;
export const dynamic = "force-static";
const SHA = /^[0-9a-f]{7,40}$/;
const FILE_LIMIT = 300;

// The latest commits are prebuilt; older ones render once on first request and are then served from the cache.
export const generateStaticParams = async () => (await getCommits())?.map((c) => ({ sha: c.sha })) ?? [];

const title = (line: string) => (line.length + 6 < 60 ? `${line} · Ash` : line.length < 60 ? line : `${line.slice(0, 58)}…`);
const first = (c: CommitDetail) => c.commit.message.split("\n")[0];

export async function generateMetadata({ params }: { params: Promise<{ sha: string }> }): Promise<Metadata> {
  const { sha } = await params;
  const c = SHA.test(sha) ? await getCommit(sha) : "missing";
  const line = typeof c === "string" ? `Commit ${sha.slice(0, 7)}` : first(c);
  return { ...pageMeta(`/commits/${sha}`, title(line), line), robots: { index: false, follow: false } };
}

const Stat = ({ a, d }: { a: number; d: number }) => <><b className="plus">+{a}</b><b className="minus">−{d}</b></>;

export default async function CommitPage({ params }: { params: Promise<{ sha: string }> }) {
  const { sha } = await params;
  if (!SHA.test(sha)) notFound();
  const c = await getCommit(sha);
  if (c === "missing") notFound();
  const gh = `${REPO}/commit/${sha}`;

  if (c === "error") {
    return (
      <>
        <Head title={`Commit ${sha.slice(0, 7)}`} />
        <PageBody cls="detail"><Fallback what="this commit" href={gh} /></PageBody>
      </>
    );
  }

  const [head, ...rest] = c.commit.message.split("\n");
  const body = rest.join("\n").trim();
  const when = (c.commit.committer ?? c.commit.author)?.date ?? "";
  const files = c.files ?? [];
  const url = c.html_url?.startsWith("https://github.com/") ? c.html_url : gh;
  return (
    <>
      <Head title={head} by={`${c.author?.login ?? c.commit.author?.name ?? "unknown"} committed on ${fmtDate(when)} at ${fmtTime(when)}`} />
      <PageBody cls="detail">
        <div className="cinfo">
          <div className="hashes">
            <span className="pill">{c.sha.slice(0, 7)}</span>
            {c.parents.length > 0 && <span className="plabel">{c.parents.length > 1 ? "parents" : "parent"}</span>}
            {c.parents.map((p) => <a key={p.sha} className="pill ghost" href={`/commits/${p.sha}`}>{p.sha.slice(0, 7)}</a>)}
            {c.parents.length > 1 && <span className="plabel">Merge commit</span>}
          </div>
          <p className="cstats"><b>{plural(files.length, "file")} changed</b><Stat a={c.stats?.additions ?? 0} d={c.stats?.deletions ?? 0} /></p>
        </div>
        {body && <pre className="msgbody">{body}</pre>}
        {files.length === 0 && <p className="fallback">No file changes in this commit.</p>}
        {files.map((f) => <FileCard key={f.filename} f={f} />)}
        {files.length >= FILE_LIMIT && <p className="fallback">GitHub only returns the first {FILE_LIMIT} files of a commit. <a href={url} rel="noopener noreferrer">View the full commit on GitHub</a>.</p>}
        <div className="actions">
          <Button href={url} tone="maroon sm w380">View commit on GitHub</Button>
          <Button href="/commits" tone="outline sm w380">← Back to commit history</Button>
        </div>
      </PageBody>
    </>
  );
}

const Head = ({ title, by }: { title: string; by?: string }) => (
  <section className="sec band red detail">
    <div className="inner">
      <a className="back" href="/commits">← Commit history</a>
      <h1>{title}</h1>
      {by && <p className="by">{by}</p>}
    </div>
  </section>
);
