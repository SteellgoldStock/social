"use client";

import { ReactElement, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { client, useSession } from "@/lib/auth/client";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { AlertCircle, AtSign, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { UsernameCheckResponseSchema } from "@/lib/schemas/UsernameValidResponse";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";

const useUsernameValidation = (initialUsername: string = "") => {
  const [username, setUsername] = useState(initialUsername);
  const [validatingUsername, setValidatingUsername] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const debouncedCheck = useDebouncedCallback(async (value: string) => {
    if (!value) {
      setUsernameError("Missing");
      setValidUsername(false);
      return;
    }

    setValidatingUsername(true);

    try {
      const res = await fetch(`/api/username/${value}/valid`);
      const data = UsernameCheckResponseSchema.safeParse(await res.json());

      if (!data.success) {
        setUsernameError("Unknown");
        setValidUsername(false);
        return;
      }

      if (data.data.status === 400) {
        setUsernameError(data.data.body.error);
        setValidUsername(false);
      } else {
        setUsernameError("");
        setValidUsername(true);
      }
    } catch (error) {
      setUsernameError("Unknown");
      setValidUsername(false);
    } finally {
      setValidatingUsername(false);
    }
  }, 500);

  useEffect(() => {
    if (username) {
      debouncedCheck(username);
    } else {
      setUsernameError("");
      setValidUsername(false);
    }
  }, [username, debouncedCheck]);

  return {
    username,
    setUsername,
    validatingUsername,
    validUsername,
    usernameError,
    forceCheck: () => debouncedCheck(username)
  };
};

export const ChooseUsername = (): ReactElement => {
  const { data } = useSession();
  const t = useTranslations("ChooseUsername");

  const {
    username,
    setUsername,
    validatingUsername,
    validUsername,
    usernameError
  } = useUsernameValidation();

  if (!data) return <>Not connected</>;

  return (
    <Card className="flex flex-col items-center justify-center max-w-xl mx-auto">
      <CardHeader className="flex items-center w-full">
        <CardTitle>{t("Title")}</CardTitle>
        <CardDescription className="text-center">{t("Description")}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center w-full">
        <Input
          placeholder="john.doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          _prefix={<AtSign size={16} />}
          errorState={usernameError && t("Errors." + usernameError)}
          validState={validUsername ? t("Valid") : ""}
          suffix={
            <div className="flex items-center gap-2">
              {validatingUsername ? (
                <Loader2 size={16} className="animate-spin" />
              ) : validUsername ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
            </div>
          }
        />
      </CardContent>

      <CardFooter className="flex justify-end w-full space-x-2">
        <Button
          size="sm"
          disabled={!validUsername || validatingUsername || !username}
          onClick={async () => {
            // toast.loading(client.updateUser({ username }), {
            //   loading: t("Submitting"),
            //   success: t("Defined", { username }),
            //   error: t("Failed")
            // });
            client.updateUser({ username }, {
              onError: () => {
                toast.error(t("Failed"));
              },
              onSuccess: () => {
                toast.success(t("Defined", { username }));
              },
              onLoading: () => {
                toast.loading(t("Submitting"));
              }
            })
          }}
        >
          {t("Submit")}
        </Button>
      </CardFooter>
    </Card>
  );
};