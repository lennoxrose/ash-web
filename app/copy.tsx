"use client";
import { useRef, useState } from "react";

// Copies the command (without the "$ " prompt). Falls back to execCommand where the Clipboard API is unavailable.
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.className = "sr-only";
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export default function CopyCommand({ command }: { command: string }) {
  const [state, setState] = useState<"" | "ok" | "fail">("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onClick = async () => {
    setState((await copy(command)) ? "ok" : "fail");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState(""), 2000);
  };
  return (
    <div className="cmd">
      <code>$ {command}</code>
      <button type="button" className="copy" onClick={onClick}>{state === "ok" ? "Copied" : "Copy"}</button>
      <span className="sr-only" aria-live="polite">{state === "ok" ? "Copied to clipboard" : state === "fail" ? "Copy failed. Select the command and copy it manually." : ""}</span>
    </div>
  );
}
