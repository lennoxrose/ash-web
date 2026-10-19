// Post-build: put the ASCII logo in an HTML comment right after the doctype of every prerendered page.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = ".next/server/app";
const art = readFileSync("app/robots.txt/art.txt", "utf8").trimEnd().replaceAll("--", "- -");
const comment = `<!--\n${art}\n\nHello, Ash! https://github.com/lennoxrose/ash\n-->`;
for (const f of readdirSync(dir).filter((n) => n.endsWith(".html"))) {
  const html = readFileSync(`${dir}/${f}`, "utf8");
  if (html.startsWith("<!DOCTYPE html>") && !html.includes(comment)) writeFileSync(`${dir}/${f}`, html.replace("<!DOCTYPE html>", `<!DOCTYPE html>${comment}`));
}
