"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Verified } from "@/components/verified";
import { users } from "@/lib/data";
import { useParams } from "next/navigation";
import { ReactElement } from "react";

const User = (): ReactElement => {
  const params = useParams<{ user: string }>()
  const user = users.find((u) => u.handle.toLowerCase() === params.user.toLowerCase())
  if (!user) return <div>User not found</div>

  return (
    <section>
      <Card className="bg-[#F9FAFB] dark:bg-[#1A1A1A] border-b border-[#e1e8ed] dark:border-[#343536]">
        <CardHeader className="p-1.5">
          <div className="relative">
            <img
              src={user.banner}
              alt={`${user.name}'s banner`}
              className="w-full  object-cover block object-center rounded-lg"
            />

            <div className="shrink-0 flex items-center justify-start space-x-4 p-4">
              <img src={user.avatar} alt="Profile"
                className="-mt-16 h-32 w-32 transform border-4 border-[#F9FAFB] dark:border-[#1A1A1A] rounded-full shadow-lg"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
            {user.name}
            {user.isVerified && <Verified />}
          </h1>
          <p className="text-gray-500">@{user.handle}</p>
          <p className="text-gray-700">{user.bio}</p>
        </CardContent>
      </Card>
    </section>
  );
}

export default User;