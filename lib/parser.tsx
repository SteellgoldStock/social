import { ReactElement } from "react";
import { Component } from "./types";
import Link from "next/link";

type Props = {
  text: string;
};

export const ParseText: Component<Props> = ({ text }): ReactElement => {
  if (!text) return <></>;

  const renderTextWithLinks = () => {
    const parts = [];
    let lastIndex = 0;
    
    const regex = /(@\w+|#\w+)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.slice(lastIndex, match.index)}
          </span>
        );
      }

      const tag = match[0];
      const isHashtag = tag.startsWith('#');
      const value = tag.substring(1);

      parts.push(
        <Link
          href={isHashtag ? `/tag/${value}` : `/user/${value}`}
          key={`link-${match.index}`}
          className="text-blue-500 hover:underline inline-block"
        >
          {tag}
        </Link>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.slice(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return <>{renderTextWithLinks()}</>;
};