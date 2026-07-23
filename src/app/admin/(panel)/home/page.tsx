import { AdminPanelShell } from "@/components/admin-panel-shell";
import { AdminStudioHighlightsForm } from "@/components/admin-studio-highlights-form";
import { getStudioHighlights, MAX_STUDIO_HIGHLIGHTS } from "@/lib/home-studio-highlights";

export default async function AdminHomePage() {
  const highlights = await getStudioHighlights();

  return (
    <AdminPanelShell
      title="Главная"
      description="Ключевые факты о студии на главной странице."
    >
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl text-[#151210]">Ключевые факты о студии</h2>
          <p className="text-sm text-[#6a6a6a]">
            Блок под шапкой на главной. Максимум {MAX_STUDIO_HIGHLIGHTS} факта.
          </p>
        </div>
        <AdminStudioHighlightsForm
          initial={highlights
            .filter((item): item is { id: number; title: string; description: string } => item.id != null)
            .map((item) => ({ id: item.id, title: item.title, description: item.description }))}
        />
      </section>
    </AdminPanelShell>
  );
}
