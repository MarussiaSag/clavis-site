import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import { formatBlogDate } from "@/lib/blog-posts";

type BlogPostMagazineProps = {
  post: BlogPost;
  gallery: string[];
};

function splitContent(paragraphs: string[]) {
  if (paragraphs.length <= 1) {
    return { first: paragraphs, second: [] as string[] };
  }
  if (paragraphs.length === 2) {
    return { first: [paragraphs[0]], second: [paragraphs[1]] };
  }
  const mid = Math.ceil(paragraphs.length / 2);
  return {
    first: paragraphs.slice(0, mid),
    second: paragraphs.slice(mid),
  };
}

export function BlogPostMagazine({ post, gallery }: BlogPostMagazineProps) {
  const { first, second } = splitContent(post.content);
  const spreadTwoImage = gallery[0] ?? post.coverImage;
  const showGallery = gallery.length > 0;

  return (
    <article className="bg-[#f5f2ea]">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 md:px-6 md:pt-8 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex text-[11px] uppercase tracking-[0.24em] text-[#6a6a6a] transition-colors duration-300 hover:text-[#141414]"
        >
          ← Все статьи
        </Link>
      </div>

      {/* Spread 01 */}
      <section
        aria-label="Разворот 01"
        className="mx-auto mt-6 grid w-full max-w-[1440px] md:mt-8 md:min-h-[78vh] md:grid-cols-2"
      >
        <figure className="relative aspect-[4/5] overflow-hidden bg-[#e8e2dc] md:aspect-auto md:min-h-[78vh]">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            quality={90}
          />
          <figcaption className="sr-only">Иллюстрация к статье</figcaption>
        </figure>

        <div className="flex flex-col justify-between border-t border-[#d4cdc4] px-6 py-10 md:border-l md:border-t-0 md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#b07d55] md:text-xs">
                Блог
              </p>
              <p
                aria-hidden
                className="font-serif text-5xl leading-none tracking-[-0.04em] text-[#cfc7be] md:text-6xl lg:text-7xl"
              >
                01
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-[#8a8a8a]">
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} мин чтения</span>
            </div>

            <h1 className="mt-5 max-w-xl font-serif text-[2.15rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#151210] md:mt-6 md:text-[2.65rem] lg:text-[3.1rem] lg:leading-[1.08]">
              {post.title}
            </h1>

            <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-[#5c5c5c] md:mt-6 md:text-base md:leading-[1.72]">
              {post.excerpt}
            </p>
          </div>

          {first.length > 0 ? (
            <div className="mt-10 space-y-5 text-[15px] leading-[1.78] text-[#2a2420]/90 md:mt-12 md:text-[15px] md:leading-[1.8] lg:text-base">
              {first.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Spread 02 */}
      {(second.length > 0 || spreadTwoImage) && (
        <section
          aria-label="Разворот 02"
          className="mx-auto mt-3 grid w-full max-w-[1440px] md:mt-4 md:min-h-[72vh] md:grid-cols-2"
        >
          <figure className="relative order-1 aspect-[4/5] overflow-hidden bg-[#e8e2dc] md:order-none md:aspect-auto md:min-h-[72vh]">
            <Image
              src={spreadTwoImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover ${gallery[0] ? "object-center" : "object-right"}`}
              quality={90}
            />
            <figcaption className="sr-only">Продолжение иллюстраций</figcaption>
          </figure>

          <div className="order-2 flex flex-col justify-between border-t border-[#d4cdc4] px-6 py-10 md:order-none md:border-l md:border-t-0 md:px-10 md:py-12 lg:px-14 lg:py-14">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#8a8a8a] md:text-xs">
                Продолжение
              </p>
              <p
                aria-hidden
                className="font-serif text-5xl leading-none tracking-[-0.04em] text-[#cfc7be] md:text-6xl lg:text-7xl"
              >
                02
              </p>
            </div>

            {second.length > 0 ? (
              <div className="mt-10 space-y-5 text-[15px] leading-[1.78] text-[#2a2420]/90 md:mt-0 md:text-[15px] md:leading-[1.8] lg:text-base">
                {second.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="mt-10 max-w-md font-serif text-2xl italic leading-snug text-[#6a6a6a] md:mt-0 md:text-3xl">
                {post.excerpt}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      {showGallery ? (
        <section
          aria-label="Галерея статьи"
          className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-10 md:px-6 md:pb-20 md:pt-14 lg:px-8"
        >
          <header className="mb-6 flex items-end justify-between gap-4 md:mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#b07d55] md:text-xs">
              Галерея
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a8a8a]">
              {gallery.length} {gallery.length === 1 ? "кадр" : gallery.length < 5 ? "кадра" : "кадров"}
            </p>
          </header>

          <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {gallery.map((src, index) => (
              <li
                key={src}
                className={`relative overflow-hidden bg-[#e8e2dc] ${
                  index === 0 && gallery.length > 2
                    ? "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10] lg:col-span-2"
                    : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  quality={88}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="pb-14 md:pb-20" />
      )}
    </article>
  );
}
