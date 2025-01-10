import { auth } from '@/lib/auth/auth';
import { del, put } from '@vercel/blob';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const URL_START = "https://xavwlhq6z2da5ji0.public.blob.vercel-storage.com/"

export const POST = async (request: Request): Promise<NextResponse> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json("Not authenticated", { status: 401 });

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) return NextResponse.json("Missing filename", { status: 400 });
  if (!request.body) return NextResponse.json("Missing body", { status: 400 });

  const blob = await put(Math.random().toString(36).substring(7) + filename.substring(filename.lastIndexOf('.')), request.body, {
    access: "public",
    contentType: request.headers.get('content-type') ?? "image/png",
    addRandomSuffix: true
  });

  if (!blob) return NextResponse.json("Failed to upload file", { status: 500 });

  const oldAvatar = session.user.image ?? "";
  if (oldAvatar && oldAvatar.startsWith(URL_START)) {
    await del(oldAvatar.substring(URL_START.length));
  }

  return NextResponse.json(blob);
}