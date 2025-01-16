import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { getLikes, likePost, unlikePost } from "./likes.action";
import { useEffect, useState } from "react";
import { LikePostUpdateType } from "./likes.type";

// Queries
export const getLikesQuery = () => {
  return {
    queryKey: ["likes"],
    queryFn: () => getLikes()
  } satisfies UseQueryOptions;
}

// Mutations
export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LikePostUpdateType) => likePost({ ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["likes"]
      });
    }
  });
}

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LikePostUpdateType) => unlikePost({ ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["likes"]
      });
    }
  });
}

type UseLikeResult = {
  isLiked: boolean;
  toggleLike: () => void;
  isLoading: boolean;
  likesCount: number;
}

export const useLike = (postId: string, initialLikesCount: number, authorId: string): UseLikeResult => {
  const { data: userLikes } = useQuery(getLikesQuery());
  const likePostMutation = useLikePost();
  const unlikePostMutation = useUnlikePost();
  
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [optimisticIsLiked, setOptimisticIsLiked] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false);
  
  const isLiked = optimisticIsLiked ?? userLikes?.data?.data.some((like) => like.id === postId);

  useEffect(() => setLikesCount(initialLikesCount), [initialLikesCount]);

  const toggleLike = async () => {
    if (isRequestPending) return;

    const newIsLiked = !isLiked;
    setOptimisticIsLiked(newIsLiked);
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
    
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);

    setIsRequestPending(true);

    try {
      if (newIsLiked) {
        const result = await likePostMutation.mutateAsync({ postId, authorId });
        if (!result?.data?.success) {
          setLikesCount(prev => prev - 1);
          setOptimisticIsLiked(null);
        }
      } else {
        const result = await unlikePostMutation.mutateAsync({ postId, authorId });
        if (!result?.data?.success) {
          setLikesCount(prev => prev + 1);
          setOptimisticIsLiked(null);
        }
      }
    } catch (error) {
      setLikesCount(newIsLiked ? prev => prev - 1 : prev => prev + 1);
      setOptimisticIsLiked(null);
      console.error(error);
    } finally {
      setIsRequestPending(false);
    }
  };

  return {
    isLiked: !!isLiked,
    toggleLike,
    isLoading,
    likesCount
  };
};