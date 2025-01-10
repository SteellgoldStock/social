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
import { Loader2, PencilRuler, UserCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAX_DISPLAY_NAME_LENGTH, MIN_DISPLAY_NAME_LENGTH } from "@/lib/consts";

type NameProfileProps = {
  user: User;
  isOwner: boolean;
  editMode?: boolean;
}

export const NameProfile: Component<NameProfileProps> = ({ user, isOwner, editMode }) => {
  const [isHover, setIsHover] = useState(false);
  const [newName, setNewName] = useState<string | null>(null);
  const [tempName, setTempName] = useState(user.name || "");

  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const t = useTranslations("NameProfileDialog");
  const errors = useTranslations("Errors");

  const handleUpdate = async () => {
    if (updating) {
      toast.error(t("UpdateError"));
      return;
    }

    if (
      tempName.length < MIN_DISPLAY_NAME_LENGTH
      || tempName.length > MAX_DISPLAY_NAME_LENGTH
    ) {
      toast.error(
        errors("UpdateErrorLength", {
          field: t("Field"),
          min: MIN_DISPLAY_NAME_LENGTH,
          max: MAX_DISPLAY_NAME_LENGTH
        })
      );
      return;
    }

    if (tempName === user.name) {
      toast.error(errors("ErrorSame"));
      return;
    }

    try {
      setUpdating(true);
      await client.updateUser({
        name: tempName
      });

      setNewName(tempName);
      toast.success(t("UpdateSuccess"));
      setIsOpen(false);
    } catch (error) {
      toast.error(t("UpdateError"));
    } finally {
      setUpdating(false);
      setIsOpen(false);
    }
  };

  if (!isOwner || !editMode) return (
    <h1 className="text-2xl font-bold flex flex-row items-center gap-2 -mt-3">
      {newName ?? user.name}
      {user.isVerified && <span className="text-blue-500">✔</span>}
    </h1>
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger disabled={!isOwner} className="flex shrink-0">
        <div
          className="relative -mt-3"
          onMouseEnter={() => setIsHover(true)} 
          onMouseLeave={() => setIsHover(false)}
        >
          <div>
            {(newName ?? user.name) && (
              <h1 className={cn(
                "text-2xl font-bold flex flex-row items-center gap-2", {
                  "px-1": isHover,
                }
              )}>
                {newName ?? user.name}
                {user.isVerified && <span className="text-blue-500">✔</span>}
              </h1>
            )}
          </div>

          {isOwner && isHover && (
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center cursor-pointer">
              <div className="flex items-center justify-center">
                <PencilRuler size={21} color="white" />
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
          <Input
            onChange={(e) => setTempName(e.target.value)}
            placeholder={t("Placeholder")}
            defaultValue={tempName}
            minLength={3}
            maxLength={16}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={updating}>
            {t("Close")}
          </AlertDialogCancel>

          <Button
            onClick={handleUpdate}
            disabled={
              updating ||
              tempName === user.name ||
              tempName.length < MIN_DISPLAY_NAME_LENGTH ||
              tempName.length > MAX_DISPLAY_NAME_LENGTH
            }
          >
            {updating && <Loader2 className="animate-spin mr-2" />}
            {updating ? t("Updating") : t("Update")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};