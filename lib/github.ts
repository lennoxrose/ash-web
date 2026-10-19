// Server-only GitHub reads. The browser never calls GitHub (the CSP has connect-src 'self').
const API = "https://api.github.com/repos/lennoxrose/ash";
// Pages are prebuilt (ISR) and regenerated in the background every 10 minutes; visitors never wait on GitHub.
const REFRESH = 600;
const lastGood = new Map<string, unknown>();

export type Asset = { name: string; size: number; state: string; digest: string | null; download_count: number; browser_download_url: string };
export type Release = {
  tag_name: string; name: string | null; body: string | null; draft: boolean; prerelease: boolean;
  html_url: string; published_at: string | null; created_at: string; zipball_url: string; tarball_url: string; assets: Asset[];
};
export type DiffFile = {
  filename: string; previous_filename?: string; status: string; additions: number; deletions: number; changes: number;
  blob_url: string; patch?: string;
};
export type CommitDetail = Commit & { parents: { sha: string }[]; stats?: { additions: number; deletions: number }; files?: DiffFile[] };
export type Commit = {
  sha: string; html_url: string;
  commit: { message: string; author: { name: string; date: string } | null; committer: { date: string } | null };
  author: { login: string } | null;
};

type Fetched<T> = { data: T } | { status: number | null };

// A failed or rate-limited request falls back to the last good copy, else reports the failure (callers render a fallback).
async function getJson<T>(path: string, revalidate: number): Promise<Fetched<T>> {
  let status: number | null = null;
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(`${API}${path}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "ash-web (ash-project.org)", ...(token && { Authorization: `Bearer ${token}` }) },
      next: { revalidate },
    });
    status = res.status;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as T;
    lastGood.set(path, data);
    return { data };
  } catch (e) {
    console.warn(`github ${path.split("?")[0]}: ${e instanceof Error ? e.message : "failed"}`);
    return lastGood.has(path) ? { data: lastGood.get(path) as T } : { status };
  }
}

async function list<T>(path: string): Promise<T[] | null> {
  const r = await getJson<unknown>(path, REFRESH);
  return "data" in r && Array.isArray(r.data) ? (r.data as T[]) : null;
}

export const getReleases = async () => (await list<Release>("/releases?per_page=10"))?.filter((r) => !r.draft) ?? null;
export const getCommits = () => list<Commit>("/commits?sha=main&per_page=10");
// Same as /releases/latest: the newest release that is neither a draft nor a pre-release.
export const latestOf = (rs: Release[] | null) => rs?.find((r) => !r.prerelease) ?? null;

// Build-time sanity check for the hardcoded ecosystem list: warn, never fail.
export async function warnMissingRepos(names: string[]) {
  await Promise.all(names.map(async (n) => {
    try {
      const res = await fetch(`https://github.com/lennoxrose/${n}`, { method: "HEAD", next: { revalidate: 86400 } });
      if (res.status === 404) console.warn(`ecosystem: github.com/lennoxrose/${n} returned 404`);
    } catch { /* offline builds are fine */ }
  }));
}

// One commit with its files and patches. Commits are immutable, so this is cached for a day.
// "missing" = GitHub says it does not exist; "error" = could not load it right now.
export async function getCommit(sha: string): Promise<CommitDetail | "missing" | "error"> {
  const r = await getJson<CommitDetail>(`/commits/${sha}`, 86400);
  if ("data" in r) return r.data;
  return r.status === 404 || r.status === 422 ? "missing" : "error";
}
