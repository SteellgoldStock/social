import React from 'react';

const NotificationsLoading = () => {
  return (
    <div className="container mx-auto">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={`flex flex-row items-center gap-2.5 py-3 px-4 ${
            index === 0
              ? "border-l border-r border-t rounded-t-lg"
              : index === 4
              ? "border-l border-r border-b rounded-b-lg"
              : "border-r border-l"
          }`}
        >
          <div className="animate-pulse">
            <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
          </div>
          
          <div className="flex-1 space-y-2 animate-pulse">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsLoading;