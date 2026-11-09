import type { Metadata } from "next";
import { ProgramSubpage } from "@/components/layout/ProgramSubpage";
import { getProgramPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = getProgramPageMetadata("contact");

export default function ContactPage() {
  return <ProgramSubpage slug="contact" />;
}
