-- CreateTable
CREATE TABLE "SiteImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slot" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteImage_slot_key" ON "SiteImage"("slot");
