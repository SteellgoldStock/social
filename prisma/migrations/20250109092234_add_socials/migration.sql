-- CreateTable
CREATE TABLE "social" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "handle" TEXT NOT NULL,

    CONSTRAINT "social_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "social" ADD CONSTRAINT "social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
