import { HydrationBoundary } from "@/components/providers/hydration-boundary";
import { NotificationsPageClient } from "./page.client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { LoginView } from "@/components/login.view";
import { getNotificationsQuery, getUnreadCountQuery } from "@/lib/actions/notifications/notification.hook";
import { ReactElement } from "react";

const NotificationsPage = async (): Promise<ReactElement> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <LoginView />;
  }
    
  return (
    <HydrationBoundary queries={[
      getNotificationsQuery(session.user.id),
      getUnreadCountQuery(session.user.id)
    ]}>
      <NotificationsPageClient />
    </HydrationBoundary>
  )
};

export default NotificationsPage;