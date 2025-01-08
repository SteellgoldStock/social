import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db/prisma";
import { oneTap, username } from "better-auth/plugins";
 
export const auth = betterAuth({
  plugins: [oneTap(), username()],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },
 
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  })
})