import Link from "next/link";
import { BlogPostCard } from "@/components/blog-post-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { fullWidthSectionHeader, fullWidthSectionX, homeCardGridGap, sectionContentGap } from "@/lib/home-layout";
import { getBlogPosts } from "@/lib/blog-posts";

const HOME_BLOG_LIMIT = 4;

export async function HomeBlogSection() {
  const posts = await getBlogPosts(HOME_BLOG_LIMIT);

  return (
    <section className="border-b border-[#2a2a2a] bg-[#141414]" aria-labelledby="home-blog-heading">
      <div className={fullWidthSectionHeader}>
        <RevealOnScroll once>
          <div className="ui-header">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p id="home-blog-heading" className="ui-eyebrow text-white/45">
                Блог
              </p>
              <Link href="/blog" className="ui-link text-white/70 hover:text-white">
                Посмотреть статьи
              </Link>
            </div>
            <h2 className="font-serif text-[2.25rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#f1ece7] md:text-[2.75rem] lg:text-[3.1rem] lg:leading-[1.1]">
              Идеи и вдохновение
              <br />
              <em className="font-normal italic">для вашего интерьера</em>
            </h2>
          </div>
        </RevealOnScroll>
      </div>

      <div className={`${sectionContentGap} ${fullWidthSectionX} pb-12 md:pb-16`}>
        <RevealOnScroll once>
          <div className={`grid ${homeCardGridGap} sm:grid-cols-2 lg:grid-cols-4`}>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} variant="dark" layout="home" />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
