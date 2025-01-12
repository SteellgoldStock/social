import { isActionSuccessful } from "@/lib/actions/action.utils";
import { getUnreadNotificationsCount } from "@/lib/actions/notifications/notification.action";
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req: NextRequest): Promise<NextResponse> => {
  const result = await getUnreadNotificationsCount();
  
  if (isActionSuccessful(result)) {
    return NextResponse.json({ count: result.data });
  }

  return NextResponse.json({ count: 0 });
}