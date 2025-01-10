"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMarkAllAsRead, useMarkAsRead, useNotifications, useUnreadNotificationsCount } from "@/lib/actions/notifications/notification.hook";
import { useSession } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import { AtSign, CornerDownRight, Heart, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactElement, useEffect } from "react";

export const NotificationsPageClient = (): ReactElement => {
  const { data: session } = useSession();

  const { data: notifications } = useNotifications(session?.user.id ?? "");
  const { data: unreadCount } = useUnreadNotificationsCount(session?.user.id ?? "");
  // const { mutate: markAsRead } = useMarkAsRead();
  // const { mutate: markAllAsRead } = useMarkAllAsRead();

  const t = useTranslations("NotificationsPage");

  // useEffect(() => {
  //   if (unreadCount) {
  //     markAllAsRead(session?.user.id ?? "");
  //   }
  // }, [unreadCount]);

  if (!session) return <></>;

  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex flex-col">
        {notifications?.map((notification, index) => (
          <Link
            key={notification.id}
            href={
              notification.type === "FOLLOW"
                ? `/${notification.author.username}`
                : notification.type === "MENTION" || notification.type === "COMMENT"
                  ? `/${notification.triggerPost?.user.username}/post/${notification.triggerPost?.id}`
                  : notification.type === "LIKE"
                    ? `/${notification.post?.user.username}/post/${notification.post?.id}`
                      : "#"
            }
            className={cn(
              "flex flex-row items-center gap-2.5 py-3 px-4",
              "hover:bg-neutral-100 dark:hover:bg-[#1d1c1c] transition-colors",
              {
                // "bg-neutral-100 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700": !notification.read,
                
                "border-l border-r border-b rounded-b-none rounded": index === notifications.length - 1,
                "border-l border-r border-t rounded-t-none rounded": index === 0,
                "border-r border-l": index !== 0 && index !== notifications.length - 1

                // Notifications styles
                // "border-pink-600 dark:border-pink-800": notification.type === "LIKE"
              }
            )}>
              {notification.author.image ? (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{notification.author.name ? notification.author.name[0] : "?"}</AvatarFallback>
                  <AvatarImage src={notification.author.image} alt={notification.author.name ?? ""} />
                </Avatar>
              ) : (
                <UserPlus className="w-8 h-8" />
              )}

              <div className="flex-1">
                {t.rich("Notification." + notification.type.toUpperCase(), {
                  username: notification.author.name,
                  strong: (chunks) => <span className="font-bold">{chunks}</span>
                })}

                {
                  (
                    notification.type == "COMMENT" ||
                    notification.type == "MENTION"
                  ) && notification.triggerPost && (
                  <div className="text-neutral-500 dark:text-neutral-400 flex -mt-1">
                    <div><CornerDownRight className="w-4 h-4 inline-block" /></div>

                    <p className="inline-block ml-1">
                      {notification.triggerPost.content.slice(0, 65)}...
                    </p>
                  </div>
                )}

                <span className={cn(
                  "block text-neutral-500 dark:text-neutral-40 text-xs", {
                    "mt-2": notification.type !== "LIKE" && notification.type !== "FOLLOW"
                  }
                )}>
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}