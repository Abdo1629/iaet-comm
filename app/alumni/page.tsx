import type { Metadata } from "next";
import { ProgramSubpage } from "@/components/layout/ProgramSubpage";
import { getProgramPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = getProgramPageMetadata("alumni");

export default function AlumniPage() {
  return <ProgramSubpage slug="alumni" />;
}
