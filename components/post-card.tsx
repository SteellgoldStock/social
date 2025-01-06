"use client";

import { Component, PostProps } from "@/lib/types";
import { ReactElement, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { Bookmark, Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Verified } from "./verified";
import Link from "next/link";
import { TextFormatter } from "@/lib/text-formatter";
import { users } from "@/lib/data";

export const PostCard: Component<PostProps> = ({
  id, author, timestamp, content, replies, reposts, likes, isLiked: isLikedDefault, isReposted: isRepostedDefault, isBookmarked: isBookmarkedDefault
}): ReactElement => {
  const [likesCount, setLikesCount] = useState(likes);
  const [repostsCount, setRepostsCount] = useState(reposts);

  const [isLiked, setIsLiked] = useState(isLikedDefault);
  const [isReposted, setIsReposted] = useState(isRepostedDefault);
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedDefault);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  }

  const toggleRepost = () => {
    setIsReposted(!isReposted);
    setRepostsCount(isReposted ? repostsCount - 1 : repostsCount + 1);
  }

  return ( 
    <Card key={id} className={cn(
      "bg-[#F9FAFB] dark:bg-[#1A1A1A]"
    )}>
      <CardHeader className="-mb-2">
        <Link className="flex items-center space-x-4" href={`/${author.handle}`}>
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col justify-center gap-0.5">
            <p className="flex items-center gap-1 font-medium">
              {author.name}
              {author.isVerified && <Verified />}
            </p>
            <span className="-mt-1 font-normal text-gray-500">{author.handle}&nbsp;&bull;&nbsp;{timestamp}</span>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="-mt-2">
        <TextFormatter text={content} users={users} />
      </CardContent>

      <CardFooter className="flex justify-between w-full -mt-3">
        <div className="flex items-center space-x-1.5">
          <Link
            href={`/${author.handle}/post/${id}`}
            className={cn("transition-colors", buttonVariants({
              variant: "ghost",
              size: "sm"
            }), {
              "hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-500 hover:dark:text-blue-300": replies.length > 0,
              "hover:bg-neutral-100 dark:hover:bg-neutral-900": replies.length === 0
            })}
          >
            <MessageCircle className="h-4 w-4" />
            {replies.length}
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className={cn("transition-colors", {
              "hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 hover:dark:text-red-300": isLiked,
              "hover:bg-neutral-100 dark:hover:bg-neutral-900": !isLiked
            })}
            onClick={() => toggleLike()}
          >
            <Heart className={cn("h-4 w-4", {
              "fill-red-500 text-red-500": isLiked
            })} />
            
            {likesCount}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn("transition-colors", {
              "hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-500 hover:dark:text-green-300": isReposted,
              "hover:bg-neutral-100 dark:hover:bg-neutral-900": !isReposted
            })}
            onClick={() => toggleRepost()}
          >
            <Repeat className={cn("h-4 w-4", {
              "fill-green-500 text-green-500": isReposted
            })} />
            
            {repostsCount}
          </Button>
        </div>

        <div className="space-x-1.5">
          <Button
            variant="ghost"
            size="sm"
            className={cn("transition-colors", {
              "hover:bg-blue-50 dark:hover:bg-blue-900/30": isBookmarked,
              "hover:bg-neutral-100 dark:hover:bg-neutral-900": !isBookmarked
            })}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={cn("h-4 w-4", {
              "fill-blue-500 text-blue-500": isBookmarked
            })} />
          </Button>

          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}