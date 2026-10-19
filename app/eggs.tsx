"use client";
import { useEffect } from "react";
import { REPO } from "./site";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const COLORS: Record<string, string> = { "#": "#9E231F", "%": "#7D1214", "*": "#C0601E", "+": "#D98A2B", "=": "#D98A2B" };

export default function Eggs({ art }: { art: string }) {
  useEffect(() => {
    // Console: the logo, coloured per character, then a greeting.
    const args: string[] = [];
    // DevTools misparses a "%" inside a %s value, so the "%" shade is drawn as "@" (colour is chosen by the original character).
    const fmt = (art.match(/(.)\1*|\n/gs) ?? []).map((run) => { args.push(`color:${COLORS[run[0]] ?? "inherit"}`, run.replaceAll("%", "@")); return "%c%s"; }).join("");
    console.log(fmt, ...args);
    console.log("%cHello, Ash!%c " + REPO, "font:700 16px monospace;color:#A22822", "");

    // Konami code: the logo facets spin (or just brighten with reduced motion).
    let i = 0, timer: number;
    const onKey = (e: KeyboardEvent) => {
      i = e.key.toLowerCase() === KONAMI[i].toLowerCase() ? i + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (i < KONAMI.length) return;
      i = 0;
      document.documentElement.classList.add("konami");
      clearTimeout(timer);
      timer = window.setTimeout(() => document.documentElement.classList.remove("konami"), 2500);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [art]);
  return null;
}
