/*
  Warnings:

  - You are about to drop the column `locked` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "locked",
ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false;
