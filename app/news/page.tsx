import type { Metadata } from "next";
import { ProgramSubpage } from "@/components/layout/ProgramSubpage";
import { getProgramPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = getProgramPageMetadata("news");

export default function NewsPage() {
  return <ProgramSubpage slug="news" />;
}
