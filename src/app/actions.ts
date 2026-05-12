"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
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

export async function updateSiteContent(formData: FormData) {
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
