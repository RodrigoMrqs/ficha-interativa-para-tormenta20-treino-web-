/*
  Warnings:

  - You are about to drop the column `class1` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `class1Level` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `class2` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `class2Level` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "class1",
DROP COLUMN "class1Level",
DROP COLUMN "class2",
DROP COLUMN "class2Level";

-- CreateTable
CREATE TABLE "CharacterClasses" (
    "id" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "CharacterClasses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharacterClasses" ADD CONSTRAINT "CharacterClasses_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
