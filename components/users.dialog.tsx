"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Component } from "@/lib/types";
import { User } from "@prisma/client";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { FollowButton } from "@/components/follow-button";
import Link from "next/link";

type UsersDialogProps = PropsWithChildren & {
  users: User[];
  followings?: User[];
  title: string;
  description: string;
}

export const UsersDialog: Component<UsersDialogProps> = ({ 
  children, 
  users, 
  followings = [], 
  title, 
  description 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentPage(1)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {currentUsers.map((user) => (
              <div key={user.username} className="flex items-center justify-between space-x-2 py-2">
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.image ?? ""}
                    alt={user.name ?? ""}
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col -space-y-1">
                    <p className="line-clamp-1">{user.name}</p>
                    <Link
                      href={`/${user.username}`}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      @{user.username}
                    </Link>
                  </div>
                </div>

                <FollowButton
                  isFollowing={
                    followings.length > 0
                      ? followings.map(u => u.id).includes(user.id)
                      : users.map(u => u.id).includes(user.id)
                  }
                  username={user.username ?? ""}
                />
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center justify-between mt-4">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};