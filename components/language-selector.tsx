"use client";

import { SidebarMenuButton } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Check, Globe } from "lucide-react";
import { useLanguageStore } from "@/lib/hooks/use-lang";
import { useRouter } from "next/navigation";
import { ISOLang } from "@/lib/types/lang";

type Language = {
  code: ISOLang;
  name: string;
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
]

export const LanguageSelector = () => {
  const { lang, setLang } = useLanguageStore();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton asChild>
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              {languages.find((l) => l.code === lang)?.name}
            </div>
          </Button>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => {
              setLang(language.code);
              router.refresh();
            }}
          >
            <Check
              className={`mr-2 h-4 w-4 ${
                language.code === lang ? "opacity-100" : "opacity-0"
              }`}
            />
            
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}