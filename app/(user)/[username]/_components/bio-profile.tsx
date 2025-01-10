"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { client } from "@/lib/auth/client";
import { Component } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2, PencilRuler, TextQuote } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { XTextarea } from "@/components/ui/x-textarea";

type TextProfileProps = {
  user: User;
  isOwner: boolean;
}

const BlankText = (): ReactElement => (
  <div
    className={cn(
      "bg-[#F9FAFB] dark:bg-[#1A1A1A]",
      "border-4 border-[#e4e8ec] dark:border-[#252323]",
      "rounded-lg shadow-lg p-4",
      "flex items-center justify-center"
    )}
  >
    <TextQuote className="h-16 w-16" strokeWidth={2} />
  </div>
)

export const BioProfile: Component<TextProfileProps> = ({ user, isOwner }) => {
  const [isHover, setIsHover] = useState(false);
  const [newText, setNewText] = useState<string | null>(null);
  const [tempText, setTempText] = useState(user.bio || "");

  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const t = useTranslations("TextProfileDialog");

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await client.updateUser({
        // @ts-ignore
        bio: tempText
      });

      setNewText(tempText);
      toast.success(t("UpdateSuccess"));
      setIsOpen(false);
    } catch (error) {
      toast.error(t("UpdateError"));
    } finally {
      setUpdating(false);
      setIsOpen(false);
    }
  };

  if (!isOwner) return (
    <p className="text-gray-400 mt-1">{user.bio}</p>
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger disabled={!isOwner} className="w-full">
        <div
          className="relative mt-2"
          onMouseEnter={() => setIsHover(true)} 
          onMouseLeave={() => setIsHover(false)}
        >
          <div className={cn(
            "border-4 border-[#F9FAFB] dark:border-[#1A1A1A]",
            "rounded-lg",
          )}>
            {newText ?? user.bio ? (
              <p className={cn(
                "text-left text-gray-400 -ml-2.5", {
                  "ml-0": isHover
                }
              )}>{newText ?? user.bio}</p>
            ) : <BlankText />}
          </div>

          {isOwner && isHover && (
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center cursor-pointer">
              <div className="bg-black flex items-center justify-center p-3 rounded-full bg-opacity-50">
                <PencilRuler size={24} color="white" />
              </div>
            </div>
          )}
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-4">{t("Title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("Description")}</AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex flex-col gap-4">
          <XTextarea
            onChange={(e: string) => setTempText(e)}
            placeholder={t("Placeholder")}
            defaultValue={tempText}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={updating}>
            {t("Close")}
          </AlertDialogCancel>

          <Button onClick={handleUpdate} disabled={updating}>
            {updating && <Loader2 className="animate-spin mr-2" />}
            {updating ? t("Updating") : t("Update")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};