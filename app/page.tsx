"use client";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { client, useSession } from "@/lib/auth/client";
import { posts } from "@/lib/data";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { XTextarea } from "@/components/ui/x-textarea";
import { cn } from "@/lib/utils";
import { MAX_POST_LENGTH } from "@/lib/consts";
import Image from "next/image";

const Home = (): ReactElement => {
  const { data } = useSession();

  const [reply, setReply] = useState("")

  const signIn = async () => {
    const data = await client.signIn.social({
      provider: "google"
    });

    if (data.error) {
      toast.error(data.error.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {data && (
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center gap-1">
              <Image
                src={data.user.image ?? ""}
                alt={data.user.name}
                width={35}
                height={35}
                className="rounded-full"
              />

              <div className="flex flex-col ml-2">
                <h1 className="text-lg font-bold">{data.user.name}</h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 -mt-1">Poster quelque chose !</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <XTextarea
              placeholder="Exprimez-vous !"
              onChange={(value: string) => setReply(value)}
            />
          </CardContent>

          <CardFooter>
            <div className="flex flex-row justify-end w-full items-center gap-3">
              <div className={cn("text-sm hidden", {
                "block": reply.length !== 0,
                "text-neutral-500 dark:text-neutral-400": reply.length < MAX_POST_LENGTH - 20,
                "text-yellow-500 dark:text-yellow-400": reply.length >= MAX_POST_LENGTH - 20 && reply.length < MAX_POST_LENGTH - 10,
                "text-red-500 dark:text-red-400": reply.length >= MAX_POST_LENGTH - 10,
              })}>
                {reply.length}/{MAX_POST_LENGTH}
              </div>
              
              <Button variant="default" size={"sm"}>Envoyer</Button>
            </div>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4 relative">
        {posts.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  );
}

export default Home;