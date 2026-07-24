"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedBlogCover } from "@/lib/blog-files";
import { parseBlogContent, serializeBlogContent } from "@/lib/blog-posts";
import { sanitizeProjectSlug, saveUploadedProjectPhotos } from "@/lib/project-files";
import { parseProjectFormData, type ParsedProjectForm } from "@/lib/parse-project-form";

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
  revalidatePath("/admin/inquiries");
}

export type CreateProjectState = { error?: string } | null;
export type UpdateProjectState = { error?: string } | null;

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/portfolio");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  if (slug) revalidatePath(`/portfolio/${slug}`);
}

function projectContentData(data: ParsedProjectForm) {
  return {
    title: data.title,
    slug: data.slug,
    category: data.category,
    location: data.location,
    year: data.year,
    description: data.description,
    areaLabel: data.areaLabel,
    durationLabel: data.durationLabel,
    taskBrief: data.taskBrief,
    styleLabel: data.styleLabel,
    layoutLabel: data.layoutLabel,
    aboutSummary: data.aboutSummary,
    quote: data.quote,
    quoteAttribution: data.quoteAttribution,
    aboutBody: data.aboutBody,
    aboutSideBody: data.aboutSideBody,
    aboutImage: data.aboutImage,
    roomsJson: data.roomsJson,
    materialsJson: data.materialsJson,
    teamJson: data.teamJson,
    virtualTourUrl: data.virtualTourUrl,
    showOnHero: data.showOnHero,
    isFeaturedHome: data.isFeaturedHome,
    heroOrder: data.heroOrder,
  };
}

export async function createProjectAction(
  _prevState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  await requireAdmin();

  const parsed = await parseProjectFormData(formData);
  if (!parsed.ok) return { error: parsed.error };

  const { data } = parsed;
  const saved = await saveUploadedProjectPhotos(
    data.slug,
    data.mainFile,
    data.galleryFiles,
    data.mainFile ? null : data.fallbackCoverUrl || null,
  );

  if (!saved.ok) {
    return { error: saved.message };
  }

  try {
    await prisma.project.create({
      data: {
        ...projectContentData(data),
        coverImage: saved.coverUrl,
      },
    });
  } catch (e: unknown) {
    const code = typeof e === "object" && e !== null && "code" in e ? (e as { code?: string }).code : undefined;
    if (code === "P2002") {
      return { error: "Проект с таким slug уже существует. Выберите другой slug." };
    }
    throw e;
  }

  revalidateProjectPaths(data.slug);
  redirect("/admin/projects");
}

export async function updateProjectAction(
  _prevState: UpdateProjectState,
  formData: FormData,
): Promise<UpdateProjectState> {
  await requireAdmin();

  const id = Number(formData.get("id") ?? 0);
  if (!Number.isFinite(id) || id <= 0) {
    return { error: "Некорректный проект." };
  }

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Проект не найден." };
  }

  const parsed = await parseProjectFormData(formData, {
    existingAboutImage: existing.aboutImage,
  });
  if (!parsed.ok) return { error: parsed.error };

  const { data } = parsed;
  const saved = await saveUploadedProjectPhotos(
    data.slug,
    data.mainFile,
    data.galleryFiles,
    data.mainFile ? null : data.fallbackCoverUrl || existing.coverImage,
  );

  if (!saved.ok) {
    return { error: saved.message };
  }

  try {
    await prisma.project.update({
      where: { id },
      data: {
        ...projectContentData(data),
        coverImage: saved.coverUrl,
      },
    });
  } catch (e: unknown) {
    const code = typeof e === "object" && e !== null && "code" in e ? (e as { code?: string }).code : undefined;
    if (code === "P2002") {
      return { error: "Проект с таким slug уже существует. Выберите другой slug." };
    }
    throw e;
  }

  revalidateProjectPaths(existing.slug);
  revalidateProjectPaths(data.slug);
  redirect(`/admin/projects/${id}/edit`);
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") ?? 0);
  if (!Number.isFinite(id) || id <= 0) return;

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.project.delete({ where: { id } });
  revalidateProjectPaths(existing.slug);
  redirect("/admin/projects");
}

