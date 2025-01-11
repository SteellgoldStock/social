import { getUnreadNotificationsCount } from "@/lib/actions/notifications/notification.action";
import { auth } from "@/lib/auth/auth"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req: NextRequest): Promise<NextResponse> => {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ count: 0 });

  const count = await getUnreadNotificationsCount(session.user.id);
  return NextResponse.json({ count });
}