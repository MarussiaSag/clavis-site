-- CreateTable
CREATE TABLE "AboutStudio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "teamPhoto" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AboutStudioPerson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "competencies" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "aboutStudioId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AboutStudioPerson_aboutStudioId_fkey" FOREIGN KEY ("aboutStudioId") REFERENCES "AboutStudio" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
