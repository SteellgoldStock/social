import { Component } from "@/lib/types";
import { PropsWithChildren } from "react";

export const Container: Component<PropsWithChildren> = ({ children }) => {
  return (
    <section className="max-w-2xl mx-auto py-6">
      {children}
    </section>
  );
}