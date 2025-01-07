import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { username } from "better-auth/plugins";
 
const prisma = new PrismaClient();
 
export const auth = betterAuth({
  appName: "Social",

  plugins: [username()],
 
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  })
})