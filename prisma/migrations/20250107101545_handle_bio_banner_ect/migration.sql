/*
  Warnings:

  - Added the required column `handle` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "handle" TEXT NOT NULL;
