"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XTextarea } from "@/components/ui/x-textarea";
import { useCreatePost } from "@/lib/actions/posts/posts.actions";
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
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
        </CardHeader>

        <CardContent>
          <XTextarea placeholder="What's on your mind?" onChange={setContent} />
        </CardContent>

        <CardFooter className="justify-end">
          <Button variant="default" size="sm" onClick={handlePost}>
            Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NewPostPage;