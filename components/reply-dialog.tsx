import { Component } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { PropsWithChildren, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { XTextarea } from "./ui/x-textarea";
import { useCreatePost } from "@/lib/actions/posts/posts.actions";
import { toast } from "sonner";

type PostReplyDialogProps = PropsWithChildren & {
  parentId: string;
};

export const PostReplyDialog: Component<PostReplyDialogProps> = ({ parentId, children }) => {
  const t = useTranslations("PostReplyDialog");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const createPost = useCreatePost();

  const handleReply = async () => {
    toast.promise(
      createPost.mutateAsync({
        content,
        parentId
      }),
      {
        loading: "Replying...",
        success: "Replied!",
        error: "Failed to reply."
      }
    )
  }

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

        <XTextarea placeholder={t("Placeholder")} onChange={(e) => setContent(e)} />

        <DialogFooter className="flex flex-row items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>{t("Buttons.Cancel")}</Button>
          <Button onClick={() => handleReply()}>
            {t("Buttons.Reply")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}