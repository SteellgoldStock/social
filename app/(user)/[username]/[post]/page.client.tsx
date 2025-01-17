"use client";

import NotFound from "@/app/not-found";
import { Prisma } from "@prisma/client";
import { useSession } from "@/lib/auth/client";
import { Component } from "@/lib/types";
import { Container } from "@/components/container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PostCard } from "@/components/post-card";
import { XTextarea } from "@/components/ui/x-textarea";
import { useState } from "react";
import { MAX_POST_LENGTH } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import { useCreatePost } from "@/lib/actions/posts/posts.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PageProps = {
  post: Prisma.PostGetPayload<{
    include: {
      likes: true,
      comments: true,
      parent: {
        select: {
          user: {
            select: {
              name: true,
              username: true,
              image: true,
              isVerified: true
            }
          },
          content: true
        }
      },
      user: {
        select: {
          name: true,
          username: true,
          image: true,
          isVerified: true
        }
      }
    }
  }>;
};

export const ClientPostPage: Component<PageProps> = ({ post }) => {
  const { data: session } = useSession();
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  const router = useRouter();

  const createPost = useCreatePost();

  if (!post) return <NotFound />;

  return (
    <Container fixed={false}>
      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className={cn("w-full lg:w-2/5 lg:sticky lg:top-8 lg:self-start", {
            "mx-auto": post.comments.length == 0
          })}>
            <Card className={cn("flex flex-col gap-2 border-b p-4")} foreground>
              <PostCard {...post} />

              <Card>
                <CardContent className="mt-5">
                  <XTextarea
                    disabled={!session || replying}
                    placeholder="Répondre à ce post..."
                    value={reply}
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

                    <Button
                      variant="default"
                      size={"sm"}
                      disabled={reply.length === 0 || reply.length > MAX_POST_LENGTH || replying}
                      onClick={() => {
                        setReplying(true);
                        toast.promise(createPost.mutateAsync({
                          content: reply,
                          parentId: post.id,
                          comment: true
                        }).then(() => {
                          setReply("");
                          setReplying(false);

                          router.refresh();
                        }), {
                          loading: "Envoi de la réponse...",
                          success: "Réponse envoyée !",
                          error: "Impossible d'envoyer la réponse"
                        });
                      }}
                    >Envoyer</Button>
                  </div>
                </CardFooter>
              </Card>
            </Card>
          </div>

          <div className={cn("w-full lg:w-3/5 flex flex-col gap-4", {
            "hidden": post.comments.length == 0
          })}>
            {post.comments.length ? post.comments.map((replyPost) => (
              // TODO: Realy rewrite all Prisma returns types to TS
              // @ts-ignore
              <PostCard key={replyPost.id} {...replyPost} includeParent={false} />
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
    </Container>
  );
};