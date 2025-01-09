import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    username: string;
  }>;
};

const USERNAME_REGEX = /^(?!^[.-]$)(?!.*[._-]{2})[a-zA-Z0-9][a-zA-Z0-9_.]*$/;

export const GET = async (req: NextRequest, { params }: Params): Promise<any> => {
  const { username } = await params;
  console.log(username);

  if (!username) {
    return NextResponse.json({ status: 400, body: { error: "Missing" } });
  }

  if (username.length > 16) {
    return NextResponse.json({
      status: 400,
      body: { error: "TooLong" },
    });
  }

  if (!USERNAME_REGEX.test(username)) {
    return NextResponse.json({ status: 400, body: { error: "InvalidCharacters" } });
  }

  const exists = await prisma.user.findFirst({ where: { username: { equals: username, mode: "insensitive" } } });

  if (exists) {
    return NextResponse.json({ status: 400, body: { error: "Taken" } });
  }

  return NextResponse.json({
    status: 200,
    body: {
      valid: true,
    },
  });
};
