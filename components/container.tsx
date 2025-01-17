import { Component } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Container: Component<PropsWithChildren & {
  fixed?: boolean;
}> = ({ children, fixed = true }) => {
  return (
    <section className={cn("mx-auto py-6", {
      "max-w-2xl": fixed,
    })}>
      {children}
    </section>
  );
}