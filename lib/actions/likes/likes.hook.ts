import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { getLikes, likePost, unlikePost } from "./likes.action";
import { useEffect, useState } from "react";

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
    mutationFn: (postId: string) => likePost({ postId }),
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
    mutationFn: (postId: string) => unlikePost({ postId }),
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

export const useLike = (postId: string, initialLikesCount: number): UseLikeResult => {
  const { data: userLikes } = useQuery(getLikesQuery());
  const likePostMutation = useLikePost();
  const unlikePostMutation = useUnlikePost();
  
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [optimisticIsLiked, setOptimisticIsLiked] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const isLiked = optimisticIsLiked ?? userLikes?.data?.data.some((like) => like.id === postId);

  useEffect(() => {
    setLikesCount(initialLikesCount);
  }, [initialLikesCount]);

  const toggleLike = async () => {
    const newIsLiked = !isLiked;
    setOptimisticIsLiked(newIsLiked);
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
    
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 50);

    try {
      if (newIsLiked) {
        const result = await likePostMutation.mutateAsync(postId);
        if (!result?.data?.success) {
          setOptimisticIsLiked(null);
          setLikesCount(prev => prev - 1);
        }
      } else {
        const result = await unlikePostMutation.mutateAsync(postId);
        if (!result?.data?.success) {
          setOptimisticIsLiked(null);
          setLikesCount(prev => prev + 1);
        }
      }
    } catch (error) {
      setOptimisticIsLiked(null);
      setLikesCount(newIsLiked ? prev => prev - 1 : prev => prev + 1);
      console.error(error);
    }
  };

  return {
    isLiked: !!isLiked,
    toggleLike,
    isLoading,
    likesCount
  };
};