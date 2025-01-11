"use server";

import { prisma } from "@/lib/db/prisma";
import { NotificationType, Prisma } from "@prisma/client";
import { z } from "zod";

export const getNotifications = async(userId: string): Promise<Prisma.NotificationGetPayload<{
  include: {
    author: true;
    post: {
      include: {
        user: {
          select: {
            username: true;
          };
        };
      };
    };
    triggerPost: {
      include: {
        user: {
          select: {
            username: true;
          };
        };
      };
    };
  };
}>[]> => {
  const id = z.string().parse(userId);
  
  return prisma.notification.findMany({
    where: { userId: id },
    include: {
      author: true,
      post: {
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      },
      triggerPost: {
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export const getUnreadNotificationsCount = async(userId?: string): Promise<number> => {
  if (!userId) return 0;

  const id = z.string().parse(userId);
  
  return prisma.notification.count({
    where: { 
      userId: id,
      read: false
    }
  });
}

export const markNotificationAsRead = async(notificationId: string): Promise<void> => {
  const id = z.string().parse(notificationId);
  
  await prisma.notification.update({
    where: { id },
    data: { read: true }
  });
}

export const markAllNotificationsAsRead = async(userId: string): Promise<void> => {
  const id = z.string().parse(userId);
  
  await prisma.notification.updateMany({
    where: { userId: id },
    data: { read: true }
  });
}

export const createNotification = async({
  type,
  userId,
  authorId,
  postId = null
}: {
  type: NotificationType;
  userId: string;
  authorId: string;
  postId?: string | null;
}): Promise<void> => {
  await prisma.notification.create({
    data: {
      type,
      user: { connect: { id: userId } },
      author: { connect: { id: authorId } },
      post: postId ? { connect: { id: postId } } : undefined
    }
  });
}