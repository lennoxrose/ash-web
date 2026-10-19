import Markdown from "react-markdown";

// react-markdown builds React elements (no raw HTML, no dangerouslySetInnerHTML) and drops unsafe URL schemes.
// Notes lead with "- **Title.** text": the title becomes a bold lead-in line, without its trailing period.
const leadIns = (md: string) => md.replace(/^(\s*[-*] )\*\*(.+?)\.\*\*/gm, "$1**$2**");

export const Notes = ({ body }: { body: string }) => (
  <div className="notes">
    <Markdown
      disallowedElements={["img"]}
      unwrapDisallowed
      components={{
        a: ({ href, children }) => <a href={href} rel="noopener noreferrer">{children}</a>,
        h1: ({ children }) => <h3>{children}</h3>,
        h2: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h3>{children}</h3>,
      }}
    >
      {leadIns(body)}
    </Markdown>
  </div>
);
