"use client";

import { useMarkAllAsRead, useMarkAsRead, useNotifications, useUnreadNotificationsCount } from "@/lib/actions/notifications/notification.hook";
import { useSession } from "@/lib/auth/client";
import { useTranslations } from "next-intl";
import { ReactElement, useEffect } from "react";

export const NotificationsPageClient = (): ReactElement => {
  const { data: session } = useSession();

  const { data: notifications } = useNotifications(session?.user.id ?? "");
  const { data: unreadCount } = useUnreadNotificationsCount(session?.user.id ?? "");
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead } = useMarkAllAsRead();

  const t = useTranslations("NotificationsPage");

  useEffect(() => {
    if (unreadCount) {
      markAllAsRead(session?.user.id ?? "");
    }
  }, [unreadCount]);

  if (!session) return <></>;

  return (
    <>
      <p>
        Vous avez ({unreadCount}) notifications non lues.
      </p>
    </>
  );
}