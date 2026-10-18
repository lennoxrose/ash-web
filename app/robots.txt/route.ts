import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "../site";

export const dynamic = "force-static";

// Paste your ASCII art into art.txt; every line becomes a robots.txt comment.
export const GET = () => {
  const art = readFileSync(join(process.cwd(), "app/robots.txt/art.txt"), "utf8")
    .trimEnd().split("\n").map((l) => `# ${l}`.trimEnd()).join("\n");
  return new Response(`${art}\n\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
