"use server";

import { MAX_POST_LENGTH } from "@/lib/consts";
import { prisma } from "@/lib/db/prisma";
import { generateId } from "@/lib/generator";
import { authActionClient } from "@/lib/safe-action";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// Input Validation Schemas
const CreatePostInput = z.object({
  content: z.string().min(1).max(MAX_POST_LENGTH),
  parentId: z.string().optional(),
  comment: z.boolean().default(false),
});

// Actions
export const createPost = authActionClient.schema(CreatePostInput).action(
  async ({ parsedInput: { content, parentId, comment }, ctx: { session } }): Promise<Prisma.PostGetPayload<{
    select: {
      id: true,
    }
  }>> => {
    const thisPost = 
      comment ? await prisma.post.update({
        where: { id: parentId },
        data: {
          comments: {
            create: {
              id: generateId(),
              content: content.replace(/\n/g, "\n\n"),
              userId: session.user.id
            }
          }
        }
      }) : await prisma.post.create({
        data: {
          id: generateId(),
          content: content.replace(/\n/g, "\n\n"),
          parentId,
          userId: session.user.id
        },
        select: {
          id: true,
        }
      });

    const mentions = content.match(/@\w+/g);
    if (mentions) {
      const users = await prisma.user.findMany({
        where: {
          username: {
            in: mentions.map((mention) => mention.slice(1)),
            mode: "insensitive"
          }
        },
        select: {
          id: true
        }
      });

      const filteredUsers = users.filter(user => user.id !== session.user.id);

      await prisma.notification.createMany({
        data: filteredUsers.map((user) => ({
          userId: user.id,
          authorId: session.user.id,
          type: "MENTION",
          postId: thisPost.id,
        }))
      });
    }

    if (comment) {
      const parentPost = await prisma.post.findFirst({ where: { id: parentId } });
      if (!parentPost) return thisPost;

      await prisma.notification.create({
        data: {
          userId: parentPost.userId,
          authorId: session.user.id,
          type: "COMMENT",
          postId: parentId,
        }
      });
    }

    return thisPost;
  }
);