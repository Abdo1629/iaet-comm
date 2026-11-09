import type { Metadata } from "next";
import { ProgramSubpage } from "@/components/layout/ProgramSubpage";
import { getProgramPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = getProgramPageMetadata("research");

export default function ResearchPage() {
  return <ProgramSubpage slug="research" />;
}
