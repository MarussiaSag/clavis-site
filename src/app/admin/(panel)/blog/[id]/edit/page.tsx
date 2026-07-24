import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteBlogPostButton } from "@/components/delete-blog-post-button";
import { EditBlogPostForm } from "@/components/edit-blog-post-form";
import { AdminPanelShell } from "@/components/admin-panel-shell";
import { listBlogGalleryImages } from "@/lib/blog-files";
import { prisma } from "@/lib/prisma";

type AdminEditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditBlogPostPage({ params }: AdminEditBlogPostPageProps) {
  const { id: idRaw } = await params;
  const id = Number(idRaw);
  if (!Number.isFinite(id) || id < 1) notFound();

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const galleryImages = listBlogGalleryImages(post.slug, post.coverImage);

  return (
    <AdminPanelShell title="Редактировать статью" description={post.title}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/blog"
          className="text-xs uppercase tracking-[0.2em] text-[#4d131a]/75 transition-colors hover:text-[#4d131a]"
        >
          ← Назад к статьям
        </Link>
        <DeleteBlogPostButton id={post.id} title={post.title} />
      </div>

      <EditBlogPostForm post={post} galleryImages={galleryImages} />
    </AdminPanelShell>
  );
}
