"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Component } from "@/lib/types";
import { useCreatePost } from "@/lib/actions/posts/posts.hook";
import { toast } from "sonner";
import { PencilLine, Bold, Italic } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { XTextarea } from "@/components/ui/x-textarea";
import { useTranslations } from "next-intl";
import { MAX_POST_LENGTH } from "@/lib/consts";

type PostDialogProps = PropsWithChildren & {
  parentId?: string;
  trigger?: React.ReactNode;
};

const PostDialog: Component<PostDialogProps> = ({ 
  parentId,
  children,
  trigger 
}) => {
  const t = useTranslations(parentId ? "PostReplyDialog" : "NewPostDialog");
  
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const createPost = useCreatePost();

  const handleContentChange = (newContent: string) => {
    if (newContent.length <= MAX_POST_LENGTH) {
      setContent(newContent);
      setCharCount(newContent.length);
    }
  };

  const handleSubmit = async () => {
    if (content.trim().length === 0) {
      toast.error(t("Errors.EmptyContent"));
      return;
    }

    try {
      await toast.promise(
        createPost.mutateAsync({ 
          content,
          ...(parentId && { parentId })
        }),
        {
          loading: t("Toast.Loading"),
          success: () => {
            setIsOpen(false);
            setContent("");
            return t("Toast.Success");
          },
          error: t("Toast.Error"),
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const insertMarkdown = (type: "bold" | "italic") => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = "";
    switch (type) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        newText = `*${selectedText || "italic text"}*`;
        break;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    if (newContent.length <= MAX_POST_LENGTH) {
      setContent(newContent);
      setCharCount(newContent.length);
    }
  };

  const defaultTrigger = (
    <Button variant="default" size="sm" className="gap-2">
      <PencilLine className="h-4 w-4" />
      {t("Trigger")}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("Title")}</DialogTitle>
          <DialogDescription>
            {t("Description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertMarkdown("bold")}
              title={t("Buttons.Bold")}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertMarkdown("italic")}
              title={t("Buttons.Italic")}
            >
              <Italic className="h-4 w-4" />
            </Button>
          </div>

          <XTextarea
            placeholder={t("Placeholder")}
            onChange={handleContentChange}
            value={content}
          />

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{charCount}/{MAX_POST_LENGTH}</span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            {t("Buttons.Cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={content.trim().length === 0 || createPost.isPending}
          >
            {createPost.isPending ? t("Buttons.Loading") : t("Buttons.Submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;