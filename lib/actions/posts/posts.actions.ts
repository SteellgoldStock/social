import { useMutation } from "@tanstack/react-query";
import { createPost } from "./posts.hook";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (data: { content: string; parentId?: string }) => createPost(data),
  });
}