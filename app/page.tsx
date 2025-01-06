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
      {data ? (
        <Card className={cn(
          "bg-[#F9FAFB] dark:bg-[#1A1A1A]"
        )}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Image src={data.user.image ?? ""} alt={data.user.name} width={40} height={40} className="rounded-full" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{data.user.name}</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Postez quelque chose...</p>
            </div>
          </CardHeader>

          <CardContent>
            <XTextarea
              placeholder="Répondre à ce post..."
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
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold">Bonjour, visiteur !</h1>

          <Button className="mt-4" onClick={signIn}>
            <FaGoogle className="mr-2" />
            Se connecter
          </Button>
        </div>
      )}

      <div className="space-y-4 relative">
        {posts.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  );
}

export default Home;