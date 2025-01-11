import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getNotifications, 
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "./notification.action";

// Queries
export const getNotificationsQuery = (userId: string) => {
  return {
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId),
    staleTime: 30 * 1000,
    placeholderData: (previousData: any) => previousData
  } satisfies UseQueryOptions<
    Awaited<ReturnType<typeof getNotifications>>,
    Error,
    Awaited<ReturnType<typeof getNotifications>>
  >;
}

export const getUnreadCountQuery =(userId: string) => {
  return {
    queryKey: ["notifications", "unread", userId],
    queryFn: () => getUnreadNotificationsCount(userId),
    staleTime: 30 * 1000,
    placeholderData: (previousData: any) => previousData
  } satisfies UseQueryOptions<
    number,
    Error,
    number
  >;
}

export const useNotifications = (userId: string) => {
  return useQuery({
    ...getNotificationsQuery(userId),
    refetchOnMount: "always",
    refetchOnWindowFocus: true
  });
}

export const useUnreadNotificationsCount = (userId: string) => {
  return useQuery({
    ...getUnreadCountQuery(userId),
    refetchOnMount: "always",
    refetchOnWindowFocus: true
  });
}

// Mutations
export const useMarkAsRead = () => {
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

export const useMarkAllAsRead = () => {
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