"use client";

import { useSession } from "@/lib/auth/client";
import { useTranslations } from "next-intl";
import { LoginView } from "@/components/login.view";
import { ChooseUsername } from "@/components/choose-username.view";

const Page = () => {
  const { data } = useSession();

  const t = useTranslations("Page");

  if (!data) return <LoginView />;
  if (data && !data.user.username) return <ChooseUsername />;

  return (
    <section>
      <h1 className="text-4xl font-bold">{t("Title")}</h1>
      <p className="text-lg">{t("Description")}</p>

      <p>Login as {data.user.email} ({data.user.name})</p>
    </section>
  );
}

export default Page;