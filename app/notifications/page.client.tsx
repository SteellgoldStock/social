"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNotifications } from "@/lib/actions/notifications/notification.hook";
import { useSession } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

export const NotificationsPageClient = (): ReactElement => {
  const { data: session } = useSession();
  const { data: notifications, isLoading } = useNotifications(session?.user.id ?? "");

  const router = useRouter();

  const t = useTranslations("NotificationsPage");

  return (
    <div className="container mx-auto">
      {notifications && (
        <div>
          {
            notifications.map((notification, index) => (
              <div
                onClick={() => {
                  if (notification.type === "FOLLOW") {
                    router.push(`/${notification.author.username}`);
                  } else if (notification.type === "MENTION" || notification.type === "COMMENT") {
                    router.push(`/${notification.triggerPost?.user.username}/post/${notification.triggerPost?.id}`);
                  } else if (notification.type === "LIKE") {
                    router.push(`/${notification.post?.user.username}/post/${notification.post?.id}`);
                  }
                }} 
                key={notification.id}
                className={cn(
                  "flex flex-row items-center gap-2.5 py-3 px-4 cursor-pointer",
                  "hover:bg-neutral-100 dark:hover:bg-[#1d1c1c] transition-colors",
                  {
                    "border-l border-r border-b rounded-b-lg": index === notifications.length - 1,
                    "border-l border-r border-t rounded-t-lg": index === 0,
                    "border-r border-l": index !== 0 && index !== notifications.length - 1
                  }
                )}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{notification.author.name ? notification.author.name[0] : "?"}</AvatarFallback>
                  <AvatarImage src={notification.author.image ?? ""} alt={notification.author.name ?? ""} />
                </Avatar>
                <div className="flex-1">
                  <p>
                    {
                      notification.type === "FOLLOW"
                        ? t.rich("Notification.FOLLOW", {
                          username: notification.author.name, strong: (chunks) => <span className="font-bold">{chunks}</span> })
                        : notification.type === "LIKE"
                          ? t.rich("Notification.LIKE", {
                            username: notification.author.name, strong: (chunks) => <span className="font-bold">{chunks}</span> })
                          : notification.type === "COMMENT"
                            ? t.rich("Notification.COMMENT", {
                              username: notification.author.name, strong: (chunks) => <span className="font-bold">{chunks}</span> })
                            : notification.type === "MENTION"
                              ? t.rich("Notification.MENTION", {
                                username: notification.author.name, strong: (chunks) => <span className="font-bold">{chunks}</span> })
                              : undefined
                    }
                  </p>
                  <span className="block text-neutral-500 dark:text-neutral-40 text-xs">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}