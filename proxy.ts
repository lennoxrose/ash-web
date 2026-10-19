import { NextResponse, type NextRequest } from "next/server";

const CLI = /^(curl\/|Wget\/|HTTPie)/;

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/teapot") return NextResponse.rewrite(new URL("/teapot-418", req.url), { status: 418 });
  // "/" differs by User-Agent: terminals get plain text, everything else (browsers, link-preview bots) gets the HTML page.
  const res = CLI.test(req.headers.get("user-agent") ?? "") ? NextResponse.rewrite(new URL("/curl.txt", req.url)) : NextResponse.next();
  res.headers.append("Vary", "User-Agent");
  return res;
}

export const config = { matcher: ["/", "/teapot"] };
