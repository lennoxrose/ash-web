"use client";
import { useEffect, useState } from "react";

const KEY = "ash-theme";

// The same sun in both themes; the stroke follows --sun (ink in light, amber in dark).
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  // The blocking script in <head> already set data-theme before first paint; mirror it into state.
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      if (next) localStorage.setItem(KEY, "dark");
      else localStorage.removeItem(KEY);
    } catch { /* storage blocked: the choice still holds for this session */ }
  };
  return (
    <button type="button" className="theme" aria-pressed={dark} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggle}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
