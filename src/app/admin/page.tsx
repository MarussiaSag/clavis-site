import Link from "next/link";
import { adminLogoutAction } from "@/app/actions/auth";
import { updateSiteContent } from "@/app/actions";
import { CreateBlogPostForm } from "@/components/create-blog-post-form";
import { CreateProjectForm } from "@/components/create-project-form";
import { DeleteBlogPostButton } from "@/components/delete-blog-post-button";
import { SiteHeader } from "@/components/site-header";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { ensureBlogSeedData, formatBlogDate } from "@/lib/blog-posts";
import { ensureSeedData } from "@/lib/site-data";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  await ensureSeedData();
  await ensureBlogSeedData();
  const [content, projects, blogPosts, inquiries] = await Promise.all([
    prisma.siteContent.findUniqueOrThrow({ where: { id: 1 } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
  ]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="w-full space-y-12 px-6 py-14 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-5xl">Админка</h1>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="border border-[#a38d83] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#4d131a] transition-colors hover:border-[#4d131a]"
            >
              Выйти
            </button>
          </form>
        </div>

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
          <h2 className="text-3xl">Добавить статью в блог</h2>
          <CreateBlogPostForm />
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
          <h2 className="text-3xl">Все статьи</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col gap-4 border border-[#a38d83] p-4">
                <div>
                  <p className="text-xl">{post.title}</p>
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
