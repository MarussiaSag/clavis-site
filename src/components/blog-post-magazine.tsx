import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import { formatBlogDate } from "@/lib/blog-posts";

type BlogPostMagazineProps = {
  post: BlogPost;
  gallery: string[];
};

function BlogTitle({ title }: { title: string }) {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return <>{title}</>;

  const before = title.slice(0, colonIndex + 1);
  const after = title.slice(colonIndex + 1).trimStart();
  if (!after) return <>{title}</>;

  return (
    <>
      {before}{" "}
      <em className="font-normal italic">{after}</em>
    </>
  );
}

export function BlogPostMagazine({ post, gallery }: BlogPostMagazineProps) {
  const showGallery = gallery.length > 0;
  const bodyParagraphs = post.content.length > 0 ? post.content : [post.excerpt];

  return (
    <article className="bg-[#f5f2ea]">
      <header className="mx-auto max-w-[1440px] px-6 pt-6 md:px-10 md:pt-8 lg:px-12">
        <Link
          href="/blog"
          className="inline-flex text-[11px] uppercase tracking-[0.24em] text-[#6a6a6a] transition-colors duration-300 hover:text-[#141414]"
        >
          ← Все статьи
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-[#8a8a8a] md:mt-10">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} мин чтения</span>
        </div>

        <h1 className="mt-4 max-w-3xl font-serif text-[1.75rem] font-normal leading-[1.18] tracking-[-0.02em] text-[#151210] md:mt-5 md:text-[2.1rem] lg:text-[2.35rem] lg:leading-[1.15]">
          <BlogTitle title={post.title} />
        </h1>
      </header>

      <section className="bg-[#f5f2ea]" aria-label="Разворот статьи">
        <div className="mx-auto max-w-[1440px] px-6 pb-6 pt-8 md:px-10 md:pb-8 md:pt-10 lg:px-12 lg:pb-8 lg:pt-12">
          <div className="grid items-stretch gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-16 xl:gap-20">
            <div className="flex h-full flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e2dc] md:aspect-[5/4]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-center"
                  quality={90}
                />
              </div>

              <p
                aria-hidden
                className="mt-8 text-center text-[13px] font-medium tracking-[0.08em] text-[#b07d55] md:mt-auto md:pt-8"
              >
                01
              </p>
            </div>

            <div className="flex h-full flex-col">
              <div className="space-y-6 md:space-y-7">
                {post.excerpt ? (
                  <p className="text-[15px] leading-[1.8] text-[#3a3530] md:text-[16px] md:leading-[1.85]">
                    {post.excerpt}
                  </p>
                ) : null}
                {bodyParagraphs.map((text) => (
                  <p
                    key={text}
                    className="text-[15px] leading-[1.8] text-[#3a3530] md:text-[16px] md:leading-[1.85]"
                  >
                    {text}
                  </p>
                ))}
              </div>

              <p
                aria-hidden
                className="mt-8 text-center text-[13px] font-medium tracking-[0.08em] text-[#b07d55] md:mt-auto md:pt-8"
              >
                02
              </p>
            </div>
          </div>
        </div>
      </section>

      {showGallery ? (
        <section
          aria-label="Мини-галерея статьи"
          className="mx-auto max-w-[1440px] px-6 pb-14 pt-2 md:px-10 md:pb-16 md:pt-4 lg:px-12"
        >
          <ul className="grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5">
            {gallery.map((src) => (
              <li key={src} className="relative aspect-[4/5] overflow-hidden bg-[#e8e2dc]">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                  quality={86}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="pb-14 md:pb-16" />
      )}
    </article>
  );
}
