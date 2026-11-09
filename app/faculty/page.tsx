import type { Metadata } from "next";
import { ProgramSubpage } from "@/components/layout/ProgramSubpage";
import { getProgramPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = getProgramPageMetadata("faculty");

export default function FacultyPage() {
  return <ProgramSubpage slug="faculty" />;
}
