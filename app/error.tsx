"use client";

import { Button } from "@/components/ui/button";
import { dayJS } from "@/lib/day-js";
import { Component } from "@/lib/types";
import { IterationCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
};

const Error: Component<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error)
  }, [error]);

  const t = useTranslations("Error");
 
  return (
    <>
      <div className={"absolute inset-0 flex flex-col items-center justify-center"}>
        <h2 className="text-3xl font-bold">
          {t("Title")}
        </h2>

        <p className="mb-4">
          {error.message}
        </p>

        <Button variant="outline" onClick={reset}>
          <IterationCcw className="w-4 h-4 mr-2" />
          {t("Button")}
        </Button>
      </div>

      <span className="absolute bottom-0 right-0 p-2 text-xs text-gray-500">
        {dayJS().format("YYYY-MM-DD HH:mm:ss Z [UTC]")}
      </span>
    </>
  )
}

export default Error