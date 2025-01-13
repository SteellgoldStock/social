import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getNotifications, 
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  createNotification
} from "./notification.action";
import { NotificationType } from "@prisma/client";

// Queries
export const getNotificationsQuery = () => {
  return {
    queryKey: ["notifications"],
    queryFn: () => getNotifications()
  } satisfies UseQueryOptions;
}

export const getUnreadCountQuery = () => {
  return {
    queryKey: ["notifications", "unread"],
    queryFn: () => getUnreadNotificationsCount()
  } satisfies UseQueryOptions;
}

export const useNotifications = () => {
  return useQuery(getNotificationsQuery());
}

export const useUnreadNotificationsCount = () => {
  return useQuery({
    ...getUnreadCountQuery()
  });
}

// Mutations
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => markNotificationAsRead({ notificationId}),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["notifications"]
      });
    }
  });
}

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsAsRead(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["notifications", variables]
      });
      queryClient.invalidateQueries({ 
        queryKey: ["notifications", "unread", variables]
      });
    }
  });
}

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      userId,
      authorId,
      postId = null
    }: {
      type: NotificationType;
      userId: string;
      authorId: string;
      postId?: string | null;
    }) => createNotification({ type, userId, authorId, postId }),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["notifications"]
      });

      queryClient.invalidateQueries({ 
        queryKey: ["notifications", "unread"]
      });
    }
  });
}