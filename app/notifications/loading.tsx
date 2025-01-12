"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Component } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import React from "react";

type NotificationsLoadingProps = {
  withHeader?: boolean;
};

const NotificationsLoading: Component<NotificationsLoadingProps> = ({ withHeader = true }) => {
  return (
    <div className={cn({
      "container mx-auto px-4 py-8 max-w-2xl": withHeader,
    })}>
      {withHeader && (
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-background border px-3 py-1 rounded-full">
              <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <Skeleton className="h-4 w-4" />
              </span>
            </div>

            <Button variant="outline" size="sm" disabled>
              <Skeleton className="h-4 w-24" />
            </Button>
          </div>
        </div>
      )}    
      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-lg border"
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsLoading;