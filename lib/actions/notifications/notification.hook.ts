import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getNotifications, 
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "./notification.action";

// Queries
export function getNotificationsQuery(userId: string) {
  return {
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId)
  } satisfies UseQueryOptions;
}

export function getUnreadCountQuery(userId: string) {
  return {
    queryKey: ["notifications", "unread", userId],
    queryFn: () => getUnreadNotificationsCount(userId)
  } satisfies UseQueryOptions;
}

export function useNotifications(userId: string) {
  return useQuery(getNotificationsQuery(userId));
}

export function useUnreadNotificationsCount(userId: string) {
  return useQuery(getUnreadCountQuery(userId));
}

// Mutations
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => markNotificationAsRead(notificationId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["notifications"]
      });
    }
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => markAllNotificationsAsRead(userId),
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