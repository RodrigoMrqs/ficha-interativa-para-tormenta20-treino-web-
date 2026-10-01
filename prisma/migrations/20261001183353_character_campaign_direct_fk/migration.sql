/*
  Warnings:

  - You are about to drop the `CharacterCampaign` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,campaignId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CharacterCampaign" DROP CONSTRAINT "CharacterCampaign_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterCampaign" DROP CONSTRAINT "CharacterCampaign_characterId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "campaignId" TEXT;

-- DropTable
DROP TABLE "CharacterCampaign";

-- CreateIndex
CREATE UNIQUE INDEX "Character_userId_campaignId_key" ON "Character"("userId", "campaignId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
