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
import { Loader2, PencilRuler } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

type BannerProfileProps = {
  user: User;
  isOwner: boolean;
}

export const BannerProfile: Component<BannerProfileProps> = ({ user, isOwner }) => {
  const [isHover, setIsHover] = useState(false);
  const [newURL, setNewURL] = useState<string | null>(null);

  const t = useTranslations("BannerProfileDialog");

  const [uploading, setUploading] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={!isOwner} className="w-full">
        <div
          className={cn("relative w-full rounded-t-lg overflow-hidden", {
            "h-32 sm:h-60": user.banner,
            "h-32": !user.banner
          })}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {newURL ?? user.banner ? (
            <img
              src={(newURL ?? user.banner) ?? ""}
              alt={`${user.name}'s banner`}
              className="w-full h-full object-cover block object-center rounded-lg"
            />
          ) : (
            <div className="w-full h-32 bg-[#e4e6e7] dark:bg-[#252525] rounded-lg" />
          )}

          {isHover && isOwner && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
              <div className="bg-black flex items-center justify-center p-3 rounded-full bg-opacity-50">
                <PencilRuler size={24} color="white" />
              </div>
            </div>
          )}
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Title")}</AlertDialogTitle>

          <AlertDialogDescription>{t("Description")}</AlertDialogDescription>
        </AlertDialogHeader>

        <ImageUploadZone
          type="banner"
          maxFileSizeMB={2}
          uploadEndpoint="/api/user/files/banner"
          onFileSelected={() => setUploading(true)}

          onUploadComplete={() => {
            setUploading(false);
            toast.success(t("UploadSuccess"));
          }}

          onUploadError={(error) => toast.error(error)}
          
          updateFunction={async(imageUrl: string) => {
            await client.updateUser({
              // @ts-ignore
              banner: imageUrl
            })

            setNewURL(imageUrl)
          }}
        />

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