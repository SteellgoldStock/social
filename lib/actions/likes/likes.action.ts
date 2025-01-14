"use server";

import { prisma } from "@/lib/db/prisma";
import { authActionClient } from "@/lib/safe-action";
import { LikePostUpdate } from "./likes.type";

export const getLikes = authActionClient.action(
  async ({ ctx: { session } }) => {
    const userLikes = await prisma.post.findMany({
      where: {
        likes: {
          some: { id: session.user.id }
        }
      },
      select: { id: true }
    });

    return { data: userLikes };
  }
);

export const likePost = authActionClient.schema(LikePostUpdate).action(
  async ({ parsedInput: { postId, authorId }, ctx: { session } }) => {
    const existingLike = await prisma.post.findFirst({
      where: { 
        id: postId,
        likes: {
          some: { id: session.user.id }
        }
      }
    });

    if (existingLike) {
      return { success: false, message: "Already liked" };
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          connect: { id: session.user.id }
        }
      },
      include: {
        _count: {
          select: { likes: true }
        }
      }
    });

    if (authorId !== session.user.id) {
      await prisma.notification.create({
        data: {
          type: "LIKE",
          triggerPostId: postId,
          userId: updatedPost.userId,
          authorId: session.user.id
        }
      });

      // TODO: Send push notification
    }

    return { 
      success: true, 
      totalLikes: updatedPost._count.likes 
    };
  }
);

export const unlikePost = authActionClient.schema(LikePostUpdate).action(
  async ({ parsedInput: { postId, authorId }, ctx: { session } }) => {
    const existingLike = await prisma.post.findFirst({
      where: { 
        id: postId,
        likes: {
          some: { id: session.user.id }
        }
      }
    });

    if (!existingLike) {
      return { success: false, message: "Not liked" };
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          disconnect: { id: session.user.id }
        }
      },
      include: {
        _count: {
          select: { likes: true }
        }
      }
    });

    if (authorId !== session.user.id) {
      const notification = await prisma.notification.findFirst({
        where: {
          type: "LIKE",
          triggerPostId: postId,
          userId: updatedPost.userId,
          authorId: session.user.id
        }
      });
  
      if (notification) {
        await prisma.notification.delete({
          where: { id: notification.id }
        });
      }
    }

    return { 
      success: true,
      totalLikes: updatedPost._count.likes 
    };
  }
);