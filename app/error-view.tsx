"use client";
import { useEffect, useState } from "react";

export default function ErrorView() {
  const [path, setPath] = useState("/this/page");
  useEffect(() => setPath(location.pathname.slice(0, 80)), []);
  return (
    <section className="hero inner">
      <h1 className="sr-only">404: page not found</h1>
      <pre className="code err" aria-hidden="true">
        <b>error</b>: cannot find symbol{"\n"}
        {"  "}--&gt; {path}:404:8{"\n"}
        {"    |\n"}
        {"404 | import "}{path};{"\n"}
        {"    |        "}<b>{"^".repeat(path.length)} no such page</b>{"\n"}
        {"    |\n"}
        <b>help</b>: nothing is declared at this path
      </pre>
      <a className="btn amber" href="/">Back to home</a>
    </section>
  );
}
