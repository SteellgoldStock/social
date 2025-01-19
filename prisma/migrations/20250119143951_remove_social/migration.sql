/*
  Warnings:

  - You are about to drop the `social` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "social" DROP CONSTRAINT "social_userId_fkey";

-- DropTable
DROP TABLE "social";
