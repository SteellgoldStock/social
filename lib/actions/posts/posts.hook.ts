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
  parentId: z.string().optional()
});

// Actions
export const createPost = authActionClient.schema(CreatePostInput).action(
  async ({ parsedInput: { content, parentId }, ctx: { session } }): Promise<Prisma.PostGetPayload<{
    select: {
      id: true,
    }
  }>> => {
    const thisPost = await prisma.post.create({
      data: {
        id: generateId(),
        content,
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

      await prisma.notification.createMany({
        data: users.map((user) => ({
          userId: user.id,
          authorId: session.user.id,
          type: "MENTION",
          postId: thisPost.id,
        }))
      });
    }

    return thisPost;
  }
);