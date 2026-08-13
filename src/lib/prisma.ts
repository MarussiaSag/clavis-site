import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaModelSig: string | undefined;
};

const EXPECTED_MODELS = [
  "siteSettings",
  "socialLink",
  "aboutStudio",
  "aboutStudioPerson",
  "project",
  "inquiry",
  "siteImage",
] as const;

/** Fields currently defined on SiteSettings — used to detect a stale generated client. */
const EXPECTED_SITE_SETTINGS_FIELDS = [
  "id",
  "city",
  "address",
  "mapUrl",
  "phone",
  "phoneHref",
  "email",
  "tagline",
  "hoursWeekdays",
  "hoursWeekend",
  "instagramFootnote",
  "updatedAt",
].join(",");

function createPrismaClient() {
  return new PrismaClient();
}

function modelSignature(client: PrismaClient) {
  return EXPECTED_MODELS.map(
    (key) => `${key}:${typeof (client as unknown as Record<string, unknown>)[key]}`,
  ).join("|");
}

function siteSettingsFieldSignature() {
  const model = Prisma.dmmf.datamodel.models.find((item) => item.name === "SiteSettings");
  if (!model) return "missing";
  return model.fields.map((field) => field.name).sort().join(",");
}

function expectedModelSignature() {
  return EXPECTED_MODELS.map((key) => `${key}:object`).join("|");
}

function assertGeneratedClientIsCurrent() {
  const fields = siteSettingsFieldSignature();
  const expectedFields = [...EXPECTED_SITE_SETTINGS_FIELDS.split(",")].sort().join(",");
  if (fields !== expectedFields) {
    throw new Error(
      `Stale Prisma client for SiteSettings (got: ${fields}). Stop the Next.js server, run \`npx prisma generate\`, then start it again.`,
    );
  }
}

/** Always returns a Prisma client that matches the current generated schema. */
export function getPrismaClient(): PrismaClient {
  assertGeneratedClientIsCurrent();

  const expected = expectedModelSignature();
  const cached = globalForPrisma.prisma;

  if (cached && globalForPrisma.prismaModelSig === expected && modelSignature(cached) === expected) {
    return cached;
  }

  // Recreate without $disconnect(): fire-and-forget disconnect mid-request
  // crashes the query engine with "Response from the Engine was empty".
  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  globalForPrisma.prismaModelSig = modelSignature(client);
  return client;
}

/** Prefer getPrismaClient() in new code; kept for existing imports. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, _receiver) {
    const client = getPrismaClient();
    if (typeof prop === "symbol") {
      return Reflect.get(client, prop);
    }
    const value = (client as unknown as Record<string, unknown>)[prop];
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client);
    }
    return value;
  },
  has(_target, prop) {
    return prop in getPrismaClient();
  },
});
