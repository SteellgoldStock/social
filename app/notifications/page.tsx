import { HydrationBoundary } from "@/components/providers/hydration-boundary";
import { getTranslations } from "next-intl/server";
import { ReactElement } from "react";
import { NotificationsPageClient } from "./page.client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { LoginView } from "@/components/login.view";
import { getNotificationsQuery, getUnreadCountQuery } from "@/lib/actions/notifications/notification.hook";

const NotificationsPage = async (): Promise<ReactElement> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <LoginView />;
  }
  
  const t = await getTranslations("NotificationsPage");
  
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