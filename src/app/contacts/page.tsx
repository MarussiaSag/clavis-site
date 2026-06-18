import { ContactsFormSection } from "@/components/contacts-form-section";
import { ContactsHeroSection } from "@/components/contacts-hero-section";
import { ContactsInfoGrid } from "@/components/contacts-info-grid";
import { SiteHeader } from "@/components/site-header";

const HERO_IMAGE = "/zil/12.jpg";
const CONSULTATION_IMAGE = "/chaveta/27.jpg";

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-[#f5f1eb]">
      <SiteHeader variant="contacts" />
      <main>
        <ContactsHeroSection imageSrc={HERO_IMAGE} />
        <ContactsInfoGrid />
        <ContactsFormSection consultationImageSrc={CONSULTATION_IMAGE} />
      </main>
    </div>
  );
}
