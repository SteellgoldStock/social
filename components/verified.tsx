import { cn } from "@/lib/utils";
import { VerifiedIcon } from "lucide-react";
import { ReactElement } from "react";

export const Verified = (): ReactElement => {
  return (
    <VerifiedIcon
      className={cn(
        "h-6 w-6",
        "border-0 dark:border-0 fill-blue-200 dark:fill-blue-200",
        "text-blue-500 dark:text-blue-600"
      )}
    />
  );
}