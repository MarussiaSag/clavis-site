export type ProjectRoomContent = {
  id: string;
  label: string;
  description: string;
  mainImage: string;
  secondaryImage: string;
};

export type ProjectMaterialContent = {
  category: string;
  supplier: string;
  detail: string;
};

export type ProjectTeamMemberContent = {
  role: string;
  name: string;
};

export function serializeParagraphs(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .join("\n\n");
}

export function parseParagraphs(text: string | null | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function serializeRooms(rooms: ProjectRoomContent[]): string {
  return JSON.stringify(rooms);
}

export function parseRooms(raw: string | null | undefined): ProjectRoomContent[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item, index) => {
        if (!item || typeof item !== "object") return null;
        const row = item as Record<string, unknown>;
        const label = String(row.label ?? "").trim();
        const description = String(row.description ?? "").trim();
        const mainImage = String(row.mainImage ?? "").trim();
        const secondaryImage = String(row.secondaryImage ?? "").trim();
        if (!label && !description && !mainImage && !secondaryImage) return null;
        const id = String(row.id ?? "").trim() || `room-${index + 1}`;
        return { id, label, description, mainImage, secondaryImage };
      })
      .filter((item): item is ProjectRoomContent => item != null);
  } catch {
    return [];
  }
}

export function serializeMaterials(items: ProjectMaterialContent[]): string {
  return JSON.stringify(items);
}

export function parseMaterials(raw: string | null | undefined): ProjectMaterialContent[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as Record<string, unknown>;
        const category = String(row.category ?? "").trim();
        const supplier = String(row.supplier ?? "").trim();
        const detail = String(row.detail ?? "").trim();
        if (!category && !supplier && !detail) return null;
        return { category, supplier, detail };
      })
      .filter((item): item is ProjectMaterialContent => item != null);
  } catch {
    return [];
  }
}

export function serializeTeam(items: ProjectTeamMemberContent[]): string {
  return JSON.stringify(items);
}

export function parseTeam(raw: string | null | undefined): ProjectTeamMemberContent[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as Record<string, unknown>;
        const role = String(row.role ?? "").trim();
        const name = String(row.name ?? "").trim();
        if (!role && !name) return null;
        return { role, name };
      })
      .filter((item): item is ProjectTeamMemberContent => item != null);
  } catch {
    return [];
  }
}

export function slugifyRoomId(label: string, index: number): string {
  const base = label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40);
  return base || `room-${index + 1}`;
}
