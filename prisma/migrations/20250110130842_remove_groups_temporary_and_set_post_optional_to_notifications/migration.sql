/*
  Warnings:

  - You are about to drop the column `groupId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_postId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_groupId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "groupId";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "_GroupToUser";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
