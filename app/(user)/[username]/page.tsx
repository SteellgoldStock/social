import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import { AsyncComponent } from "@/lib/types";
import { prisma } from "@/lib/db/prisma";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

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
      posts: true
    }
  });

  const t = await getTranslations("ProfilePage");

  if (!user) return <div>User not found</div>;

  return (
    <section className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="p-1.5">
          <div className="relative">
            <div className={cn("w-full rounded-t-lg overflow-hidden", {
              "h-32 sm:h-72": user.banner,
              "h-32": !user.banner
            })}>
              {user.banner ? (
                <img
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

              {/* <div className="absolute right-5 -mt-10">
                <div className="flex flex-row gap-1">
                  <Button variant="outline" size="iconSm">
                    <Flag className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="iconSm" disabled={!isFollowing}>
                    <Mail className="h-4 w-4" />
                  </Button>

                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    className={
                      isFollowing
                        ? "border-neutral-200 bg-transparent dark:bg-neutral-50 hover:border-red-200 hover:bg-red-50 text-neutral-800 hover:text-red-600"
                        : "bg-neutral-900 dark:bg-slate-50 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
                    }
                    size={"sm"}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? (isHovering ? "Unfollow" : "Following") : "Follow"}
                  </Button>
                </div>
              </div> */}
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
            {/* {isFollowToo && (
              <span className="select-none text-neutral-500 bg-neutral-200 dark:bg-neutral-800 rounded-full px-2 py-0.5 text-xs">
                {isFollowToo && isFollowing ? "Mutual Follow" : "Follows you"}
              </span>
            )} */}
          </div>

          <p className="text-gray-400 mt-1">{user.bio}</p>

          <div className="flex flex-row gap-4 mt-4 py-0.5 text-neutral-500">
            <span className={cn("hover:underline cursor-pointer")}>
              <span className="text-neutral-400">{user.following.length}</span> {t("Following")}
            </span>

            &middot;

            <span className={cn("hover:underline cursor-pointer")}>
              <span className="text-neutral-400">{user.followers.length}</span> {t("Followers")}
            </span>
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