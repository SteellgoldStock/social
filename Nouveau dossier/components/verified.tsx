import { cn } from "@/lib/utils";
import { VerifiedIcon } from "lucide-react";
import { ReactElement } from "react";

export const Verified = (): ReactElement => {
  return (
    <VerifiedIcon
      className={cn(
        "h-5 w-5",
        "border-0 dark:border-0",
        "text-blue-500"
      )}
    />
  );
}