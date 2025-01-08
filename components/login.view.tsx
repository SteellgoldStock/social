"use client";

import { client, useSession } from "@/lib/auth/client";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

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

  if (!data) {
    return (
      <Card className="flex flex-col items-center justify-center max-w-xl mx-auto">
        <CardHeader className="flex items-center">
          <CardTitle className="text-xl">{t("Title")}</CardTitle>
          <CardDescription className="text-center">{t("Description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            className="flex items-center gap-2"
            onClick={handleGoogle}
            disabled={isLogining}
          >
            {isLogining ? <Loader2 className="animate-spin" /> : <FaGoogle />}
            <span>
              {t(
                isLogining ? "LoggingIn" : "LoginWith",
                { provider: "Google" }
              )}
            </span>
          </Button>
        </CardContent>
      </Card>
    )
  }
}