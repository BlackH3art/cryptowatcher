/*
  Warnings:

  - You are about to alter the column `amount` on the `Token` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL DEFAULT 0,
    "priceUpdatedAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Token" ("amount", "description", "favourite", "id", "logo", "name", "price", "priceUpdatedAt", "ticker", "updatedAt") SELECT "amount", "description", "favourite", "id", "logo", "name", "price", "priceUpdatedAt", "ticker", "updatedAt" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
