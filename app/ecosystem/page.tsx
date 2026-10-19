import { warnMissingRepos } from "../../lib/github";
import { Button } from "../components";
import { pageMeta } from "../meta";
import { Band, PageBody } from "../page-parts";
import { GH_USER } from "../site";
import { EcoMap } from "./map";
import "./ecosystem.css";

export const revalidate = 86400;
export const dynamic = "force-static";
export const metadata = pageMeta("/ecosystem", "Ash ecosystem: official repositories", "Every official Ash repository, and how they fit together.");

export default async function Ecosystem() {
  await warnMissingRepos(["ash", "ash-stdlib", "ash-syntax", "ash-web", "ash-icons"]);
  return (
    <>
      <Band tone="orange" title="Ecosystem">Every official Ash repository, and how they fit together.</Band>
      <PageBody>
        <EcoMap />
        <Button href={`${GH_USER}?tab=repositories`} tone="maroon sm w440">Browse all repositories on GitHub</Button>
      </PageBody>
    </>
  );
}
