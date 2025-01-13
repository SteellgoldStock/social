import { Component } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { PropsWithChildren, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { XTextarea } from "./ui/x-textarea";

type PostReplyDialogProps = PropsWithChildren & {
  postId: string;
};

export const PostReplyDialog: Component<PostReplyDialogProps> = ({ postId, children }) => {
  const t = useTranslations("PostReplyDialog");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("Title")}</DialogTitle>
          <DialogDescription>{t("Description")}</DialogDescription>
        </DialogHeader>

        <XTextarea placeholder={t("Placeholder")} />

        <DialogFooter className="flex flex-row items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>{t("Buttons.Cancel")}</Button>
          <Button>{t("Buttons.Reply")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}