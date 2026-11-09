import type { Metadata } from "next";
import { ProgramSubpage } from "@/components/layout/ProgramSubpage";
import { getProgramPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = getProgramPageMetadata("laboratories");

export default function LaboratoriesPage() {
  return <ProgramSubpage slug="laboratories" />;
}
