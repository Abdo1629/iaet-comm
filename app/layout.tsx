import type { Metadata } from "next";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Electronics & Communications Engineering | IAET",
  description:
    "Explore the Electronics & Communications Engineering Program at the Institute of Aviation Engineering & Technology.",
  applicationName: "IAET · Electronics & Communications",
  openGraph: {
    title: "Electronics & Communications Engineering | IAET",
    description: "The Electronics & Communications Engineering Program at IAET.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
