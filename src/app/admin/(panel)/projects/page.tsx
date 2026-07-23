import Link from "next/link";
import { CreateProjectForm } from "@/components/create-project-form";
import { AdminPanelShell } from "@/components/admin-panel-shell";
import { prisma } from "@/lib/prisma";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminPanelShell
      title="Проекты"
      description="Карточка проекта: основная информация, тексты страницы, помещения, материалы и команда."
    >
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#151210]">Добавить проект</h2>
        <CreateProjectForm />
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#151210]">Все проекты</h2>
        {projects.length === 0 ? (
          <p className="text-[#4d131a]/80">Пока проектов нет.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="border border-[#a38d83] bg-white/40 p-4">
                <p className="text-xl text-[#151210]">{project.title}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.15em] text-[#4d131a]/80">
                  {project.slug}
                </p>
                <p className="mt-2 text-sm text-[#6a6a6a]">
                  {project.category} · {project.location} · {project.year}
                  {project.areaLabel ? ` · ${project.areaLabel}` : ""}
                </p>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="mt-4 inline-flex text-[11px] font-medium uppercase tracking-[0.18em] text-[#751f26] transition-colors hover:text-[#3d0d0a]"
                >
                  Редактировать →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </AdminPanelShell>
  );
}
