import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";
export const dynamic = "force-static";
export default (): MetadataRoute.Robots => ({ rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` });
