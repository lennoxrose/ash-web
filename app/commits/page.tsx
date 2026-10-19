import { dayKey, fmtDate, fmtTime, plural } from "../../lib/format";
import { getCommits, type Commit } from "../../lib/github";
import { Button } from "../components";
import { pageMeta } from "../meta";
import { Band, Fallback, PageBody } from "../page-parts";
import { REPO } from "../site";
import "../pages.css";

export const revalidate = 600;
export const dynamic = "force-static";
export const metadata = pageMeta("/commits", "Ash commit history on main", "Latest changes to lennoxrose/ash on main. Times are UTC.");

const when = (c: Commit) => (c.commit.committer ?? c.commit.author)?.date ?? "";
const groups = (commits: Commit[]) => {
  const out = new Map<string, Commit[]>();
  for (const c of commits) out.set(dayKey(when(c)), [...(out.get(dayKey(when(c))) ?? []), c]);
  return [...out.values()];
};

const Row = ({ c }: { c: Commit }) => (
  <li>
    <a className="crow" href={`/commits/${c.sha}`}>
      <span className="c-text">
        <b>{c.commit.message.split("\n")[0]}</b>
        <span>{c.author?.login ?? c.commit.author?.name ?? "unknown"} committed at <time dateTime={when(c)}>{fmtTime(when(c))}</time></span>
      </span>
      <span className="c-act">
        <span className="sha">{c.sha.slice(0, 7)}</span>
        <span className="chev" aria-hidden="true">›</span>
        <span className="vc">View changes ›</span>
      </span>
    </a>
  </li>
);

export default async function Commits() {
  const commits = (await getCommits())?.filter((c) => when(c));
  return (
    <>
      <Band tone="red" title="Commit history">Latest changes to lennoxrose/ash on main. Times are UTC.</Band>
      <PageBody>
        {!commits && <Fallback href={`${REPO}/commits/main`} />}
        {commits?.length === 0 && <p className="fallback">No commits to show.</p>}
        {commits && commits.length > 0 && (
          <>
            <div className="toolbar">
              <span className="pill">branch: main</span>
              <p>{plural(commits.length, "latest commit")} shown</p>
            </div>
            <div className="clist">
              {groups(commits).map((g) => (
                <section key={dayKey(when(g[0]))}>
                  <h2>Commits on {fmtDate(when(g[0]))}</h2>
                  <ul>{g.map((c) => <Row key={c.sha} c={c} />)}</ul>
                </section>
              ))}
            </div>
          </>
        )}
        <Button href={`${REPO}/commits/main`} tone="maroon sm w380">View full history on GitHub</Button>
      </PageBody>
    </>
  );
}
