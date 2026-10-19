import { readFileSync } from "node:fs";
import { join } from "node:path";
import { text } from "../ascii";

export const dynamic = "force-static";
// The script's source lives in install/install.sh so it can be linted and read on GitHub.
export const GET = () => text(readFileSync(join(process.cwd(), "install/install.sh"), "utf8"));
