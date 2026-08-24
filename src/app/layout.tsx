import type { Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContact } from "@/lib/site-contact";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata = siteMetadata;
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getSiteContact();

  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(contact), websiteJsonLd()]} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
