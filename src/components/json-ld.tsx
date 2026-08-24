import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site-metadata";
import type { SiteContact } from "@/lib/site-contact";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(contact: SiteContact) {
  const sameAs = contact.socialLinks
    .map((item) => item.href.trim())
    .filter((href) => /^https?:\/\//i.test(href));

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logos/svg/full-logo.svg"),
    image: absoluteUrl("/media/showcase-hero.jpg"),
    description: contact.tagline,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: contact.city,
      addressCountry: "RU",
    },
    areaServed: {
      "@type": "City",
      name: contact.city,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ru-RU",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function projectJsonLd(project: {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  location: string;
  year: number;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/portfolio/${project.slug}`),
    image: absoluteUrl(project.coverImage),
    dateCreated: String(project.year),
    genre: project.category,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    creator: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "ru-RU",
  };
}
