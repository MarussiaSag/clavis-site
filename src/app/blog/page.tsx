import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { BlogPostCard } from "@/components/blog-post-card";
import { sectionContainer, sectionContentGap } from "@/lib/home-layout";
import { getBlogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статьи студии Clavis об интерьере: тренды, свет, планировка, материалы и сопровождение ремонта под ключ.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <SiteHeader />
      <main className="w-full pb-14 md:pb-20">
        <section className="border-b border-[#a38d83] bg-white">
          <div className={sectionContainer}>
            <div className="ui-header max-w-3xl">
              <p className="ui-eyebrow text-[#8a8a8a]">Идеи и вдохновение</p>
              <h1 className="ui-title text-[#141414]">Блог студии</h1>
              <p className="ui-body">
                Материалы о проектировании интерьера, выборе отделки и организации ремонта — от команды
                Clavis.
              </p>
            </div>
          </div>
        </section>

        <section className={sectionContainer}>
          <div className={`${sectionContentGap} grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8`}>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
