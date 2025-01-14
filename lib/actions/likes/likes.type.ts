import { z } from "zod";

export type LikePostUpdateType = z.infer<typeof LikePostUpdate>;

export const LikePostUpdate = z.object({
  postId: z.string(),
  authorId: z.string()
});