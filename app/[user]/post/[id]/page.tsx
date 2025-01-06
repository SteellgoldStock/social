"use client";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Verified } from "@/components/verified";
import { posts, users } from "@/lib/data";
import { CornerDownRight, Flag, Mail } from "lucide-react";
import { useParams } from "next/navigation";
import { ReactElement, useState } from "react";

const User = (): ReactElement => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isFollowToo = true;

  const params = useParams<{ user: string }>()
  const user = users.find((u) => u.handle.toLowerCase() === params.user.toLowerCase())
  if (!user) return <div>User not found</div>


  return (
    <section>
      <Card className="bg-[#F9FAFB] dark:bg-[#1A1A1A] border-b border-[#e1e8ed] dark:border-[#343536]">
        <div className="p-1">
          <PostCard {...user} {...posts[0]} />
        </div>

        <div className="my-4" />

        <CardContent className="flex flex-col gap-4">
          {[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus
          ].map((content, i) => (
            <div className="flex flex-row gap-4" key={i}>
              <CornerDownRight className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <Card key={i} className="bg-[#F9FAFB] dark:bg-[#1A1A1A] border-[#e1e8ed] dark:border-[#343536]">
                <CardHeader className="p-1.5">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-9 w-9 rounded-full"
                    />
                    <div className="flex flex-col justify-center gap-0.5">
                      <p className="flex items-center gap-1 font-medium">
                        {user.name}
                        {user.isVerified && <Verified />}
                      </p>
                      <span className="-mt-1 font-normal text-gray-500">{user.handle}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="-mt-2">
                  <p>{content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

export default User;