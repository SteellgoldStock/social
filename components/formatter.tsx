import React from "react";
import Link from "next/link";
import type { Component } from "@/lib/types";
import Twemoji from "react-twemoji";

type SegmentType = "text" | "bolditalic" | "bold" | "italic" | "mention" | "hashtag" | "linebreak";

interface Segment {
  type: SegmentType;
  content?: string;
}

interface TextFormatterProps {
  text: string;
}

export const TextFormatter: Component<TextFormatterProps> = ({ text }) => {
  const parseText = (input: string): Segment[] => {
    const lines = input.split("\n");
    const segments: Segment[] = [];
    
    let inTextBlock = false;
    let consecutiveEmptyLines = 0;
    
    lines.forEach((line, lineIndex) => {
      if (line.trim() === "") {
        if (inTextBlock) {
          consecutiveEmptyLines++;
          if (consecutiveEmptyLines <= 2) {
            segments.push({ type: "linebreak" });
          }
        }
      } else {
        inTextBlock = true;
        consecutiveEmptyLines = 0;
        
        let currentText = "";
        let currentIndex = 0;

        while (currentIndex < line.length) {
          if (line[currentIndex] === "*") {
            if (line[currentIndex + 1] === "*" && line[currentIndex + 2] === "*") {
              if (currentText) {
                segments.push({ type: "text", content: currentText });
                currentText = "";
              }
              const endIndex = line.indexOf("***", currentIndex + 3);
              if (endIndex !== -1) {
                segments.push({
                  type: "bolditalic",
                  content: line.slice(currentIndex + 3, endIndex),
                });
                currentIndex = endIndex + 3;
                continue;
              }
            } else if (line[currentIndex + 1] === "*") {
              if (currentText) {
                segments.push({ type: "text", content: currentText });
                currentText = "";
              }
              const endIndex = line.indexOf("**", currentIndex + 2);
              if (endIndex !== -1) {
                segments.push({
                  type: "bold",
                  content: line.slice(currentIndex + 2, endIndex),
                });
                currentIndex = endIndex + 2;
                continue;
              }
            } else {
              if (currentText) {
                segments.push({ type: "text", content: currentText });
                currentText = "";
              }
              const endIndex = line.indexOf("*", currentIndex + 1);
              if (endIndex !== -1) {
                segments.push({
                  type: "italic",
                  content: line.slice(currentIndex + 1, endIndex),
                });
                currentIndex = endIndex + 1;
                continue;
              }
            }
          } else if (line[currentIndex] === "@" || line[currentIndex] === "#") {
            const isMention = line[currentIndex] === "@";
            if (currentText) {
              segments.push({ type: "text", content: currentText });
              currentText = "";
            }

            let word = line[currentIndex];
            currentIndex += 1;

            while (
              currentIndex < line.length &&
              ((/[a-zA-Z0-9]/u).test(line[currentIndex]) ||
                line[currentIndex] === "." ||
                line[currentIndex] === "-" ||
                line[currentIndex] === "_")
            ) {
              word += line[currentIndex];
              currentIndex += 1;
            }

            if (word.length > 1) {
              segments.push({
                type: isMention ? "mention" : "hashtag",
                content: word,
              });
            } else {
              currentText += word;
            }
            continue;
          }

          currentText += line[currentIndex];
          currentIndex += 1;
        }

        if (currentText) {
          segments.push({ type: "text", content: currentText });
        }
      }
    });

    while (segments.length > 0 && segments[segments.length - 1].type === "linebreak") {
      segments.pop();
    }

    return segments;
  };

  const renderSegment = (segment: Segment, index: number): React.ReactNode => {
    switch (segment.type) {
      case "linebreak":
        return <br key={index} />;
      case "bolditalic":
        return (
          <strong key={index} className="font-bold italic">
            {segment.content}
          </strong>
        );
      case "bold":
        return <strong key={index} className="font-bold">{segment.content}</strong>;
      case "italic":
        return <em key={index} className="italic">{segment.content}</em>;
      case "mention":
        return (
          <Link
            key={index}
            href={`/${segment.content?.slice(1)}`}
            className="text-blue-600 hover:underline"
          >
            {segment.content}
          </Link>
        );
      case "hashtag":
        return (
          <Link
            key={index}
            href={`/explore/${segment.content?.slice(1)}`}
            className="text-blue-600 hover:underline"
          >
            {segment.content}
          </Link>
        );
      default:
        return <span key={index}>{segment.content}</span>;
    }
  };

  const segments = parseText(text);

  return (
    <span>
      <Twemoji options={{ className: 'twemoji' }}>
        {segments.map((segment, index) => renderSegment(segment, index))}
      </Twemoji>
    </span>
  );
};

export default TextFormatter;