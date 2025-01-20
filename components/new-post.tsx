"use client";

import { Button } from "@/components/ui/button";
import { Component } from "@/lib/types";
import { useCreatePost } from "@/lib/actions/posts/posts.hook";
import { toast } from "sonner";
import { PencilLine, Bold, Italic } from "lucide-react";
import { useState } from "react";
import { XTextarea } from "@/components/ui/x-textarea";
import { MAX_POST_LENGTH } from "@/lib/consts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NewPostProps = {
  parentId?: string;
  onSubmit?: () => void;
  placeholder?: string;
  submitLabel?: string;
  loadingLabel?: string;
  errorLabel?: string;
  successLabel?: string;
};

export const NewPost: Component<NewPostProps> = ({
  parentId,
  onSubmit,
  placeholder = "What's on your mind?",
  submitLabel = "Post",
  loadingLabel = "Posting...",
  errorLabel = "Failed to post",
  successLabel = "Posted successfully!",
}) => {
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  
  const createPost = useCreatePost();

  const handleContentChange = (newContent: string) => {
    if (newContent.length <= MAX_POST_LENGTH) {
      setContent(newContent);
      setCharCount(newContent.length);
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

  const handleSubmit = async () => {
    if (content.trim().length === 0) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      await toast.promise(
        createPost.mutateAsync({ 
          content,
          ...(parentId && { parentId })
        }),
        {
          loading: loadingLabel,
          success: () => {
            setContent("");
            onSubmit?.();
            return successLabel;
          },
          error: errorLabel,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
      </div>

      <XTextarea
        placeholder={placeholder}
        onChange={handleContentChange}
        value={content}
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{charCount}/{MAX_POST_LENGTH}</span>
        <Button
          onClick={handleSubmit}
          disabled={content.trim().length === 0 || createPost.isPending}
        >
          {createPost.isPending ? loadingLabel : submitLabel}
        </Button>
      </div>
    </div>
  );
};

type PostDialogProps = NewPostProps & {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  cancelLabel?: string;
};

export const PostDialog: Component<PostDialogProps> = ({
  trigger,
  children,
  title = "Create a new post",
  description = "Share your thoughts with the world",
  cancelLabel = "Cancel",
  ...newPostProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultTrigger = (
    <Button variant="default" size="sm" className="gap-2">
      <PencilLine className="h-4 w-4" />
      New Post
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <NewPost 
          {...newPostProps} 
          onSubmit={() => {
            setIsOpen(false);
            newPostProps.onSubmit?.();
          }}
        />

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            {cancelLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};