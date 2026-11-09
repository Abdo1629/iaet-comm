import type { Metadata } from "next";
import { ProgramSubpage } from "@/components/layout/ProgramSubpage";
import { getProgramPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = getProgramPageMetadata("students");

export default function StudentsPage() {
  return <ProgramSubpage slug="students" />;
}
