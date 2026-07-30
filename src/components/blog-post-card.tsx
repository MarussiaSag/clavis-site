import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import { formatBlogDate } from "@/lib/blog-posts";

type BlogPostCardProps = {
  post: BlogPost;
  variant?: "light" | "dark";
  layout?: "default" | "home";
};

export function BlogPostCard({ post, variant = "light", layout = "default" }: BlogPostCardProps) {
  const isDark = variant === "dark";

  if (layout === "home") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="overflow-hidden rounded-md border border-[#5c2a2e] transition-colors duration-300 group-hover:border-[#f1ece7]/50">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#5a2528]">
            <div
              className="premium-photo h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
          </div>
          <div className="bg-[#4d131a] px-5 py-5 transition-colors duration-300 group-hover:bg-white md:px-6 md:py-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#f1ece7] transition-colors duration-300 group-hover:text-[#141414] md:text-base">
                {post.title}
              </h3>
              <time
                dateTime={post.publishedAt}
                className="text-[10px] uppercase tracking-[0.24em] text-white/45 transition-colors duration-300 group-hover:text-[#6a6a6a] md:text-[11px] md:tracking-[0.28em]"
              >
                {formatBlogDate(post.publishedAt)}
              </time>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="space-y-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[#5a2528]">
          <div
            className="premium-photo h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
        </div>

        <div className="space-y-2">
          <time
            dateTime={post.publishedAt}
            className={`ui-eyebrow ${isDark ? "text-white/45" : "text-[#6a6a6a]"}`}
          >
            {formatBlogDate(post.publishedAt)}
          </time>
          <h3
            className={`text-base font-semibold leading-snug transition-colors duration-300 ${
              isDark
                ? "text-white group-hover:text-[#e7d8d1]"
                : "text-[#141414] group-hover:text-[#4d131a]"
            }`}
          >
            {post.title}
          </h3>
          <p className={`ui-body-sm line-clamp-2 ${isDark ? "text-white/60" : ""}`}>
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
