import { headers } from "next/headers";
import ErrorView from "./error-view";

export const metadata = { title: "404: cannot find route" };

export default async function NotFound() {
  const path = ((await headers()).get("x-pathname") ?? "/").slice(0, 80);
  return <ErrorView path={path} />;
}
