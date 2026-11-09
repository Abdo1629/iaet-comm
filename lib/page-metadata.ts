import type { Metadata } from "next";
import { sitePages, type SitePageSlug } from "@/data/site-pages";

export function getProgramPageMetadata(slug: SitePageSlug): Metadata {
  const page = sitePages[slug].en;
  return {
    title: page.title,
    description: page.description,
    keywords: [
      "IAET",
      "Institute of Aviation Engineering and Technology",
      "Electronics and Communications Engineering",
      "Electronics Engineering",
      "Communications Engineering",
      page.title,
    ],
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      title: page.title + " | IAET",
      description: page.description,
      siteName: "IAET · Electronics & Communications Engineering",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title + " | IAET",
      description: page.description,
    },
  };
}
