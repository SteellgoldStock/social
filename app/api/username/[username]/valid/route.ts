import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    username: string;
  }>;
};

const USERNAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$/;
const INVALID_START_REGEX = /^[._-]/;
const INVALID_END_REGEX = /[._-]$/;

export const GET = async (req: NextRequest, { params }: Params): Promise<any> => {
  const { username } = await params;
  console.log(username);

  if (!username) {
    return NextResponse.json({ status: 400, body: { error: "Missing" } });
  }

  if (username.length < 3 || username.length > 16) {
    return NextResponse.json({
      status: 400,
      body: { error: username.length < 3 ? "TooShort" : "TooLong" },
    });
  }

  if (INVALID_START_REGEX.test(username)) {
    return NextResponse.json({ status: 400, body: { error: "InvalidStarting" } });
  } else if (INVALID_END_REGEX.test(username)) {
    return NextResponse.json({ status: 400, body: { error: "InvalidEnding" } });
  } else if (!USERNAME_REGEX.test(username)) {
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
