import { Bell, Home, User } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/theme-switcher";

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export const Sidebar = (): ReactElement => {
  return (
    <aside className="w-[70px] p-4 space-y-4 hidden lg:block h-screen sticky top-0 overflow-y-auto">
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

        <div className="mt-auto pt-4">
          <ModeToggle />
        </div>
      </div>
    </aside>
  )
}