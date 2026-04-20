"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

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

export async function createProject(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const year = Number(formData.get("year") ?? 0);
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !slug || !category || !location || !year || !description) {
    return;
  }

  await prisma.project.create({
    data: {
      title,
      slug,
      category,
      location,
      year,
      coverImage:
        coverImage ||
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      description,
    },
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin");
  revalidatePath("/");
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
