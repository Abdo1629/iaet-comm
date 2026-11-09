import type { MetadataRoute } from "next";
import { pageSlugs } from "@/data/site-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];

  const paths = ["/", "/navigation", ...pageSlugs.map((slug) => "/" + slug)];
  return paths.map((path) => ({
    url: siteUrl + path,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/navigation" ? 0.5 : 0.8,
  }));
}
