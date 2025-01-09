-- CreateEnum
CREATE TYPE "VerifiedStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VerifiedType" AS ENUM ('PERSONALITY', 'ORGANIZATION', 'STAFF');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedStatus" "VerifiedStatus",
ADD COLUMN     "verifiedType" "VerifiedType";
