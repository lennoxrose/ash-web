"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { REPO } from "./site";
import ThemeToggle from "./theme";

const NAV: [string, string][] = [["Why Ash", "/#why-ash"], ["Tools", "/#tools"], ["Ecosystem", "/ecosystem"], ["Releases", "/releases"], ["Commits", "/commits"], ["GitHub", REPO]];

const Logo = () => (
  <svg viewBox="0 0 37.8 52.8" width={38} height={53} role="img" aria-label="Ash logo">
    <path className="facet" d="M18.9 .15 .15 18.9l18.75 11.02Z" fill="#9E231F" />
    <path className="facet" d="M18.9 .15l18.75 18.75-18.75 11.02Z" fill="#7D1214" />
    <path className="facet" d="M.15 18.9l18.75 11.02-9.19 7.12Z" fill="#C0601E" />
    <path className="facet" d="M37.65 18.9 18.9 29.92l9.19 7.12Z" fill="#A22822" />
    <path className="facet" d="M9.71 37.04l9.19-7.12v22.73Z" fill="#D98A2B" />
    <path className="facet" d="M18.9 29.92l9.19 7.12-9.19 15.61Z" fill="#B35A1A" />
  </svg>
);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);
  return (
    <header className="inner nav">
      <a className="brand" href="/"><span className="logo"><Logo /></span>Ash</a>
      <div className="right">
        <nav id="site-nav" aria-label="Main" className={open ? "open" : ""}>
          {NAV.map(([l, h]) => <a key={l} href={h} aria-current={h === path || (h === "/commits" && path.startsWith("/commits/")) ? "page" : undefined} onClick={() => setOpen(false)} {...(h.startsWith("http") && { rel: "noopener noreferrer" })}>{l}</a>)}
        </nav>
        <ThemeToggle />
        <button type="button" className="menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}><i /><i /><i /></button>
      </div>
    </header>
  );
};
