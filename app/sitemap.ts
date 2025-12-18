import type { MetadataRoute } from "next";
import { siteMeta, TOOL_ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const meta = siteMeta();
  const now = new Date();

  return TOOL_ROUTES.map((r) => ({
    url: `${meta.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.path === "/" ? "weekly" : "monthly",
    priority: r.priority,
  }));
}