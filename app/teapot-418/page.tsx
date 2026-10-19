import { Button } from "../components";

export const metadata = { title: "418: I'm a teapot", robots: { index: false } };

export default function Teapot() {
  return (
    <section className="hero inner">
      <h1>418</h1>
      <p className="lede">I&apos;m a teapot.</p>
      <p>The server refuses to brew coffee with a teapot.</p>
      <Button href="/">Back to home</Button>
    </section>
  );
}
