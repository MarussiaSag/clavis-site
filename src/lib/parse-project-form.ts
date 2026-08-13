import {
  serializeMaterials,
  serializeParagraphs,
  serializeRooms,
  serializeTeam,
  slugifyRoomId,
  type ProjectMaterialContent,
  type ProjectRoomContent,
  type ProjectTeamMemberContent,
} from "@/lib/project-content";
import {
  normalizePublicAssetPath,
  saveNamedProjectImage,
  sanitizeProjectSlug,
} from "@/lib/project-files";
import { isProjectCategory } from "@/lib/portfolio-filters";

export type ParsedProjectForm = {
  title: string;
  slug: string;
  category: string;
  location: string;
  year: number;
  description: string;
  areaLabel: string | null;
  durationLabel: string | null;
  taskBrief: string | null;
  styleLabel: string | null;
  layoutLabel: string | null;
  aboutSummary: string | null;
  quote: string | null;
  quoteAttribution: string | null;
  aboutBody: string | null;
  aboutSideBody: string | null;
  aboutImage: string | null;
  roomsJson: string | null;
  materialsJson: string | null;
  teamJson: string | null;
  virtualTourUrl: string | null;
  showOnHero: boolean;
  isFeaturedHome: boolean;
  heroOrder: number;
  mainFile: File | null;
  galleryFiles: File[];
  fallbackCoverUrl: string;
  aboutImageFile: File | null;
};

function optionalText(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

function fileFromForm(formData: FormData, key: string): File | null {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

export async function parseProjectFormData(
  formData: FormData,
  options?: { existingAboutImage?: string | null },
): Promise<{ ok: true; data: ParsedProjectForm } | { ok: false; error: string }> {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const year = Number(formData.get("year") ?? 0);
  const description = String(formData.get("description") ?? "").trim();
  const heroOrderRaw = Number(formData.get("heroOrder") ?? 0);
  const slug = sanitizeProjectSlug(slugRaw);

  if (!title || !slugRaw || !category || !location || !year || !description) {
    return { ok: false, error: "Заполните основные поля: название, slug, тип, локация, год, описание." };
  }
  if (!isProjectCategory(category)) {
    return { ok: false, error: "Тип проекта: выберите Жилые или Коммерческие." };
  }
  if (!slug) {
    return {
      ok: false,
      error: "Slug только латиница, цифры и дефисы (например zil-apartments).",
    };
  }

  const roomCount = Math.max(0, Math.min(20, Number(formData.get("roomCount") ?? 0) || 0));
  const rooms: ProjectRoomContent[] = [];
  for (let index = 0; index < roomCount; index += 1) {
    const label = String(formData.get(`room_label_${index}`) ?? "").trim();
    const descriptionText = String(formData.get(`room_description_${index}`) ?? "").trim();
    const existingMain = String(formData.get(`room_mainUrl_${index}`) ?? "").trim();
    const existingSecondary = String(formData.get(`room_secondaryUrl_${index}`) ?? "").trim();
    const mainFile = fileFromForm(formData, `room_main_${index}`);
    const secondaryFile = fileFromForm(formData, `room_secondary_${index}`);

    if (!label && !descriptionText && !mainFile && !secondaryFile && !existingMain && !existingSecondary) {
      continue;
    }

    let mainImage = existingMain ? normalizePublicAssetPath(existingMain) : "";
    let secondaryImage = existingSecondary ? normalizePublicAssetPath(existingSecondary) : "";

    if (mainFile) {
      const saved = await saveNamedProjectImage(slug, mainFile, `room-${index + 1}-main`);
      if (!saved.ok) return { ok: false, error: saved.message };
      mainImage = saved.url;
    }
    if (secondaryFile) {
      const saved = await saveNamedProjectImage(slug, secondaryFile, `room-${index + 1}-secondary`);
      if (!saved.ok) return { ok: false, error: saved.message };
      secondaryImage = saved.url;
    }

    rooms.push({
      id: slugifyRoomId(label, index),
      label,
      description: descriptionText,
      mainImage,
      secondaryImage,
    });
  }

  const materialCount = Math.max(0, Math.min(40, Number(formData.get("materialCount") ?? 0) || 0));
  const materials: ProjectMaterialContent[] = [];
  for (let index = 0; index < materialCount; index += 1) {
    const categoryLabel = String(formData.get(`material_category_${index}`) ?? "").trim();
    const supplier = String(formData.get(`material_supplier_${index}`) ?? "").trim();
    const detail = String(formData.get(`material_detail_${index}`) ?? "").trim();
    if (!categoryLabel && !supplier && !detail) continue;
    materials.push({ category: categoryLabel, supplier, detail });
  }

  const teamCount = Math.max(0, Math.min(20, Number(formData.get("teamCount") ?? 0) || 0));
  const team: ProjectTeamMemberContent[] = [];
  for (let index = 0; index < teamCount; index += 1) {
    const role = String(formData.get(`team_role_${index}`) ?? "").trim();
    const name = String(formData.get(`team_name_${index}`) ?? "").trim();
    if (!role && !name) continue;
    team.push({ role, name });
  }

  let aboutImage =
    optionalText(formData, "aboutImageUrl") ??
    (options?.existingAboutImage ? normalizePublicAssetPath(options.existingAboutImage) : null);
  const aboutImageFile = fileFromForm(formData, "aboutImageFile");
  if (aboutImageFile) {
    const saved = await saveNamedProjectImage(slug, aboutImageFile, "about");
    if (!saved.ok) return { ok: false, error: saved.message };
    aboutImage = saved.url;
  }

  const galleryRaw = formData.getAll("gallery");
  const galleryFiles = galleryRaw.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0,
  );

  return {
    ok: true,
    data: {
      title,
      slug,
      category,
      location,
      year,
      description,
      areaLabel: optionalText(formData, "areaLabel"),
      durationLabel: optionalText(formData, "durationLabel"),
      taskBrief: optionalText(formData, "taskBrief"),
      styleLabel: optionalText(formData, "styleLabel"),
      layoutLabel: optionalText(formData, "layoutLabel"),
      aboutSummary: optionalText(formData, "aboutSummary"),
      quote: optionalText(formData, "quote"),
      quoteAttribution: optionalText(formData, "quoteAttribution") ?? "Студия Clavis",
      aboutBody: (() => {
        const text = String(formData.get("aboutBody") ?? "").trim();
        return text ? serializeParagraphs(text) : null;
      })(),
      aboutSideBody: (() => {
        const text = String(formData.get("aboutSideBody") ?? "").trim();
        return text ? serializeParagraphs(text) : null;
      })(),
      aboutImage,
      roomsJson: rooms.length ? serializeRooms(rooms) : null,
      materialsJson: materials.length ? serializeMaterials(materials) : null,
      teamJson: team.length ? serializeTeam(team) : null,
      virtualTourUrl: optionalText(formData, "virtualTourUrl"),
      showOnHero: formData.get("showOnHero") === "on",
      isFeaturedHome: formData.get("isFeaturedHome") === "on",
      heroOrder: Number.isFinite(heroOrderRaw) ? Math.trunc(heroOrderRaw) : 0,
      mainFile: fileFromForm(formData, "mainImage"),
      galleryFiles,
      fallbackCoverUrl: String(formData.get("coverImage") ?? "").trim(),
      aboutImageFile,
    },
  };
}
