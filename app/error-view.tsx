export default function ErrorView({ path }: { path: string }) {
  return (
    <section className="hero inner">
      <h1 className="sr-only">404: page not found</h1>
      <pre className="code err" aria-hidden="true">
        <b>error</b>: cannot find route{"\n"}
        {"  "}--&gt; {path}:404:8{"\n"}
        {"    |\n"}
        {"404 | import "}{path};{"\n"}
        {"    |        "}<b>{"^".repeat(path.length)} no such route</b>{"\n"}
        {"    |\n"}
        <b>help</b>: nothing is declared at this path
      </pre>
      <a className="btn amber" href="/">Back to home</a>
    </section>
  );
}
