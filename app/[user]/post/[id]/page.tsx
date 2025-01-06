"use client";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { XTextarea } from "@/components/ui/x-textarea";
import { MAX_POST_LENGTH } from "@/lib/consts";
import { findPost, posts, users } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ReactElement, useState } from "react";

const User = (): ReactElement => {
  const [reply, setReply] = useState("")

  const params = useParams<{ user: string, id: string }>()

  const user = users.find((u) => u.handle.toLowerCase() === params.user.toLowerCase())
  if (!user) return <div>User not found</div>

  const post = findPost(params.id, posts);
  if (!post) return <div>Post not found</div>

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/5 lg:sticky lg:top-8 lg:self-start">
          <Card className={cn(
            "flex flex-col gap-4",
            "bg-[#F9FAFB] dark:bg-[#1A1A1A] border-b border-[#e1e8ed] dark:border-[#343536] p-4"
          )}>
            <PostCard {...post} />

            <Card className={cn(
              "bg-[#F9FAFB] dark:bg-[#1A1A1A]"
            )}>
              <CardContent className="mt-5">
                <XTextarea
                  placeholder="Répondre à ce post..."
                  onChange={(value: string) => setReply(value)}
                />
              </CardContent>

              <CardFooter>
                <div className="flex flex-row justify-end w-full items-center gap-3">
                  <div className={cn("text-sm hidden", {
                    "block": reply.length !== 0,
                    "text-neutral-500 dark:text-neutral-400": reply.length < MAX_POST_LENGTH - 20,
                    "text-yellow-500 dark:text-yellow-400": reply.length >= MAX_POST_LENGTH - 20 && reply.length < MAX_POST_LENGTH - 10,
                    "text-red-500 dark:text-red-400": reply.length >= MAX_POST_LENGTH - 10,
                  })}>
                    {reply.length}/{MAX_POST_LENGTH}
                  </div>

                  <Button variant="default">Envoyer</Button>
                </div>
              </CardFooter>
            </Card>
          </Card>
        </div>
        
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          {post.replies.length ? post.replies.map((reply) => (
            <PostCard key={reply.id} {...reply} />
          )) : (
            <Card className={cn(
              "bg-[#F9FAFB] dark:bg-[#1A1A1A] border-b border-[#e1e8ed] dark:border-[#343536] p-4",
              "border-dashed border-neutral-200 dark:border-neutral-800",
              "h-24 sm:h-40 md:h-56 lg:h-60 flex items-center justify-center"
            )}>
              <div className="text-center text-neutral-500 dark:text-neutral-400 select-none">
                Aucune réponse pour le moment
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

export default User;