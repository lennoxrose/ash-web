import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";
export const dynamic = "force-static";
export default (): MetadataRoute.Sitemap => ["/", "/ecosystem", "/releases", "/commits"].map((p) => ({ url: `${SITE_URL}${p}` }));
