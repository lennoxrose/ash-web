import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";
export const dynamic = "force-static";
export default (): MetadataRoute.Sitemap => [{ url: `${SITE_URL}/` }];
