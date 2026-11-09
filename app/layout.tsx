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
    "Official bilingual information hub for the Electronics & Communications Engineering Program at the Institute of Aviation Engineering & Technology, IAET.",
  applicationName: "IAET · Electronics & Communications",
  keywords: [
    "IAET",
    "Institute of Aviation Engineering and Technology",
    "Electronics and Communications Engineering",
    "Electronics Engineering",
    "Communications Engineering",
    "معهد هندسة وتكنولوجيا الطيران",
    "هندسة الإلكترونيات والاتصالات",
  ],
  robots: { index: true, follow: true, maxImagePreview: "large" },
  openGraph: {
    title: "Electronics & Communications Engineering | IAET",
    description: "Explore the academic program, faculty, laboratories, research, student resources and official department information at IAET.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    siteName: "IAET · Electronics & Communications",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electronics & Communications Engineering | IAET",
    description: "Official program information and academic resources from IAET.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Institute of Aviation Engineering & Technology",
  alternateName: "معهد هندسة وتكنولوجيا الطيران",
  url: "https://www.iaet.edu.eg/",
  email: "info@iaet.edu.eg",
  telephone: "+20233594060",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Matar, Imbaba",
    addressLocality: "Giza",
    addressCountry: "EG",
  },
  department: {
    "@type": "EducationalOrganization",
    name: "Electronics & Communications Engineering Program",
    alternateName: "برنامج هندسة الإلكترونيات والاتصالات",
    url: "https://www.iaet.edu.eg/comm",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
