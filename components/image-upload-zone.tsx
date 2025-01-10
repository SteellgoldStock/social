"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { Upload } from "lucide-react";
import { Component } from "@/lib/types";
import type { PutBlobResult } from '@vercel/blob';
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onFileSelected: (file: File) => void;
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
  type: 'avatar' | 'banner';
  maxFileSizeMB?: number;
  allowedTypes?: string[];
  uploadEndpoint: string;
  updateFunction: (imageUrl: string) => Promise<void>;
  previewHeight?: string;
}

export const ImageUploadZone: Component<ImageUploadProps> = ({
  onFileSelected,
  onUploadComplete,
  onUploadError,
  type,
  maxFileSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/jpg", "image/png"],
  uploadEndpoint,
  updateFunction,
  previewHeight = "200px",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("ImageUploadZone");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      const formats = allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ');
      toast.error(t("InvalidFormat", { formats }));
      return;
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert(t("MaxSize", { maxFileSizeMB }));
      return;
    }

    setFile(file);
    onFileSelected(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      setError(null);

      const response = await fetch(`${uploadEndpoint}?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) throw new Error("Failed to upload file");

      const result = await response.json() as PutBlobResult;
      
      if (result.url) {
        await updateFunction(result.url);
        onUploadComplete(result.url);
        setPreview(null);
      } else {
        throw new Error('No response URL found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred while uploading the file.";
      setError(errorMessage);
      onUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors overflow-hidden", 
        {
          "border-primary bg-primary/10": isDragging,
          "border-primary/20 hover:border-primary/10": !isDragging,
          "aspect-square rounded-full": type === 'avatar',
          "aspect-w-16 aspect-h-9": type !== 'avatar'
        }
      )}
      style={{
        height: type === "avatar" ? previewHeight : "auto",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      {preview && (
        <div 
          className="absolute inset-0 m-[-1px]"
          style={{
            backgroundImage: `url(${preview})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      
      <div 
        className={cn(
          "absolute inset-0 bg-white dark:bg-black transition-opacity",
          preview ? "opacity-80 dark:opacity-85" : "opacity-0"
        )}
        style={{ bottom: "-1px" }}
      />

      <div className="relative z-10 h-full flex items-center justify-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept={allowedTypes.join(',')}
        />

        <div>
          <Upload className="mx-auto h-8 w-8 text-primary" />

          <p className="mt-2 text-sm text-primary">
            {isUploading
              ? t("Uploading")
              : t("Placeholder")
            }
          </p>

          <p className="mt-1 text-xs text-gray-500">
            ({allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} {t("Only")})
          </p>
        </div>
      </div>

      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
    </div>
  );
}