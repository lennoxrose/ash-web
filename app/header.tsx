"use client";
import { useEffect, useState } from "react";
import { REPO } from "./site";

const NAV: [string, string][] = [["Why Ash", "/#why-ash"], ["Tools", "/#tools"], ["Get started", "/#get-started"], ["GitHub", REPO]];

export const Header = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);
  return (
    <header className="inner nav">
      <a className="brand" href="/"><span className="logo"><img src="/mark.svg" alt="Ash logo" width={38} height={53} /></span>Ash</a>
      <nav id="site-nav" aria-label="Main" className={open ? "open" : ""}>
        {NAV.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} {...(h.startsWith("http") && { rel: "noopener noreferrer" })}>{l}</a>)}
      </nav>
      <button type="button" className="menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}><i /><i /><i /></button>
    </header>
  );
};
