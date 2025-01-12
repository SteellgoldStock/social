"use client"

import { MAX_POST_LENGTH } from "@/lib/consts"
import { Component } from "@/lib/types"
import React, { useState, useRef, useEffect } from "react"

type TextareaProps = {
  onChange?: (value: string) => void
  placeholder?: string;
  defaultValue?: string;
}

export const XTextarea: Component<TextareaProps> = ({ onChange, placeholder, defaultValue }) => {
  const [content, setContent] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content]);

  useEffect(() => {
    if (defaultValue) setContent(defaultValue)
  }, [defaultValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (MAX_POST_LENGTH && e.target.value.length > MAX_POST_LENGTH) return

    const newValue = e.target.value
    setContent(newValue)
    if (onChange) onChange(newValue)
  }

  const highlightText = (text: string) => {
    return text.replace(
      /(@\w+|#\w+)/g,
      '<span class="text-blue-500">$1</span>'
    )
  }

  return (
    <div className="relative w-full">
      <div
        className="absolute top-0 text-lg left-0 w-full h-full pointer-events-none whitespace-pre-wrap break-words z-30"
        dangerouslySetInnerHTML={{ __html: content ? highlightText(content) : '' }}
      />
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full resize-none overflow-hidden bg-transparent text-lg focus:outline-none relative z-10 text-transparent"
        maxLength={MAX_POST_LENGTH}
        rows={1}
      />
    </div>
  )
}

