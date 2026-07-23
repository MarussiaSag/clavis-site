import { ContactsFormSection } from "@/components/contacts-form-section";
import { ContactsHeroSection } from "@/components/contacts-hero-section";
import { ContactsInfoGrid } from "@/components/contacts-info-grid";
import { SiteHeader } from "@/components/site-header";
import { getSiteImages } from "@/lib/site-images";

export default async function ContactsPage() {
  const images = await getSiteImages();

  return (
    <div className="min-h-screen bg-[#f5f1eb]">
      <SiteHeader variant="contacts" />
      <main>
        <ContactsHeroSection imageSrc={images["contacts.hero"]} />
        <ContactsInfoGrid />
        <ContactsFormSection consultationImageSrc={images["contacts.form"]} />
      </main>
    </div>
  );
}
