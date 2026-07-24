import { AdminPageHeader } from "@/components/admin-panel-shell";
import { AdminAboutStudioPeopleForm } from "@/components/admin-about-studio-people-form";
import { getAboutStudioPeople, MAX_ABOUT_STUDIO_PEOPLE } from "@/lib/about-studio-people";

export default async function AdminAboutPage() {
  const data = await getAboutStudioPeople();

  return (
    <>
      <AdminPageHeader
        title="О студии"
        description="Блок «Люди студии» на странице «О нас»: общее фото и список команды."
      />
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl text-[#151210]">Люди студии</h2>
          <p className="text-sm text-[#6a6a6a]">
            Одно общее фото и до {MAX_ABOUT_STUDIO_PEOPLE} человек с фамилией, должностью и
            компетенциями.
          </p>
        </div>
        <AdminAboutStudioPeopleForm
          key={`${data.teamPhoto}-${data.people.map((person) => person.id).join("-")}`}
          initial={{
            teamPhoto: data.teamPhoto,
            people: data.people
              .filter(
                (item): item is { id: number; name: string; role: string; competencies: string } =>
                  item.id != null,
              )
              .map((item) => ({
                id: item.id,
                name: item.name,
                role: item.role,
                competencies: item.competencies,
              })),
          }}
        />
      </section>
    </>
  );
}
