"use client";

import NotFound from "@/app/not-found";
import { Prisma } from "@prisma/client";
import { Component } from "@/lib/types";
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PostCard, PostCardSkeleton } from "@/components/post-card";
import { NewPost } from "@/components/new-post";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();

  const [isSubmiting, setIsSubmiting] = useState(false);

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

              <div className="mt-1 border p-4 rounded-lg">
                <NewPost
                  parentId={post.id}
                  onSubmit={() => {
                    setIsSubmiting(true);
                    setTimeout(() => {
                      router.refresh();
                      setIsSubmiting(false);
                    }, 500);
                  }}
                />
              </div>
            </Card>
          </div>

          <div className={cn("w-full lg:w-3/5 flex flex-col gap-2", {
            "hidden": post.comments.length == 0
          })}>
            {isSubmiting && <PostCardSkeleton />}
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