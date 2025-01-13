"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XTextarea } from "@/components/ui/x-textarea";
import { useCreatePost } from "@/lib/actions/posts/posts.actions";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const NewPostPage = () => {
  const [content, setContent] = useState("");

  const createPost = useCreatePost();

  const handlePost = async () => {
    console.log(content);
    toast.promise(
      createPost.mutateAsync({ content }),
      {
        loading: "Posting...",
        success: "Post created!",
        error: "Failed to create post",
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
        </CardHeader>

        <CardContent>
          <XTextarea placeholder="What's on your mind?" onChange={setContent} />
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <p className="text-xs text-gray-500 mb-2">
            Markdown is supported.* <Link href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Learn more</Link>
          </p>

          <Button variant="default" size="sm" onClick={handlePost}>
            Post
          </Button>
        </CardFooter>
      </Card>

      <div className="text-xs text-gray-500 mt-2">
        * Only basic markdown, such as bold, italic, underline, and links are supported.
      </div>
    </div>
  );
}

export default NewPostPage;