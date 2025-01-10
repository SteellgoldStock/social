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
      posts: true,
      socials: true
    }
  });

  if (!user) return <NotFound reason="userNotFound" />;

  return <ClientProfilePage user={user} />;
}

export default ProfilePage;