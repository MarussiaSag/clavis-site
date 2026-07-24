import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProjectAction } from "@/app/actions";
import { AdminPageHeader } from "@/components/admin-panel-shell";
import { AdminProjectForm } from "@/components/admin-project-form";
import { prisma } from "@/lib/prisma";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id: idRaw } = await params;
  const id = Number(idRaw);
  if (!Number.isFinite(id) || id <= 0) notFound();

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <>
      <AdminPageHeader title={project.title} description={`Редактирование · ${project.slug}`} />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/projects"
          className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6a6a6a] transition-colors hover:text-[#151210]"
        >
          ← Ко всем проектам
        </Link>
        <form action={deleteProjectAction}>
          <input type="hidden" name="id" value={project.id} />
          <button
            type="submit"
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#751f26] transition-colors hover:text-[#3d0d0a]"
          >
            Удалить проект
          </button>
        </form>
      </div>
      <AdminProjectForm mode="edit" project={project} />
    </>
  );
}
