import { getReleases, latestOf } from "../../lib/github";
import { Button } from "../components";
import { InstallBar } from "../install";
import { pageMeta } from "../meta";
import { Band, Fallback, PageBody } from "../page-parts";
import { RELEASES } from "../site";
import { ReleaseCard } from "./card";
import "../pages.css";

export const revalidate = 600;
export const dynamic = "force-static";
export const metadata = pageMeta("/releases", "Ash releases: downloads and checksums", "Every Ash release with downloads and checksums.");

export default async function Releases() {
  const releases = await getReleases();
  const latest = latestOf(releases);
  return (
    <>
      <Band tone="dark" title="Releases">Every Ash release with downloads and checksums.</Band>
      <PageBody>
        {releases === null && <Fallback href={RELEASES} />}
        {releases?.length === 0 && <p className="fallback">No releases have been published yet. <a href={RELEASES} rel="noopener noreferrer">Browse the repository on GitHub</a>.</p>}
        {releases?.map((r) => <ReleaseCard key={r.tag_name} r={r} latest={r === latest} />)}
        {releases?.length !== 0 && (
          <div className="callout">
            <h2>Install this release</h2>
            <InstallBar />
          </div>
        )}
        <Button href={RELEASES} tone="maroon sm w380">View all releases on GitHub</Button>
      </PageBody>
    </>
  );
}
