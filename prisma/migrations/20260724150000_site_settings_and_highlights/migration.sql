-- DropTable
DROP TABLE IF EXISTS "SiteContent";

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneHref" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "hoursWeekdays" TEXT NOT NULL,
    "hoursWeekend" TEXT NOT NULL,
    "instagramFootnote" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StudioHighlight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
