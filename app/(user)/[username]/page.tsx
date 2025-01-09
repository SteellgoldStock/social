import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import { AsyncComponent } from "@/lib/types";
import { prisma } from "@/lib/db/prisma";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import NotFound from "@/app/not-found";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { FollowButton } from "../../../components/follow-button";
import { UsersDialog } from "@/components/users.dialog";
import { ImageZoomer } from "image-zoomer-react";

type PageProps = {
  params: Promise<{ username: string }>
};

const ProfilePage: AsyncComponent<PageProps> = async ({ params }) => {
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
    include: {
      followers: true,
      following: true,
      posts: true,
      socials: true
    }
  });

  const session = await auth.api.getSession({ headers: await headers() })

  if (!user) return <NotFound reason="userNotFound" />;

  const t = await getTranslations("ProfilePage");

  return (
    <section className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="p-1.5">
          <div className="relative">
            <div className={cn("w-full rounded-t-lg overflow-hidden", {
              "h-32 sm:h-60": user.banner,
              "h-32": !user.banner
            })}>
              {user.banner ? (
                <ImageZoomer
                  src={user.banner}
                  alt={`${user.name}'s banner`}
                  className="w-full h-full object-cover block object-center rounded-lg"
                />
              ) : (
                <div className="w-full h-32 bg-[#e4e6e7] dark:bg-[#252525] rounded-lg" />
              )}
            </div>

            <div className="shrink-0 flex items-center justify-start space-x-4 p-4">
              <div className="relative flex-shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className={cn(
                      "-mt-12 sm:-mt-20 h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32",
                      "border-4 border-[#F9FAFB] dark:border-[#1A1A1A]",
                      "rounded-full shadow-lg"
                    )}
                  />
                ) : (
                  <div
                    className={cn(
                      "-mt-12 sm:-mt-20 h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32",
                      "bg-[#F9FAFB] dark:bg-[#1A1A1A]",
                      "border-4 border-[#e4e8ec] dark:border-[#252323]",
                      "rounded-full shadow-lg",
                      "flex items-center justify-center"
                    )}
                  >
                    <User className="h-16 w-16" strokeWidth={2} />
                  </div>
                )}
              </div>

              <div className="absolute right-2 bottom-2.5 sm:bottom-10">
                <div className="flex flex-row gap-1">
                  {/* <Button variant="outline" size="iconSm">
                    <Flag className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="iconSm" disabled={!isFollowing}>
                    <Mail className="h-4 w-4" />
                  </Button> */}

                  <FollowButton
                    isFollowing={
                      session
                        ? user.followers.map((user) => user.id).includes(session.user.id)
                        : false
                    }
                    username={user.username ?? ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
            {user.name}
            {user.isVerified && <span className="text-blue-500">✔</span>}
          </h1>

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

          <p className="text-gray-400 mt-1">{user.bio}</p>

          <div className="flex flex-row gap-4 mt-4 py-0.5 text-neutral-500 text-sm md:text-base">
            <UsersDialog
              users={user.following}
              title={t("Dialog.Following.Title")}
              description={
                username === session?.user.username
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
                username === session?.user.username
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

      {/* <div className="flex flex-col gap-4">
        {posts.filter((post) => post.author.handle === user.handle).map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div> */}
    </section>
  );
}

export default ProfilePage;