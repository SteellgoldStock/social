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

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full resize-none overflow-hidden bg-transparent text-sm focus:outline-none"
      maxLength={MAX_POST_LENGTH}
      rows={1}
    />
  )
}

