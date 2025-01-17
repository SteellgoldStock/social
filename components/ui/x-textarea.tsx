"use client";

import { MAX_POST_LENGTH } from "@/lib/consts";
import type { Component } from "@/lib/types";
import React, { useState, useRef, useEffect } from "react";

type TextareaProps = {
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
};

export const XTextarea: Component<TextareaProps> = ({ 
  onChange, 
  placeholder, 
  defaultValue, 
  value 
}) => {
  const [content, setContent] = useState(defaultValue || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight.toString()}px`;
    }
  }, [content]);

  useEffect(() => {
    if (value !== undefined) {
      setContent(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_POST_LENGTH) return;

    const newValue = e.target.value;
    if (value === undefined) {
      setContent(newValue);
    }
    if (onChange) onChange(newValue);
  };

  const highlightText = (text: string) => {
    return text.replace(
      /(@\w+|#\w+)/gu,
      "<span class=\"text-blue-500\">$1</span>",
    );
  };

  const displayContent = value !== undefined ? value : content;

  return (
    <div className="relative w-full">
      <div
        className="absolute top-0 text-lg left-0 w-full h-full pointer-events-none whitespace-pre-wrap break-words z-30"
        dangerouslySetInnerHTML={{ __html: displayContent ? highlightText(displayContent) : "" }}
      />
      <textarea
        ref={textareaRef}
        value={displayContent}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full resize-none overflow-hidden bg-transparent text-lg focus:outline-none relative z-10 text-transparent caret-white"
        maxLength={MAX_POST_LENGTH}
        rows={1}
      />
    </div>
  );
};