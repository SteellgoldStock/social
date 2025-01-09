import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ username: string }> }): Promise<NextResponse> => {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ status: 401, body: { error: "APIUnauthorized" } });

  if (!session.user.username) return NextResponse.json({ status: 400, body: { error: "APIBadRequest" } });

  const { username } = await params;
  if (!username) return NextResponse.json({ status: 400, body: { error: "APIBadRequest" } });

  // const isFollowing = await prisma.user.findFirst({
  //   where: {
  //     username: session.user.username,
  //     AND: {
  //       following: {
  //         some: {
  //           username
  //         }
  //       }
  //     }
  //   }
  // });
  const isFollowing = await prisma.$queryRaw`
    SELECT *
    FROM "user" u1
    JOIN "_FollowRelation" f ON u1."id" = f."A"
    JOIN "user" u2 ON f."B" = u2."id"
    WHERE u1."username" = ${session.user.username}
      AND u2."username" = ${username};
  `;

  return NextResponse.json({ body: { isFollowing: !!isFollowing } });
}