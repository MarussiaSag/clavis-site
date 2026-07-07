import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient();
}

/** Dev server caches Prisma globally; recreate after `prisma generate` / schema changes. */
function getPrismaClient() {
  const cached = globalForPrisma.prisma;
  if (cached && typeof cached.blogPost !== "undefined") {
    return cached;
  }

  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

export const prisma = getPrismaClient();
