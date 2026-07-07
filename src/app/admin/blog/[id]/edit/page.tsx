import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { DeleteBlogPostButton } from "@/components/delete-blog-post-button";
import { EditBlogPostForm } from "@/components/edit-blog-post-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type AdminEditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditBlogPostPage({ params }: AdminEditBlogPostPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id: idRaw } = await params;
  const id = Number(idRaw);
  if (!Number.isFinite(id) || id < 1) notFound();

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="w-full space-y-8 px-6 py-14 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <Link
              href="/admin"
              className="text-xs uppercase tracking-[0.2em] text-[#4d131a]/75 transition-colors hover:text-[#4d131a]"
            >
              ← Назад в админку
            </Link>
            <h1 className="text-4xl">Редактировать статью</h1>
            <p className="text-sm text-[#4d131a]/80">{post.title}</p>
          </div>
          <DeleteBlogPostButton id={post.id} title={post.title} />
        </div>

        <EditBlogPostForm post={post} />
      </main>
    </div>
  );
}