export type CreateBlogPostState = { error?: string } | null;

function revalidateBlogPaths(slugs: string[]) {
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
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

  const { galleryFilesFromFormData, saveUploadedBlogGallery } = await import("@/lib/blog-files");
  const gallerySaved = await saveUploadedBlogGallery(slug, galleryFilesFromFormData(formData));
  if (!gallerySaved.ok) {
    return { error: gallerySaved.message };
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
  redirect("/admin/blog");
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

  const {
    galleryFilesFromFormData,
    saveUploadedBlogGallery,
    deleteBlogGalleryImage,
  } = await import("@/lib/blog-files");

  const removeUrls = formData
    .getAll("removeGallery")
    .map((item) => String(item).trim())
    .filter(Boolean);
  for (const url of removeUrls) {
    const removed = await deleteBlogGalleryImage(existing.slug, url);
    if (!removed.ok) {
      return { error: removed.message };
    }
  }

  const gallerySaved = await saveUploadedBlogGallery(slug, galleryFilesFromFormData(formData));
  if (!gallerySaved.ok) {
    return { error: gallerySaved.message };
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
  redirect("/admin/blog");
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id") ?? 0);
  if (!Number.isFinite(id) || id < 1) return;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.blogPost.delete({ where: { id } });
  revalidateBlogPaths([existing.slug]);
  redirect("/admin/blog");
}

export type SaveSiteBasicsState = { error?: string; ok?: boolean } | null;

export async function saveSiteBasicsAction(
  _prev: SaveSiteBasicsState,
  formData: FormData,
): Promise<SaveSiteBasicsState> {
  try {
    await requireAdmin();

    const { phoneToTelHref } = await import("@/lib/site-contact");

    const city = String(formData.get("city") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const mapUrl = String(formData.get("mapUrl") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const tagline = String(formData.get("tagline") ?? "").trim();
    const hoursWeekdays = String(formData.get("hoursWeekdays") ?? "").trim();
    const hoursWeekend = String(formData.get("hoursWeekend") ?? "").trim();
    const instagramFootnote = String(formData.get("instagramFootnote") ?? "").trim();

    if (
      !city ||
      !address ||
      !mapUrl ||
      !phone ||
      !email ||
      !tagline ||
      !hoursWeekdays ||
      !hoursWeekend ||
      !instagramFootnote
    ) {
      return { error: "Заполните все обязательные поля." };
    }

    const socialCount = Number(formData.get("socialCount") ?? 0);
    if (!Number.isFinite(socialCount) || socialCount < 0) {
      return { error: "Некорректный список соцсетей." };
    }

    const socialItems: { id?: number; label: string; href: string }[] = [];
    for (let i = 0; i < socialCount; i += 1) {
      const label = String(formData.get(`social_label_${i}`) ?? "").trim();
      const href = String(formData.get(`social_href_${i}`) ?? "").trim();
      const idRaw = String(formData.get(`social_id_${i}`) ?? "").trim();
      const id = idRaw ? Number(idRaw) : undefined;

      if (!label || !href) {
        return { error: `Заполните название и ссылку для соцсети ${i + 1}.` };
      }

      socialItems.push({
        id: Number.isFinite(id) && id! > 0 ? id : undefined,
        label,
        href,
      });
    }

    const phoneHref = phoneToTelHref(phone);
    const keepIds = socialItems.map((item) => item.id).filter((id): id is number => id != null);

    await prisma.$transaction(async (tx) => {
      await tx.siteSettings.upsert({
        where: { id: 1 },
        update: {
          city,
          address,
          mapUrl,
          phone,
          phoneHref,
          email,
          tagline,
          hoursWeekdays,
          hoursWeekend,
          instagramFootnote,
        },
        create: {
          id: 1,
          city,
          address,
          mapUrl,
          phone,
          phoneHref,
          email,
          tagline,
          hoursWeekdays,
          hoursWeekend,
          instagramFootnote,
        },
      });

      if (keepIds.length > 0) {
        await tx.socialLink.deleteMany({ where: { id: { notIn: keepIds } } });
      } else {
        await tx.socialLink.deleteMany();
      }

      for (let i = 0; i < socialItems.length; i += 1) {
        const item = socialItems[i];
        if (item.id != null) {
          await tx.socialLink.update({
            where: { id: item.id },
            data: { label: item.label, href: item.href, sortOrder: i },
          });
        } else {
          await tx.socialLink.create({
            data: { label: item.label, href: item.href, sortOrder: i },
          });
        }
      }
    });

    revalidatePath("/");
    revalidatePath("/contacts");
    revalidatePath("/portfolio");
    revalidatePath("/admin");
    revalidatePath("/admin/basics");
    return { ok: true };
  } catch (error) {
    console.error("[saveSiteBasicsAction]", error);
    return {
      error: error instanceof Error ? error.message : "Не удалось сохранить основные данные.",
    };
  }
}

export type SaveStudioHighlightsState = { error?: string; ok?: boolean } | null;

export async function saveStudioHighlightsAction(
  _prev: SaveStudioHighlightsState,
  formData: FormData,
): Promise<SaveStudioHighlightsState> {
  try {
    await requireAdmin();

    const { MAX_STUDIO_HIGHLIGHTS } = await import("@/lib/home-studio-highlights");
    const count = Number(formData.get("count") ?? 0);
    if (!Number.isFinite(count) || count < 0) {
      return { error: "Некорректное количество фактов." };
    }
    if (count > MAX_STUDIO_HIGHLIGHTS) {
      return { error: `Можно сохранить не больше ${MAX_STUDIO_HIGHLIGHTS} фактов.` };
    }

    const items: { id?: number; title: string; description: string }[] = [];
    for (let i = 0; i < count; i += 1) {
      const title = String(formData.get(`title_${i}`) ?? "").trim();
      const description = String(formData.get(`description_${i}`) ?? "").trim();
      const idRaw = String(formData.get(`id_${i}`) ?? "").trim();
      const id = idRaw ? Number(idRaw) : undefined;

      if (!title || !description) {
        return { error: `Заполните заголовок и описание для факта ${i + 1}.` };
      }

      items.push({
        id: Number.isFinite(id) && id! > 0 ? id : undefined,
        title,
        description,
      });
    }

    const keepIds = items.map((item) => item.id).filter((id): id is number => id != null);

    await prisma.$transaction(async (tx) => {
      if (keepIds.length > 0) {
        await tx.studioHighlight.deleteMany({
          where: { id: { notIn: keepIds } },
        });
      } else {
        await tx.studioHighlight.deleteMany();
      }

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (item.id != null) {
          await tx.studioHighlight.update({
            where: { id: item.id },
            data: {
              title: item.title,
              description: item.description,
              sortOrder: i,
            },
          });
        } else {
          await tx.studioHighlight.create({
            data: {
              title: item.title,
              description: item.description,
              sortOrder: i,
            },
          });
        }
      }
    });

    revalidatePath("/");
    revalidatePath("/admin/home");
    return { ok: true };
  } catch (error) {
    console.error("[saveStudioHighlightsAction]", error);
    return {
      error: error instanceof Error ? error.message : "Не удалось сохранить факты.",
    };
  }
}

export type SaveAboutStudioPeopleState = { error?: string; ok?: boolean } | null;

export async function saveAboutStudioPeopleAction(
  _prev: SaveAboutStudioPeopleState,
  formData: FormData,
): Promise<SaveAboutStudioPeopleState> {
  try {
    await requireAdmin();

    const { MAX_ABOUT_STUDIO_PEOPLE, ensureAboutStudio } = await import(
      "@/lib/about-studio-people"
    );
    const { saveUploadedStudioTeamPhoto } = await import("@/lib/about-files");

    await ensureAboutStudio();

    const count = Number(formData.get("count") ?? 0);
    if (!Number.isFinite(count) || count < 0) {
      return { error: "Некорректное количество людей." };
    }
    if (count > MAX_ABOUT_STUDIO_PEOPLE) {
      return { error: `Можно сохранить не больше ${MAX_ABOUT_STUDIO_PEOPLE} человек.` };
    }

    const teamPhotoFile = formData.get("teamPhotoFile");
    const file = teamPhotoFile instanceof File && teamPhotoFile.size > 0 ? teamPhotoFile : null;
    const existingTeamPhoto = String(formData.get("teamPhotoUrl") ?? "").trim();

    const savedPhoto = await saveUploadedStudioTeamPhoto(file, null, existingTeamPhoto || null);
    if (!savedPhoto.ok) {
      return { error: savedPhoto.message };
    }

    const items: { id?: number; name: string; role: string; competencies: string }[] = [];
    for (let i = 0; i < count; i += 1) {
      const name = String(formData.get(`name_${i}`) ?? "").trim();
      const role = String(formData.get(`role_${i}`) ?? "").trim();
      const competencies = String(formData.get(`competencies_${i}`) ?? "").trim();
      const idRaw = String(formData.get(`id_${i}`) ?? "").trim();
      const id = idRaw ? Number(idRaw) : undefined;

      if (!name || !role || !competencies) {
        return { error: `Заполните фамилию, должность и компетенции для человека ${i + 1}.` };
      }

      items.push({
        id: Number.isFinite(id) && id! > 0 ? id : undefined,
        name,
        role,
        competencies,
      });
    }

    const keepIds = items.map((item) => item.id).filter((id): id is number => id != null);

    await prisma.$transaction(async (tx) => {
      await tx.aboutStudio.upsert({
        where: { id: 1 },
        create: { id: 1, teamPhoto: savedPhoto.teamPhotoUrl },
        update: { teamPhoto: savedPhoto.teamPhotoUrl },
      });

      if (keepIds.length > 0) {
        await tx.aboutStudioPerson.deleteMany({
          where: { aboutStudioId: 1, id: { notIn: keepIds } },
        });
      } else {
        await tx.aboutStudioPerson.deleteMany({ where: { aboutStudioId: 1 } });
      }

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (item.id != null) {
          await tx.aboutStudioPerson.update({
            where: { id: item.id },
            data: {
              name: item.name,
              role: item.role,
              competencies: item.competencies,
              sortOrder: i,
              aboutStudioId: 1,
            },
          });
        } else {
          await tx.aboutStudioPerson.create({
            data: {
              name: item.name,
              role: item.role,
              competencies: item.competencies,
              sortOrder: i,
              aboutStudioId: 1,
            },
          });
        }
      }
    });

    revalidatePath("/about");
    revalidatePath("/admin/about");
    return { ok: true };
  } catch (error) {
    console.error("[saveAboutStudioPeopleAction]", error);
    return {
      error: error instanceof Error ? error.message : "Не удалось сохранить блок «О студии».",
    };
  }
}

export type SaveSiteImagesState = { error?: string; ok?: boolean } | null;

export async function saveSiteImagesAction(
  _prev: SaveSiteImagesState,
  formData: FormData,
): Promise<SaveSiteImagesState> {
  try {
    await requireAdmin();

    const { SITE_IMAGE_SLOTS, ensureSiteImages } = await import("@/lib/site-images");
    const { saveUploadedSiteImage } = await import("@/lib/site-image-files");

    await ensureSiteImages();

    for (const item of SITE_IMAGE_SLOTS) {
      const fileRaw = formData.get(`${item.slot}__file`);
      const file = fileRaw instanceof File && fileRaw.size > 0 ? fileRaw : null;
      const existingUrl = String(formData.get(`${item.slot}__url`) ?? "").trim();

      if (!file && !existingUrl) {
        return { error: `Нет изображения для слота «${item.label}».` };
      }

      const saved = await saveUploadedSiteImage(item.slot, file, existingUrl || null);
      if (!saved.ok) {
        return { error: `${item.label}: ${saved.message}` };
      }

      await prisma.siteImage.upsert({
        where: { slot: item.slot },
        create: { slot: item.slot, url: saved.url },
        update: { url: saved.url },
      });
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/contacts");
    revalidatePath("/admin/media");
    return { ok: true };
  } catch (error) {
    console.error("[saveSiteImagesAction]", error);
    return {
      error: error instanceof Error ? error.message : "Не удалось сохранить изображения.",
    };
  }
}
