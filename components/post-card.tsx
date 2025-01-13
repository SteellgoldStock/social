"use client";

import { ReactElement, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { Bookmark, Heart, MessageCircle, Repeat, Share } from "lucide-react";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { Component } from "@/lib/types";
import { dayJS } from "@/lib/day-js";
import TextFormatter from "./formatter";
import { useLocale, useTranslations } from "next-intl";

export const PostCard: Component<Prisma.PostGetPayload<{
  include: {
    likes: true;
    comments: true;
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
        name: true;
        username: true;
        image: true;
        isVerified: true;
      }
    }
  }
}>> = ({
  comments, content, createdAt, id, likes, parent, parentId, updatedAt, user, userId
}): ReactElement => {
  // const [likesCount, setLikesCount] = useState(likes);
  // const [repostsCount, setRepostsCount] = useState(reposts);

  // const [isLiked, setIsLiked] = useState(isLikedDefault);
  // const [isReposted, setIsReposted] = useState(isRepostedDefault);
  // const [isBookmarked, setIsBookmarked] = useState(isBookmarkedDefault);

  // const toggleLike = () => {
  //   setIsLiked(!isLiked);
  //   setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  // }

  // const toggleRepost = () => {
  //   setIsReposted(!isReposted);
  //   setRepostsCount(isReposted ? repostsCount - 1 : repostsCount + 1);
  // }

  const lang = useLocale();
  
  const t = useTranslations("Basic");

  return ( 
    <Card key={id}>
      <CardHeader className="-mb-2">
        <Link className="flex items-center space-x-4" href={`/${user.username}`}>
          <Avatar>
            <AvatarImage src={user.image ?? ""} alt={user.name ?? "John Doe"} />
            <AvatarFallback>{(user.name ?? "").split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col justify-center gap-0.5">
            <p className="flex items-center gap-1 font-medium">
              {user.name}
              {/* {author.isVerified && <Verified />} */}
            </p>
            <span className="-mt-1 font-normal text-gray-500">
              {user.username}
              &nbsp;&bull;&nbsp;
              {dayJS(createdAt).year === dayJS().year
                ? dayJS(createdAt).locale(lang).format(`MMM D [${t("at")}] ${lang == "fr" ? "HH:mm" : "h:mm a"}`)
                : dayJS(createdAt).locale(lang).format(`MMM D, YYYY [${t("at")}] ${lang == "fr" ? "HH:mm" : "h:mm a"}`)
              }
            </span>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="-mt-2">
        <TextFormatter text={content} />

        {parent && (
          <div className="mt-3 p-4 bg-[#e9eaeb] dark:bg-[#1d1d1d] border rounded-lg">
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300 border p-0.5 text-xs">
                En réponse à
                <Link href={`/${parent.user.username}`} className="flex items-center gap-1 hover:underline">
                  <Avatar className="w-3 h-3">
                    <AvatarImage src={parent.user.image ?? ""} alt={parent.user.name ?? "John Doe"} />
                    <AvatarFallback>{(parent.user.name ?? "").split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>

                  {parent.user.name}
                </Link>
              </span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
              <TextFormatter text={parent.content} />
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between w-full -mt-3">
        <div className="flex items-center space-x-1.5">
          <Link
            href={`/${user.username}/post/${id}`}
            className={cn("transition-colors", buttonVariants({
              variant: "ghost",
              size: "sm"
            }), {
              "hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-500 hover:dark:text-blue-300": comments.length > 0,
              "hover:bg-neutral-100 dark:hover:bg-neutral-900": comments.length === 0
            })}
          >
            <MessageCircle className="h-4 w-4" />
            {comments.length}
          </Link>

          {/* <Button
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
          </Button> */}

          {/* <Button
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
          </Button> */}
        </div>

        <div className="space-x-1.5">
          {/* <Button
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
          </Button> */}

          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}