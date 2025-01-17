import { useMutation } from "@tanstack/react-query";
import { createPost } from "./posts.actions";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (data: { content: string; parentId?: string, comment?: boolean }) => createPost(data),
  });
}