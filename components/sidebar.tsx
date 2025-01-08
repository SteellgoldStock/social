"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Home, UserPlus } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ui/theme-switcher";
import { useSession } from "@/lib/auth/client";
import { LanguageSelector } from "./language-selector";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
]

export const Sidebar = (): ReactElement => {
  const { data } = useSession();

  return (
    <aside className="w-[70px] p-4 space-y-4 hidden md:block h-screen sticky top-0 overflow-y-auto">
      <div className="flex flex-col h-full">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" className="rounded-full" asChild size={"icon"}>
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </nav>

        <div className="mt-auto pt-4 space-y-1">
          {data ? (
            <Button variant="outline" asChild size={"icon"}>
              <Link href={`/${data.user.name}`}>
                <Avatar className="h-7 w-7">
                  <AvatarImage src={data.user.image ?? ""} alt={data.user.name} />
                  <AvatarFallback>{data.user.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild size={"icon"}>
              <Link href="/register">
                <UserPlus className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <LanguageSelector />
          <ThemeSwitcher />
        </div>
      </div>
    </aside>
  )
}