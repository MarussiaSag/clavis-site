import type { Metadata } from "next";
import { ContactsFormSection } from "@/components/contacts-form-section";
import { ContactsHeroSection } from "@/components/contacts-hero-section";
import { ContactsInfoGrid } from "@/components/contacts-info-grid";
import { SiteHeader } from "@/components/site-header";
import { getSiteImages } from "@/lib/site-images";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Контакты",
  description:
    "Свяжитесь со студией дизайна интерьера Clavis в Москве: телефон, email, адрес и форма заявки на консультацию.",
  path: "/contacts",
  image: "/media/services-gallery-2.jpg",
});

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
