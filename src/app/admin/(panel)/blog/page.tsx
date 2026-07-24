import Link from "next/link";
import { CreateBlogPostForm } from "@/components/create-blog-post-form";
import { DeleteBlogPostButton } from "@/components/delete-blog-post-button";
import { AdminPageHeader } from "@/components/admin-panel-shell";
import { ensureBlogSeedData, formatBlogDate } from "@/lib/blog-posts";
import { prisma } from "@/lib/prisma";

export default async function AdminBlogPage() {
  await ensureBlogSeedData();
  const blogPosts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <>
      <AdminPageHeader
        title="Статьи"
        description="Добавление и редактирование материалов блога."
      />
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#151210]">Добавить статью</h2>
        <CreateBlogPostForm />
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#151210]">Все статьи</h2>
        {blogPosts.length === 0 ? (
          <p className="text-[#4d131a]/80">Пока статей нет.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col gap-4 border border-[#a38d83] bg-white/40 p-4">
                <div>
                  <p className="text-xl text-[#151210]">{post.title}</p>
                  <p className="text-sm uppercase tracking-[0.15em] text-[#4d131a]/80">{post.slug}</p>
                  <p className="mt-2 text-sm text-[#4d131a]/75">
                    {formatBlogDate(post.publishedAt.toISOString().slice(0, 10))}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="border border-[#a38d83] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#4d131a] transition-colors hover:border-[#4d131a]"
                  >
                    Редактировать
                  </Link>
                  <DeleteBlogPostButton id={post.id} title={post.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
