"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedBlogCover } from "@/lib/blog-files";
import { parseBlogContent, serializeBlogContent } from "@/lib/blog-posts";
import { sanitizeProjectSlug, saveUploadedProjectPhotos } from "@/lib/project-files";

export async function createInquiry(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return;
  }

  await prisma.inquiry.create({
    data: { name, email, phone: phone || null, message },
  });

  revalidatePath("/contacts");
  revalidatePath("/admin");
}

export type CreateProjectState = { error?: string } | null;

export async function createProjectAction(
  _prevState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const year = Number(formData.get("year") ?? 0);
  const fallbackCoverUrl = String(formData.get("coverImage") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const heroOrderRaw = Number(formData.get("heroOrder") ?? 0);

  const slug = sanitizeProjectSlug(slugRaw);
  const showOnHero = formData.get("showOnHero") === "on";
  const heroOrder = Number.isFinite(heroOrderRaw) ? Math.trunc(heroOrderRaw) : 0;

  if (!title || !slugRaw || !category || !location || !year || !description) {
    return { error: "Заполните все обязательные поля." };
  }

  if (!slug) {
    return {
      error: "Slug только латиница, цифры и дефисы (например zil-apartments). Не ставьте слеши.",
    };
  }

  const mainCandidate = formData.get("mainImage");
  const mainFile =
    mainCandidate instanceof File && mainCandidate.size > 0 ? mainCandidate : null;

  const galleryRaw = formData.getAll("gallery");
  const galleryFiles = galleryRaw.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0,
  );

  const saved = await saveUploadedProjectPhotos(
    slug,
    mainFile,
    galleryFiles,
    mainFile ? null : fallbackCoverUrl || null,
  );

  if (!saved.ok) {
    return { error: saved.message };
  }

  try {
    await prisma.project.create({
      data: {
        title,
        slug,
        category,
        location,
        year,
        coverImage: saved.coverUrl,
        description,
        showOnHero,
        heroOrder,
      },
    });
  } catch (e: unknown) {
    const code = typeof e === "object" && e !== null && "code" in e ? (e as { code?: string }).code : undefined;
    if (code === "P2002") {
      return { error: "Проект с таким slug уже существует. Выберите другой slug." };
    }
    throw e;
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export type CreateBlogPostState = { error?: string } | null;

function revalidateBlogPaths(slugs: string[]) {
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/");
  for (const slug of slugs) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
}

function parseBlogPostForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentRaw = String(formData.get("content") ?? "").trim();
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  const fallbackCoverUrl = String(formData.get("coverImage") ?? "").trim();
  const readingMinutesRaw = Number(formData.get("readingMinutes") ?? 5);

  const slug = sanitizeProjectSlug(slugRaw);
  const readingMinutes = Number.isFinite(readingMinutesRaw)
    ? Math.max(1, Math.trunc(readingMinutesRaw))
    : 5;
  const content = serializeBlogContent(parseBlogContent(contentRaw));
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;

  return {
    title,
    slugRaw,
    slug,
    excerpt,
    contentRaw,
    content,
    publishedAtRaw,
    publishedAt,
    fallbackCoverUrl,
    readingMinutes,
  };
}

export async function createBlogPostAction(
  _prevState: CreateBlogPostState,
  formData: FormData,
): Promise<CreateBlogPostState> {
  await requireAdmin();

  const {
    title,
    slugRaw,
    slug,
    excerpt,
    contentRaw,
    content,
    publishedAtRaw,
    publishedAt,
    fallbackCoverUrl,
    readingMinutes,
  } = parseBlogPostForm(formData);

  if (!title || !slugRaw || !excerpt || !contentRaw || !publishedAtRaw) {
    return { error: "Заполните все обязательные поля." };
  }

  if (!slug) {
    return {
      error: "Slug только латиница, цифры и дефисы (например svet-v-interere).",
    };
  }

  if (!publishedAt || Number.isNaN(publishedAt.getTime())) {
    return { error: "Укажите корректную дату публикации." };
  }

  const coverCandidate = formData.get("coverFile");
  const coverFile =
    coverCandidate instanceof File && coverCandidate.size > 0 ? coverCandidate : null;

  const saved = await saveUploadedBlogCover(
    slug,
    coverFile,
    coverFile ? null : fallbackCoverUrl || null,
  );

  if (!saved.ok) {
    return { error: saved.message };
  }

  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: saved.coverUrl,
        publishedAt,
        readingMinutes,
      },
    });
  } catch (e: unknown) {
    const code = typeof e === "object" && e !== null && "code" in e ? (e as { code?: string }).code : undefined;
    if (code === "P2002") {
      return { error: "Статья с таким slug уже существует. Выберите другой slug." };
    }
    throw e;
  }

  revalidateBlogPaths([slug]);
  redirect("/admin");
}

export type UpdateBlogPostState = { error?: string } | null;

export async function updateBlogPostAction(
  _prevState: UpdateBlogPostState,
  formData: FormData,
): Promise<UpdateBlogPostState> {
  await requireAdmin();

  const id = Number(formData.get("id") ?? 0);
  if (!Number.isFinite(id) || id < 1) {
    return { error: "Некорректный идентификатор статьи." };
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Статья не найдена." };
  }

  const {
    title,
    slugRaw,
    slug,
    excerpt,
    contentRaw,
    content,
    publishedAtRaw,
    publishedAt,
    fallbackCoverUrl,
    readingMinutes,
  } = parseBlogPostForm(formData);

  if (!title || !slugRaw || !excerpt || !contentRaw || !publishedAtRaw) {
    return { error: "Заполните все обязательные поля." };
  }

  if (!slug) {
    return {
      error: "Slug только латиница, цифры и дефисы (например svet-v-interere).",
    };
  }

  if (!publishedAt || Number.isNaN(publishedAt.getTime())) {
    return { error: "Укажите корректную дату публикации." };
  }

  const coverCandidate = formData.get("coverFile");
  const coverFile =
    coverCandidate instanceof File && coverCandidate.size > 0 ? coverCandidate : null;

  const saved = await saveUploadedBlogCover(
    slug,
    coverFile,
    coverFile ? null : fallbackCoverUrl || existing.coverImage,
    existing.coverImage,
  );

  if (!saved.ok) {
    return { error: saved.message };
  }

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: saved.coverUrl,
        publishedAt,
        readingMinutes,
      },
    });
  } catch (e: unknown) {
    const code = typeof e === "object" && e !== null && "code" in e ? (e as { code?: string }).code : undefined;
    if (code === "P2002") {
      return { error: "Статья с таким slug уже существует. Выберите другой slug." };
    }
    throw e;
  }

  revalidateBlogPaths([existing.slug, slug]);
  redirect("/admin");
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id") ?? 0);
  if (!Number.isFinite(id) || id < 1) return;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.blogPost.delete({ where: { id } });
  revalidateBlogPaths([existing.slug]);
  redirect("/admin");
}

export async function updateSiteContent(formData: FormData) {
  await requireAdmin();

  const heroTitle = String(formData.get("heroTitle") ?? "").trim();
  const heroSubtitle = String(formData.get("heroSubtitle") ?? "").trim();
  const aboutTitle = String(formData.get("aboutTitle") ?? "").trim();
  const aboutText = String(formData.get("aboutText") ?? "").trim();

  if (!heroTitle || !heroSubtitle || !aboutTitle || !aboutText) {
    return;
  }

  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: { heroTitle, heroSubtitle, aboutTitle, aboutText },
    create: { id: 1, heroTitle, heroSubtitle, aboutTitle, aboutText },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin");
}
