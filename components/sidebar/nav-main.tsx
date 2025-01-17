"use client"

import { LucideIcon } from "lucide-react"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { Component } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { ReactElement } from "react"
import NewPostDialog from "../new-post"

type NavMainProps = {
  items: {
    title: string;
    url?: string;
    icon: LucideIcon;
    numberBadge?: number;
    exclude?: boolean;
    onMouseEnter?: () => void;
    onClick?: () => void;
  }[]
}

export const NavMain: Component<NavMainProps> = ({ items }) => {
  const t = useTranslations("Sidebar")

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.onClick ? (
              <SidebarMenuButton tooltip={item.title} onClick={item.onClick} className={cn({
                "mt-3 bg-primary text-primary-foreground": item.exclude,
              })}>
                <item.icon strokeWidth={2.5} />
                <span>{t(item.title)}</span>
                {item.numberBadge ? <NumberBadge number={item.numberBadge} /> : <></>}
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild tooltip={item.title} className={cn({
                "mt-3 bg-primary text-primary-foreground": item.exclude,
              })}>
                <Link 
                  href={item.url || "/"} 
                  prefetch={item.url !== "/notifications"} 
                  passHref={item.url !== "/notifications"}
                  onMouseEnter={item.onMouseEnter}
                >
                  <item.icon strokeWidth={2.5} />
                  <span>{t(item.title)}</span>
                  {item.numberBadge ? <NumberBadge number={item.numberBadge} /> : <></>}
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
        
        <NewPostDialog />
      </SidebarMenu>
    </SidebarGroup>
  )
}

const NumberBadge: Component<{ number: number }> = ({ number }): ReactElement => {
  if (number === 0) return <></>;
  
  return (
    <span className={cn(
      "absolute right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-primary rounded-full"
    )}>
      {number > 99 ? "99+" : number}
    </span>
  )
}