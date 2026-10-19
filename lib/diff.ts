// Parses a unified-diff "patch" (as returned by the GitHub API) into display rows. Nothing here produces HTML.
export type DiffRow = { kind: "hunk" | "add" | "del" | "ctx" | "note"; old?: number; new?: number; text: string };

const HUNK = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;

export function parsePatch(patch: string): DiffRow[] {
  const rows: DiffRow[] = [];
  let o = 0;
  let n = 0;
  const lines = patch.split("\n");
  if (lines.at(-1) === "") lines.pop();
  for (const line of lines) {
    const h = HUNK.exec(line);
    if (h) { o = +h[1]; n = +h[2]; rows.push({ kind: "hunk", text: line }); }
    else if (line.startsWith("+")) rows.push({ kind: "add", new: n++, text: line });
    else if (line.startsWith("-")) rows.push({ kind: "del", old: o++, text: line });
    else if (line.startsWith("\\")) rows.push({ kind: "note", text: line });
    else rows.push({ kind: "ctx", old: o++, new: n++, text: line });
  }
  return rows;
}
