-- AlterTable
ALTER TABLE "Project" ADD COLUMN "areaLabel" TEXT;
ALTER TABLE "Project" ADD COLUMN "durationLabel" TEXT;
ALTER TABLE "Project" ADD COLUMN "taskBrief" TEXT;
ALTER TABLE "Project" ADD COLUMN "isFeaturedHome" BOOLEAN NOT NULL DEFAULT false;
