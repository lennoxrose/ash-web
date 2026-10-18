const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
// Set NEXT_PUBLIC_SITE_URL to your custom domain; falls back to the Vercel production URL, then localhost.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? vercel ?? "http://localhost:3000").replace(/\/$/, "");
export const GH_USER = "https://github.com/lennoxrose";
export const REPO = `${GH_USER}/ash`;
export const BLOB = `${REPO}/blob/main`;
export const TREE = `${REPO}/tree/main`;
export const TAGLINE = "A Java-like language, built from scratch in C.";
export const DESCRIPTION = `${TAGLINE} One front end, two engines: a VM or a native binary.`;
