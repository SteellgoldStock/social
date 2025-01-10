"use client";

import { ImageUploadZone } from "@/components/image-upload-zone";
import {
  AlertDialog, AlertDialogAction, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { client } from "@/lib/auth/client";
import { Component } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2, PencilRuler, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

type AvatarProfileProps = {
  user: User;
  isOwner: boolean;
}

export const AvatarProfile: Component<AvatarProfileProps> = ({ user, isOwner }) => {
  const [isHover, setIsHover] = useState(false);
  const [newURL, setNewURL] = useState<string | null>(null);

  const t = useTranslations("AvatarProfileDialog");

  const [uploading, setUploading] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={!isOwner} className="w-full">
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          {newURL ?? user.image ? (
            <img
              src={(newURL ?? user.image) ?? ""}
              alt="Profile"
              className={cn(
                "-mt-12 sm:-mt-20 h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32",
                "bg-[#F9FAFB] dark:bg-[#1A1A1A]",
                "border-4 border-[#F9FAFB] dark:border-[#1A1A1A]",
                "rounded-full shadow-lg"
              )}
            />
          ) : (
            <div
              className={cn(
                "-mt-12 sm:-mt-20 h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32",
                "bg-[#F9FAFB] dark:bg-[#1A1A1A]",
                "border-4 border-[#e4e8ec] dark:border-[#252323]",
                "rounded-full shadow-lg",
                "flex items-center justify-center"
              )}
            >
              <UserIcon className="h-16 w-16" strokeWidth={2} />
            </div>
          )}

          {isOwner && isHover && (
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center cursor-pointer">
              <div className="bg-black flex items-center justify-center p-3 rounded-full bg-opacity-50">
                <PencilRuler size={24} color="white" />
              </div>
            </div>
          )}
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Title")}</AlertDialogTitle>

          <AlertDialogDescription>{t("Description")}</AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex justify-center">
          <ImageUploadZone
            type="avatar"
            maxFileSizeMB={2}
            uploadEndpoint="/api/user/files/avatar"
            onFileSelected={() => setUploading(true)}

            onUploadComplete={() => {
              setUploading(false);
              toast.success(t("UploadSuccess"));
            }}

            onUploadError={(error) => toast.error(error)}

            updateFunction={async(imageUrl: string) => {
              await client.updateUser({ image: imageUrl })
              setNewURL(imageUrl)
            }}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogAction disabled={uploading}>
            {uploading && <Loader2 className="animate-spin" />}
            {uploading ? t("Uploading") : t("Close")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};