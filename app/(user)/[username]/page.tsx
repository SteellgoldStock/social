import { AsyncComponent } from "@/lib/types";
import NotFound from "@/app/not-found";
import { prisma } from "@/lib/db/prisma";
import { ClientProfilePage } from "./page.client";

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
      posts: {
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
        },
        orderBy: { createdAt: "desc" }
      },
      socials: true
    }
  });

  if (!user) return <NotFound reason="userNotFound" />;

  return <ClientProfilePage user={user} />;
}

export default ProfilePage;