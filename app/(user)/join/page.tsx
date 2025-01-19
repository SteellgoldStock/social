"use client";

import { client, useSession } from "@/lib/auth/client";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";
import { CardHeader, Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = (): ReactElement => {
  const [isLogining, setLogining] = useState(false);
  const t = useTranslations("LoginView");

  const handleGoogle = async() => {
    setLogining(true);

    const login = await client.signIn.social({
      provider: "google"
    })

    if (login.error) toast.error(login.error.message);
  }

  return (
    <section className="flex flex-col items-center justify-center h-full">
      <Card className="flex flex-col items-center max-w-xl">
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
    </section>
  )
}

export default Page;