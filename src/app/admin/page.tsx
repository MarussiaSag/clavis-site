import { updateSiteContent } from "@/app/actions";
import { CreateProjectForm } from "@/components/create-project-form";
import { SiteHeader } from "@/components/site-header";
import { prisma } from "@/lib/prisma";
import { ensureSeedData } from "@/lib/site-data";

export default async function AdminPage() {
  await ensureSeedData();
  const [content, projects, inquiries] = await Promise.all([
    prisma.siteContent.findUniqueOrThrow({ where: { id: 1 } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
  ]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="w-full space-y-12 px-6 py-14 md:px-10">
        <h1 className="text-5xl">Админка</h1>

        <section className="space-y-4">
          <h2 className="text-3xl">Контент страниц</h2>
          <form action={updateSiteContent} className="grid gap-4 border border-[#a38d83] p-6">
            <input
              name="heroTitle"
              defaultValue={content.heroTitle}
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
            <textarea
              name="heroSubtitle"
              defaultValue={content.heroSubtitle}
              rows={3}
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
            <input
              name="aboutTitle"
              defaultValue={content.aboutTitle}
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
            <textarea
              name="aboutText"
              defaultValue={content.aboutText}
              rows={4}
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
            <button className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a]">
              Сохранить контент
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl">Добавить проект</h2>
          <CreateProjectForm />
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl">Последние заявки</h2>
          <div className="space-y-3">
            {inquiries.length === 0 ? (
              <p className="text-[#4d131a]/80">Пока заявок нет.</p>
            ) : (
              inquiries.map((inquiry) => (
                <article key={inquiry.id} className="space-y-1 border border-[#a38d83] p-4">
                  <p className="font-semibold">{inquiry.name}</p>
                  <p className="text-sm text-[#4d131a]/80">{inquiry.email}</p>
                  {inquiry.phone ? <p className="text-sm text-[#4d131a]/80">{inquiry.phone}</p> : null}
                  <p>{inquiry.message}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl">Все проекты</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="border border-[#a38d83] p-4">
                <p className="text-xl">{project.title}</p>
                <p className="text-sm uppercase tracking-[0.15em] text-[#4d131a]/80">
                  {project.slug}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
