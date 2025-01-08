"use client";

import { ReactElement } from "react";
import { Card, CardHeader } from "./ui/card";
import { useSession } from "@/lib/auth/client";

export const CreateProfile = (): ReactElement => {
  const { data } = useSession();

  if (!data) return <>Not connected</>;

  return (
    <p>
      Create Profile here
    </p>
    // <Card>
    //   <CardHeader className="p-1.5">
    //     <div className="relative">
    //       <img
    //         src={data.user.banner}
    //         alt={`${user.name}'s banner`}
    //         className="w-full  object-cover block object-center rounded-lg"
    //       />

    //       <div className="shrink-0 flex items-center justify-start space-x-4 p-4">
    //         <div className="relative flex-shrink-0">
    //           <img src={user.avatar} alt="Profile" className="-mt-16 h-32 w-32 transform border-4 border-[#F9FAFB] dark:border-[#1A1A1A] rounded-full shadow-lg" />
    //         </div>

    //         <div className="absolute right-5 -mt-10">
    //           <div className="flex flex-row gap-1">
    //             <Button variant="outline" size="iconSm">
    //               <Flag className="h-4 w-4" />
    //             </Button>

    //             <Button variant="outline" size="iconSm" disabled={!isFollowing}>
    //               <Mail className="h-4 w-4" />
    //             </Button>

    //             <Button
    //               variant={isFollowing ? "outline" : "default"}
    //               className={
    //                 isFollowing
    //                   ? "border-neutral-200 bg-transparent dark:bg-neutral-50 hover:border-red-200 hover:bg-red-50 text-neutral-800 hover:text-red-600"
    //                   : "bg-neutral-900 dark:bg-slate-50 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
    //               }
    //               size={"sm"}
    //               onMouseEnter={() => setIsHovering(true)}
    //               onMouseLeave={() => setIsHovering(false)}
    //               onClick={() => setIsFollowing(!isFollowing)}
    //             >
    //               {isFollowing ? (isHovering ? "Unfollow" : "Following") : "Follow"}
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </CardHeader>

    //   <CardContent>
    //     <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
    //       {user.name}
    //       {user.isVerified && <Verified />}
    //     </h1>

    //     <div className="flex flex-row items-center gap-1">
    //       <p className="text-gray-500">@{user.handle}</p>
    //       {isFollowToo && (
    //         <span className="select-none text-neutral-500 bg-neutral-200 dark:bg-neutral-800 rounded-full px-2 py-0.5 text-xs">
    //           {isFollowToo && isFollowing ? "Mutual Follow" : "Follows you"}
    //         </span>
    //       )}
    //     </div>

    //     <p className="text-gray-400 mt-1">{user.bio}</p>
    //   </CardContent>
    // </Card>
  )
}