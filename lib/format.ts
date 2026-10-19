// Dates and times are always UTC so the output is identical on the server and everywhere else.
const opts = { timeZone: "UTC" } as const;
const date = new Intl.DateTimeFormat("en-US", { ...opts, year: "numeric", month: "short", day: "numeric" });
const time = new Intl.DateTimeFormat("en-US", { ...opts, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

export const fmtDate = (iso: string) => date.format(new Date(iso));
export const fmtTime = (iso: string) => `${time.format(new Date(iso))} UTC`;
export const dayKey = (iso: string) => new Date(iso).toISOString().slice(0, 10);
export const fmtSize = (n: number) => (n < 1024 ? `${n} B` : n < 1048576 ? `${Math.round(n / 1024)} KB` : `${(n / 1048576).toFixed(1)} MB`);
export const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

// Five-square change bar (as in GitHub's diffstat): deletions get round(5 * d / total) squares, at least one if any.
export function changeBar(add: number, del: number): ("add" | "del" | "none")[] {
  const total = add + del;
  if (total === 0) return Array(5).fill("none");
  const dels = del === 0 ? 0 : add === 0 ? 5 : Math.min(4, Math.max(1, Math.round((5 * del) / total)));
  return Array.from({ length: 5 }, (_, i) => (i < 5 - dels ? "add" : "del"));
}
