/*
  Warnings:

  - You are about to alter the column `price` on the `Token` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `logo` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Token" ("id", "name", "price", "ticker", "updatedAt") SELECT "id", "name", "price", "ticker", "updatedAt" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
