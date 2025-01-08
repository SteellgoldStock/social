import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const fixName = (name: string): string => {
  return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
}