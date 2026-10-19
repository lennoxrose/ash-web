import { readFileSync } from "node:fs";
import { join } from "node:path";
import { REPO, SITE_URL, TAGLINE } from "./site";

// The logo lives in app/robots.txt/art.txt (also used by robots.txt).
export const art = () => readFileSync(join(process.cwd(), "app/robots.txt/art.txt"), "utf8").trimEnd();

export const text = (body: string) =>
  new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });

export const curlPage = () => `${art()}\n\n${TAGLINE}\n\nSite:   ${SITE_URL}\nGitHub: ${REPO}\n`;
