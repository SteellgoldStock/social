"use client";

import { client, useSession } from "@/lib/auth/client";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export const LoginView = () => {
  const [isLogining, setLogining] = useState(false);

  const { data } = useSession();

  const t = useTranslations("LoginView");

  const handleGoogle = async() => {
    setLogining(true);

    const login = await client.signIn.social({
      provider: "google"
    })

    if (login.error) toast.error(login.error.message);
  }

  if (isLogining) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 bg-primary text-primary-foreground p-4 rounded-lg">
          <Loader2 className="animate-spin h-6 w-6  " />
          <p>{t("LoadingSocial")}</p>
        </div>
      </div>
    )
  }

  return (
    <section>
      {data ? (
        <p>
          {data.user.name}
        </p>
      ) : (
        <Button onClick={handleGoogle}>
          <FaGoogle />
          {t("LoginWithGoogle")}
        </Button>
      )}
    </section>
  );
}