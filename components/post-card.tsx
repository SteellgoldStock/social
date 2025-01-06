"use client";

import { Component, PostProps } from "@/lib/types";
import { ReactElement, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bookmark, Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Verified } from "./verified";
import Link from "next/link";

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
      <CardHeader>
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
        <p>{content}</p>
      </CardContent>

      <CardFooter>
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4" />
            {replies.length}
          </Button>

          <Button variant="ghost" size="sm" onClick={() => toggleLike()}>
            <Heart className={cn("h-4 w-4", {
              "fill-red-500 text-red-500": isLiked
            })} />
            {likesCount}
          </Button>

          <Button variant="ghost" size="sm" onClick={() => toggleRepost()}>
            <Repeat className={cn("h-4 w-4", {
              "fill-green-500 text-green-500": isReposted
            })} />
            {repostsCount}
          </Button>

          <Button variant="ghost" size="sm" onClick={() => setIsBookmarked(!isBookmarked)}>
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