import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getNotifications, 
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "./notification.action";

// Queries
export function getNotificationsQuery() {
  return {
    queryKey: ["notifications"],
    queryFn: () => getNotifications()
  } satisfies UseQueryOptions;
}

export function getUnreadCountQuery() {
  return {
    queryKey: ["notifications", "unread"],
    queryFn: () => getUnreadNotificationsCount()
  } satisfies UseQueryOptions;
}

export function useNotifications() {
  return useQuery(getNotificationsQuery());
}

export function useUnreadNotificationsCount() {
  return useQuery({
    ...getUnreadCountQuery()
  });
}

// Mutations
export function useMarkAsRead() {
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

export function useMarkAllAsRead() {
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