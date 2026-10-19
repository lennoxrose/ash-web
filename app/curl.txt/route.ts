import { curlPage, text } from "../ascii";

export const dynamic = "force-static";
export const GET = () => text(curlPage());
