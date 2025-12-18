import type { MetadataRoute } from "next";
import { siteMeta } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const meta = siteMeta();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${meta.url}/sitemap.xml`,
  };
}