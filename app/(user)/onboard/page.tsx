"use client";

import { ReactElement, useState, useEffect } from "react";
import { client, useSession } from "@/lib/auth/client";
import { useTranslations } from "next-intl";
import { AlertCircle, AtSign, CheckCircle, Loader2 } from "lucide-react";
import { UsernameCheckResponseSchema } from "@/lib/schemas/UsernameValidResponse";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const Page = (): ReactElement => {
  const { data } = useSession();
  const t = useTranslations("ChooseUsername");

  const [updating, setUpdating] = useState(false);

  const router = useRouter();

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
          disabled={!validUsername || validatingUsername || !username || updating}
          onClick={async () => {
            client.updateUser({ username }, {
              onError: () => {
                toast.error(t("Failed"), {
                  id: "choose-username",
                });
                
                setUpdating(false);
              },
              onSuccess: () => {
                toast.success(t("Defined", { username }), {
                  id: "choose-username",
                });
                router.push(`/${username}`);
              },
              onRequest: () => {
                setUpdating(true);
                toast.loading(t("Submitting"), {
                  id: "choose-username",
                });
              }
            })
          }}
        >
          {updating && <Loader2 size={16} className="animate-spin" />}
          {updating ? t("Submitted") : t("Submit")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Page;