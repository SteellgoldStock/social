"use server";

import { prisma } from "@/lib/db/prisma";
import { authActionClient } from "@/lib/safe-action";
import { NotificationType, Prisma } from "@prisma/client";
import { z } from "zod";

type GetNotificationsType = {
  select: {
    id: true,
    type: true,
    read: true,
    createdAt: true,
    author: {
      select: {
        name: true,
        image: true,
        username: true
      }
    },
    post: {
      select: {
        id: true,
        content: true,
        user: {
          select: {
            username: true
          }
        }
      }
    },
    triggerPost: {
      select: {
        id: true,
        content: true,
        user: {
          select: {
            username: true
          }
        }
      }
    }
  },
};

export const getNotifications = authActionClient.action(async ({ ctx: { session } }): Promise<Prisma.NotificationGetPayload<GetNotificationsType>[]> => {
  return prisma.notification.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      type: true,
      read: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          image: true,
          username: true
        }
      },
      post: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              username: true
            }
          }
        }
      },
      triggerPost: {
        select: {
          id: true,
          content: true,
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
});

export const getUnreadNotificationsCount = authActionClient.action(async ({ ctx: { session } }) => {
  return prisma.notification.count({
    where: { 
      userId: session.user.id,
      read: false
    }
  });
});

const MarkNotificationAsReadInput = z.object({
  notificationId: z.string()
});

export const markNotificationAsRead = authActionClient.schema(MarkNotificationAsReadInput).action(async ({ parsedInput: { notificationId } }) => {
  await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true }
  });
});

export const markAllNotificationsAsRead = authActionClient.action(async ({ ctx: { session } }) => {  
  await prisma.notification.updateMany({
    where: { userId: session.user.id },
    data: { read: true }
  });
});

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