import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getBlogPosts,
} from "@/lib/blog-posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Статья не найдена" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <SiteHeader />
      <main className="w-full pb-14 md:pb-20">
        <article>
          <header className="border-b border-[#a38d83] bg-white">
            <div className="mx-auto max-w-[860px] px-6 py-14 md:px-10 md:py-16">
              <Link
                href="/blog"
                className="text-[11px] uppercase tracking-[0.24em] text-[#6a6a6a] transition-colors duration-300 hover:text-[#141414]"
              >
                ← Все статьи
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-[#8a8a8a]">
                <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} мин чтения</span>
              </div>
              <h1 className="mt-5 font-serif text-4xl leading-[1.06] tracking-[-0.02em] text-[#141414] md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 text-[16px] leading-[1.72] text-[#5c5c5c] md:text-lg md:leading-[1.75]">
                {post.excerpt}
              </p>
            </div>
          </header>

          <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden bg-[#e8e8e8]">
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
          </div>

          <div className="mx-auto max-w-[860px] px-6 py-12 md:px-10 md:py-16">
            <div className="space-y-6 text-[15px] leading-[1.78] text-[#2a2420]/92 md:text-base md:leading-[1.8]">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
