"use client"

import { Loader2, LogOut, Settings, User } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { client, signOut, useSession } from "@/lib/auth/client"
import { useRouter } from "next/navigation"
import { Component } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { APP_NAME } from "@/lib/consts"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"

type NavUserProps = {
  user: {
    name: string
    handle: string
    avatar: string
  }
}

export const NavUser: Component<NavUserProps> = ({ user }) => {
  const [logining, setLogining] = useState<false | "Google" | "Github">(false);
  const { data: session, isPending } = useSession();
  const { isMobile } = useSidebar()
  const router = useRouter();

  const handle = async(type: "Google" | "Github") => {
    setLogining(type);

    const login = await client.signIn.social({
      provider: type.toLowerCase() as "google" | "github"
    })

    if (login.error) {
      toast.error(login.error.message);
      setLogining(false);
    }
  }


  if (isPending) {
    return (
      <div className="flex flex-row items-center space-x-4">
        <Skeleton className="h-9 w-9 rounded-full" />

        <div className="grid flex-1 text-left text-sm leading-tight space-y-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <Card className="shadow-none dark:bg-[#09090b]">
        <form>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm">
              Welcome to {APP_NAME}
            </CardTitle>
            <CardDescription>
              Sign in to access your account and start sharing your thoughts with the world.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col sm:flex-row gap-1 p-4">
            <Button size="sm" onClick={() => handle("Google")} disabled={logining !== false} className="w-full"> 
              {logining == "Google" ? <Loader2 className="animate-spin h-4 w-4" /> : <FaGoogle className="h-4 w-4" />}
              {/* Login with Google */}
            </Button>

            <Button size="sm" onClick={() => handle("Github")} disabled={logining !== false} className="w-full">
              {logining == "Github" ? <Loader2 className="animate-spin h-4 w-4" /> : <FaGithub className="h-4 w-4" />}
              {/* Login with Github */}
            </Button>
          </CardContent>
        </form>
      </Card>
    )
  }

  const handleLogout = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    await signOut();
    router.refresh();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.handle}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            side={isMobile ? "top" : "right"}
          >
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}