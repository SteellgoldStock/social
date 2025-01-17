import { AsyncComponent } from "@/lib/types";
import NotFound from "@/app/not-found";
import { prisma } from "@/lib/db/prisma";
import { ClientPostPage } from "./page.client";

type PageProps = {
  params: Promise<{ username: string, post: string }>
};

const ProfilePage: AsyncComponent<PageProps> = async ({ params }) => {
  const { post: postId } = await params;

  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      likes: true,
      comments: {
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
    }
  });

  if (!post) return <NotFound />;

  return <ClientPostPage post={post} />;
}

export default ProfilePage;