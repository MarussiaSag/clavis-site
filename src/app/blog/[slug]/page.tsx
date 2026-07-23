import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostMagazine } from "@/components/blog-post-magazine";
import { SiteHeader } from "@/components/site-header";
import { listBlogGalleryImages } from "@/lib/blog-files";
import {
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

  const gallery = listBlogGalleryImages(slug, post.coverImage);

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      <SiteHeader />
      <main className="w-full">
        <BlogPostMagazine post={post} gallery={gallery} />
      </main>
    </div>
  );
}
