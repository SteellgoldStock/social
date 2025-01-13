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
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isHovered, setIsHovered] = useState(false);
  
  const t = useTranslations("FollowButton");

  const handleAction = async (actionType: "follow" | "unfollow") => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setIsFollowing((prev) => !prev);
      
      await fetch(`/api/user/relation`, {
        body: JSON.stringify({ username, actionType }),
        method: "POST"
      });
    } catch (error) {
      setIsFollowing((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  const follow = () => handleAction("follow");
  const unfollow = () => handleAction("unfollow");

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
      disabled={isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isFollowing ? unfollow : follow}
    >
      {isFollowing ? (isHovered ? t("UnfollowOnHover") : t("Following")) : t("Follow")}
    </Button>
  );
}