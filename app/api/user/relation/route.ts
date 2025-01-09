import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RelationUpdateSchema = z.object({
  username: z.string().min(1).max(16).regex(/^(?!^[.-]$)(?!.*[._-]{2})[a-zA-Z0-9][a-zA-Z0-9_.]*$/),
  actionType: z.enum(["follow", "unfollow"])
});

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ status: 401, body: { error: "APIUnauthorized" } });
  if (!session.user.username) return NextResponse.json({ status: 400, body: { error: "APIBadRequest" } });

  const result = RelationUpdateSchema.safeParse(await req.json());
  if (!result.success) return NextResponse.json({ status: 400, body: { error: "APIBadRequest" } })

  const { username, actionType } = result.data;

  if (username === session.user.username) return NextResponse.json({ status: 400, body: { error: "APIBadRequest" } });

  const action = actionType === "follow" ? { connect: { username } } : { disconnect: { username } };

  const data = await prisma.user.update({
    where: { username: session.user.username },
    data: { following: action }
  });

  if (!data) return NextResponse.json({ status: 404, body: { error: "APINotFound" } });

  console.log(`User ${session.user.username} ${actionType === "follow" ? "followed" : "unfollowed"} ${username}`);
  return NextResponse.json({ status: 200, body: { data } });
}