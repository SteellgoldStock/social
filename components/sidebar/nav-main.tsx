"use client"

import { LucideIcon } from "lucide-react"

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { Component } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { getNotificationsQuery } from "@/lib/actions/notifications/notification.hook"
import { useSession } from "@/lib/auth/client"

type NavMainProps = {
  items: {
    title: string
    url: string
    icon: LucideIcon
    numberBadge?: number;
  }[]
}

export const NavMain: Component<NavMainProps> = ({ items }) => {
  const t = useTranslations("Sidebar");

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <>
            {item.url === "/notifications"
              ? <Notifications item={item} key={item.title} />
              : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url} prefetch passHref>
                      <item.icon strokeWidth={2.5} />
                      <span>{t(item.title)}</span>
                      {item.numberBadge ? (
                        <span className={cn(
                          "absolute right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-primary rounded-full"
                        )}>
                          {item.numberBadge > 99 ? "99+" : item.numberBadge}
                        </span>
                      ) : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            }
          </>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const Notifications: Component<{
  item: {
    title: string
    url: string
    icon: LucideIcon
    numberBadge?: number;
  }
}> = ({ item }) => {
  const t = useTranslations("Sidebar");
  const queryClient = useQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["notifications"],
      queryFn: () => getNotificationsQuery(),
      staleTime: 2 * 60 * 1000
    });
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title}>
        <Link href={item.url} onMouseEnter={() => prefetch()}>
          <item.icon strokeWidth={2.5} />
          <span>{t(item.title)}</span>
          {item.numberBadge ? (
            <span className={cn(
              "absolute right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-primary rounded-full"
            )}>
              {item.numberBadge > 99 ? "99+" : item.numberBadge}
            </span>
          ) : null}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}