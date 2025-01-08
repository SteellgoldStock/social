import { ReactNode } from "react";
import { Component, UserProps } from "./types";
import Link from "next/link";

type FormatterProps = {
  text: string;
  users: UserProps[];
}

export const TextFormatter: Component<FormatterProps> = ({ text, users }) => {
  const formatText = (text: string): ReactNode[] => {
    const parts = text.split(/(@[a-zA-Z0-9_]+|#\w+|https?:\/\/\S+)/);
    
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        const handle = part.slice(1);
        const user = users.find((user) => user.handle === handle);
        
        if (user) {
          return <Link key={index} href={`/${handle}`} className="text-blue-500 dark:text-blue-600 hover:underline">@{handle}</Link>;
        }
      } else if (part.startsWith("#")) {
        return <Link key={index} href={`/hashtag/${part.slice(1)}`} className="text-blue-500 dark:text-blue-600 hover:underline">#{part.slice(1)}</Link>;
      } else if (part.startsWith("http")) {
        return <Link key={index} href={part} className="text-blue-500 dark:text-blue-600 hover:underline">{part}</Link>;
      }

      return part;
    });
  };

  return <div>{formatText(text)}</div>;
};