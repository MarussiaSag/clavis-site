import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { BlogPostCard } from "@/components/blog-post-card";
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
        <section>
          <div className="mx-auto w-full max-w-[1180px] px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
            <p className="ui-eyebrow text-[#8a8a8a]">Блог</p>
            <div className="mt-4 grid gap-6 md:mt-6 md:grid-cols-2 md:items-end md:gap-12 lg:gap-16">
              <h1 className="font-serif text-[2.25rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#141414] md:text-[2.75rem] lg:text-[3.1rem] lg:leading-[1.1]">
                Идеи и вдохновение
                <br />
                <em className="font-normal italic">для вашего интерьера</em>
              </h1>
              <p className="ui-body md:max-w-md md:justify-self-end md:text-right">
                Материалы о проектировании интерьера, выборе отделки и организации ремонта — от команды
                Clavis.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-10 md:px-10 md:pt-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
