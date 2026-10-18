import { Button, Code, Cols, Section } from "./components";
import { REPO, TAGLINE } from "./site";

const hello = ["package examples;", "", "public class HelloWorld {", "    public static void main(String[] args) {", '        System.out.println("Hello, Ash!");', "    }", "}"];
const build = ["git clone https://github.com/lennoxrose/ash.git && cd ash", "tools/install.sh", "make", "bin/ashvm run Main.ash", "bin/kiln Main.ash -o main"];

export default function Home() {
  return (
    <>
      <section className="hero inner">
        <h1>Ash</h1>
        <p className="lede">{TAGLINE}</p>
        <p>One front end, two engines: a VM or a native binary.</p>
        <Button href="#get-started">Get Started</Button>
        <small>Pre-release</small>
      </section>
      <Section tone="white" title="Why Ash?" id="why-ash">
        <Cols items={[
          ["Java-like and typed", "Packages, classes, generics, T? null safety, checked exceptions and lambdas."],
          ["One front end, two engines", "ashvm is a bytecode VM with a REPL. kiln compiles the same code to a native ELF or PE binary."],
          ["Memory safety you can turn off", "On by default. Moves, & and &mut borrows, use-after-move errors, compile-time overflow and bounds checks, and freeing at scope exit. A design goal, not a Rust-equivalent guarantee."],
        ]} />
      </Section>
      <Section tone="dark" title="Hello, Ash">
        <p>Packages, classes and a main method. This is examples/HelloWorld.ash from the repo.</p>
        <Code lines={hello} />
      </Section>
      <Section tone="red" title="Built from scratch in C" id="tools">
        <p>No external dependencies.</p>
        <Cols tag items={[
          ["ashvm", "Bytecode VM with a REPL."],
          ["kiln", "Native ELF or PE compiler. No VM and no libc. Windows targets and --link=shared."],
          ["apm", "Package manager with new, add, check, license and run."],
          ["mnemo", "The Rust memory-safety engine."],
        ]} />
      </Section>
      <Section tone="orange" title="Get started" id="get-started">
        <p>There are no packaged installs or releases yet. Build it from source.</p>
        <Code lines={build} wide />
        <p>make builds bin/ashvm, bin/kiln and apm. ashvm runs the source, kiln turns it into a native binary.</p>
        <Button href={REPO} tone="maroon">View on GitHub</Button>
      </Section>
    </>
  );
}
