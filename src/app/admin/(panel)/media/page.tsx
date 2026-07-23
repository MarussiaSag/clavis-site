import { AdminPanelShell } from "@/components/admin-panel-shell";
import { AdminSiteImagesForm } from "@/components/admin-site-images-form";
import { getSiteImages } from "@/lib/site-images";

export default async function AdminMediaPage() {
  const images = await getSiteImages();

  return (
    <AdminPanelShell
      title="Медиа сайта"
      description="Картинки страниц, которые не относятся к проектам: главная, о нас, услуги, контакты."
    >
      <AdminSiteImagesForm initial={images} />
    </AdminPanelShell>
  );
}
