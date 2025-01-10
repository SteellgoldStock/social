-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "triggerPostId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_triggerPostId_fkey" FOREIGN KEY ("triggerPostId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
