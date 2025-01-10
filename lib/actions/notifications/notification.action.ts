"use server";

import { prisma } from "@/lib/db/prisma";
import { NotificationType, Prisma } from "@prisma/client";
import { z } from "zod";

export async function getNotifications(userId: string): Promise<Prisma.NotificationGetPayload<{
  include: { author: true; post: true; };
}>[]> {
  const id = z.string().parse(userId);
  
  return prisma.notification.findMany({
    where: { userId: id },
    include: {
      author: true,
      post: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getUnreadNotificationsCount(userId: string): Promise<number> {
  const id = z.string().parse(userId);
  
  return prisma.notification.count({
    where: { 
      userId: id,
      read: false 
    }
  });
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const id = z.string().parse(notificationId);
  
  await prisma.notification.update({
    where: { id },
    data: { read: true }
  });
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  const id = z.string().parse(userId);
  
  await prisma.notification.updateMany({
    where: { userId: id },
    data: { read: true }
  });
}

export async function createNotification({
  type,
  userId,
  authorId,
  postId = null
}: {
  type: NotificationType;
  userId: string;
  authorId: string;
  postId?: string | null;
}): Promise<void> {
  await prisma.notification.create({
    data: {
      type,
      user: { connect: { id: userId } },
      author: { connect: { id: authorId } },
      post: postId ? { connect: { id: postId } } : undefined
    }
  });
}