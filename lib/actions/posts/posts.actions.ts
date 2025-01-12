import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "./posts.hook";

export function useCreatePost() {
  return useMutation({
    mutationFn: (data: { content: string; parentId?: string }) => createPost(data),
  });
}