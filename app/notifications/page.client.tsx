"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/lib/actions/notifications/notification.hook";
import { useSession } from "@/lib/auth/client";
import { ParseText } from "@/lib/parser";
import { cn } from "@/lib/utils";
import { ArrowRight, AtSign, Bell, CornerDownRight, Heart, MessageCircle, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import NotificationsLoading from "./loading";

const iconMap = {
  FOLLOW: UserPlus,
  LIKE: Heart,
  COMMENT: MessageCircle,
  MENTION: AtSign,
};

const colorMap = {
  FOLLOW: 'text-green-500',
  LIKE: 'text-red-500',
  COMMENT: 'text-blue-500',
  MENTION: 'text-purple-500',
};

export const NotificationsPageClient = (): ReactElement => {
  const { data: session } = useSession();
  const { data: notifications, isLoading } = useNotifications(session?.user.id ?? "");

  const router = useRouter();

  const t = useTranslations("NotificationsPage");

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("Notifications")}
        </h1>
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-2 bg-background border px-3 py-1 rounded-full">
            <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">18</span>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            // onClick={handleMarkAllAsRead}
            // disabled={unreadCount === 0}
          >
            {t("MarkAllAsRead")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {isLoading && <NotificationsLoading withHeader={false} />}

        {notifications && notifications.length > 0 && !isLoading && notifications.map((notification, index) => {
          const Icon = iconMap[notification.type];
          
          return (
            <div
              key={notification.id}
              onClick={() => {
                if (notification.type === "FOLLOW") {
                  router.push(`/${notification.author.username}`);
                } else if (notification.type === "MENTION" || notification.type === "COMMENT") {
                  router.push(`/${notification.triggerPost?.user.username}/${notification.triggerPost?.id}`);
                } else if (notification.type === "LIKE") {
                  router.push(`/${notification.post?.user.username}/${notification.post?.id}`);
                }
              }}
              
              className={cn(
                "flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer",
                notification.read ? "border bg-transparent" : "bg-white/10",
                "hover:bg-gray-300/30 dark:hover:bg-neutral-700/10"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback>{notification.author.name ? notification.author.name[0] : "?"}</AvatarFallback>
                <AvatarImage src={notification.author.image ?? ""} alt={notification.author.name ?? ""} />
              </Avatar>

              <div className="flex-1 space-y-1s">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {t.rich(`Notification.${notification.type}`, {
                    username: notification.author.name,
                    strong: (chunks) => <span className="font-semibold">{chunks}</span>
                  })}
                </p>

                {notification.post && (
                  <div className="flex items-start gap-1 text-sm text-gray-400">
                    <div className="pt-1">
                      {notification.type === "MENTION" ? (
                        <CornerDownRight className="h-4 w-4" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </div>
      
                    <p className="flex-1">
                      <ParseText text={notification.post.content} />
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-2 mt-1">
                  <Icon className={cn("h-3 w-3", colorMap[notification.type])} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            
            {!notification.read && (
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
};