"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Home, LogOut, Mail } from "lucide-react";
import Link from "next/link";
import React, { ReactElement } from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ui/theme-switcher";
import { signOut, useSession } from "@/lib/auth/client";
import { LanguageSelector } from "./language-selector";
import { useRouter } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/messages" },
]

export const Sidebar = (): ReactElement => {
  const { data } = useSession();
  const router = useRouter();

  const handleLogout = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    await signOut();
    router.refresh();
  }

  return (
    <aside className="group w-[70px] py-3 hidden md:block h-screen sticky top-0 overflow-y-auto flex">
      <div className="flex flex-col h-full items-center">
        <nav className="flex flex-col w-full items-center space-y-1">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" className="rounded-full" size={"icon"} asChild>
              <Link href={item.href}>
                <item.icon />
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex flex-col items-center mt-auto gap-0.5">
          {data ? (
            <Button variant="outline" className="rounded-full" asChild size={"icon"}>
              <Link href={`/${data.user.username}`}>
                <Avatar className="h-7 w-7">
                  <AvatarImage src={data.user.image ?? ""} alt={data.user.name} />
                  <AvatarFallback>{data.user.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          ) : <></>}

          {data && (
            <Button variant="outline" size={"icon"} onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}

          <LanguageSelector />
          <ThemeSwitcher />
        </div>
      </div>
    </aside>
  )
}