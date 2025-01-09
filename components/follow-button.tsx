"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/client";
import { Component } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type FollowButtonProps = {
  isFollowing: boolean;
  username: string;
};

export const FollowButton: Component<FollowButtonProps> = ({ isFollowing: initialIsFollowing, username }) => {
  const { data } = useSession();

  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isHovered, setIsHovered] = useState(false);
  
  const t = useTranslations("FollowButton");

  const follow = async () => {
    setIsFollowing((prev) => !prev);
    await fetch(`/api/user/relation`, {
      body: JSON.stringify({ username, actionType: "follow" }),
      method: "POST"
    });
  };

  const unfollow = async () => {
    setIsFollowing((prev) => !prev);
    await fetch(`/api/user/relation`, {
      body: JSON.stringify({ username, actionType: "unfollow" }),
      method: "POST"
    });
  };

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  
  if (!data || data.user.username === username) return (
    <Button variant="outline" size="sm" disabled>
      {t("Follow")}
    </Button>
  );

  return (
    <Button
      variant={isHovered ? "destructive" : "secondary"}
      size="sm"

      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

      onClick={isFollowing ? unfollow : follow}
    >
      {isFollowing ? (isHovered ? t("UnfollowOnHover") : t("Following")) : t("Follow")}
    </Button>
  );
}