import React from "react";
import Link from "next/link";
import type { Component } from "@/lib/types";

export const TextFormatter: Component<{ text: string }> = ({ text }) => {
  const parseText = (input: string) => {
    const segments = [];
    let currentText = "";
    let currentIndex = 0;

    while (currentIndex < input.length) {
      if (input[currentIndex] === "*") {
        // Check for bold+italic (***)
        if (input[currentIndex + 1] === "*" && input[currentIndex + 2] === "*") {
          if (currentText) {
            segments.push({ type: "text", content: currentText });
            currentText = "";
          }
          // Find closing ***
          const endIndex = input.indexOf("***", currentIndex + 3);
          if (endIndex !== -1) {
            segments.push({
              type: "bolditalic",
              content: input.slice(currentIndex + 3, endIndex),
            });
            currentIndex = endIndex + 3;
            continue;
          }
        }
        // Check for bold (**)
        else if (input[currentIndex + 1] === "*") {
          if (currentText) {
            segments.push({ type: "text", content: currentText });
            currentText = "";
          }
          // Find closing **
          const endIndex = input.indexOf("**", currentIndex + 2);
          if (endIndex !== -1) {
            segments.push({
              type: "bold",
              content: input.slice(currentIndex + 2, endIndex),
            });
            currentIndex = endIndex + 2;
            continue;
          }
        }
        // Single * for italic
        else {
          if (currentText) {
            segments.push({ type: "text", content: currentText });
            currentText = "";
          }
          // Find closing *
          const endIndex = input.indexOf("*", currentIndex + 1);
          if (endIndex !== -1) {
            segments.push({
              type: "italic",
              content: input.slice(currentIndex + 1, endIndex),
            });
            currentIndex = endIndex + 1;
            continue;
          }
        }
      }
      else if (input[currentIndex] === "@" || input[currentIndex] === "#") {
        // Handle @ mentions and # hashtags
        const isMention = input[currentIndex] === "@";
        if (currentText) {
          segments.push({ type: "text", content: currentText });
          currentText = "";
        }

        let word = input[currentIndex];
        currentIndex += 1;

        // Capture username/hashtag: letters, numbers, dots, dashes, and underscores
        while (
          currentIndex < input.length
          && (
            (/[a-zA-Z0-9]/u).test(input[currentIndex])
            || input[currentIndex] === "."
            || input[currentIndex] === "-"
            || input[currentIndex] === "_"
          )
        ) {
          word += input[currentIndex];
          currentIndex += 1;
        }

        if (word.length > 1) { // Only if we captured something after @ or #
          segments.push({
            type: isMention ? "mention" : "hashtag",
            content: word,
          });
        }
        else {
          currentText += word;
        }
        continue;
      }

      currentText += input[currentIndex];
      currentIndex += 1;
    }

    if (currentText) {
      segments.push({ type: "text", content: currentText });
    }

    return segments;
  };

  const renderSegment = (segment: { type: string; content: string }, index: number) => {
    switch (segment.type) {
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
            href={`/${segment.content.slice(1)}`}
            className="text-[#3182ce] hover:underline"
          >
            {segment.content}
          </Link>
        );
      case "hashtag":
        return (
          <Link
            key={index}
            href={`/explore/${segment.content.slice(1)}`}
            className="text-[#3182ce] hover:underline"
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
      {segments.map((segment, index) => renderSegment(segment, index))}
    </span>
  );
};

export default TextFormatter;
