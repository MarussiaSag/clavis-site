import { AdminPanelShell } from "@/components/admin-panel-shell";
import { AdminSiteBasicsForm } from "@/components/admin-site-basics-form";
import { getSiteContact } from "@/lib/site-contact";

export default async function AdminBasicsPage() {
  const contact = await getSiteContact();

  return (
    <AdminPanelShell
      title="Основные данные"
      description="Телефон, почта, адрес и социальные сети — используются по всему сайту."
    >
      <AdminSiteBasicsForm
        initial={{
          city: contact.city,
          address: contact.address,
          mapUrl: contact.mapUrl,
          phone: contact.phone,
          email: contact.email,
          tagline: contact.tagline,
          hoursWeekdays: contact.workingHours.weekdays,
          hoursWeekend: contact.workingHours.weekend,
          instagramFootnote: contact.instagramFootnote,
          socialLinks: contact.socialLinks,
        }}
      />
    </AdminPanelShell>
  );
}
