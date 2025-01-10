"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NotFound from "@/app/not-found";
import { FollowButton } from "../../../components/follow-button";
import { UsersDialog } from "@/components/users.dialog";
import { BannerProfile } from "./_components/banner-profile";
import { AvatarProfile } from "./_components/avatar-profile";
import { BioProfile } from "./_components/bio-profile";
import { NameProfile } from "./_components/name-profile";
import { Prisma } from "@prisma/client";
import { useSession } from "@/lib/auth/client";
import { useTranslations } from "next-intl";
import { Component } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Twemoji from "react-twemoji";

type PageProps = {
  user: Prisma.UserGetPayload<{
    include: {
      followers: true,
      following: true,
      posts: true,
      socials: true
    }
  }>;
};

export const ClientProfilePage: Component<PageProps> = ({ user }) => {
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);

  if (!user) return <NotFound reason="userNotFound" />;

  const t = useTranslations("ProfilePage");

  return (
    <section className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="p-1.5">
          <div className="relative">
            <BannerProfile editMode={editMode} user={user} isOwner={session?.user.id === user.id} />

            <div className="shrink-0 flex items-center justify-start p-4">
              <AvatarProfile editMode={editMode} user={user} isOwner={session?.user.id === user.id} />

              <div className="absolute right-2 bottom-2.5 sm:bottom-10">
                <div className="flex flex-row gap-1">
                  {/* <Button variant="outline" size="iconSm">
                    <Flag className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="iconSm" disabled={!isFollowing}>
                    <Mail className="h-4 w-4" />
                  </Button> */}

                  {!session ? <></> : (
                    <>
                      {session && session.user.id !== user.id ? (
                        <FollowButton
                          isFollowing={
                            session
                              ? user.followers.map((user) => user.id).includes(session.user.id)
                              : false
                          }
                          username={user.username ?? ""}
                        />
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditMode((prev) => !prev)}
                        >
                          {editMode ? t("EditDone") : t("EditProfile")}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <NameProfile editMode={editMode} user={user} isOwner={session?.user.id === user.id} />

          <div className="flex flex-row items-center gap-1">
            <p className="text-gray-500">@{user.username}</p>
            {session && (
              <>
                {user.following.map((user) => user.id).includes(session.user.id) && (
                  <span className="select-none text-neutral-500 bg-neutral-200 dark:bg-neutral-800 rounded-full px-2 py-0.5 text-xs">
                    {t("FollowingYou")}
                  </span>
                )}
              </>
            )}
          </div>

          <Twemoji options={{ className: "twemoji" }}>
            <BioProfile editMode={editMode} user={user} isOwner={session?.user.id === user.id} />
          </Twemoji>

          <div className="flex flex-row gap-4 mt-4 py-0.5 text-neutral-500 text-sm md:text-base">
            <UsersDialog
              users={user.following}
              title={t("Dialog.Following.Title")}
              description={
                user.username === session?.user.username
                  ? t("Dialog.Following.SelfDescription")
                  : t("Dialog.Following.OthersDescription", { username: user.name })
              }
            >
              <span className={cn("hover:underline cursor-pointer")}>
                <span className="text-neutral-400">{user.following.length}</span> {t("Following")}
              </span>
            </UsersDialog>

            &middot;

            <UsersDialog
              users={user.followers}
              followings={user.following}
              title={t("Dialog.Followers.Title")}
              description={
                user.username === session?.user.username
                  ? t("Dialog.Followers.SelfDescription")
                  : t("Dialog.Followers.OthersDescription", { username: user.name })
              }
            >
              <span className={cn("hover:underline cursor-pointer")}>
                <span className="text-neutral-400">{user.followers.length}</span> {t("Followers")}
              </span>
            </UsersDialog>
          </div>
        </CardContent>
      </Card>

      <div className="my-4" />

      {editMode && (
        <p className="text-gray-500 text-center text-sm">
          {t("EditProfileHow")}
        </p>
      )}

      {/* <div className="flex flex-col gap-4">
        {posts.filter((post) => post.author.handle === user.handle).map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div> */}
    </section>
  );
};