import { createAuthClient } from "better-auth/react";
import { oneTapClient, usernameClient } from "better-auth/client/plugins";
import { toast } from "sonner";

export const client = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    }),
    usernameClient(),
  ],

  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    }
  }
});

export const {
  signUp,
  signIn,
  signOut,

  useSession,

  forgetPassword,
  resetPassword,

  sendVerificationEmail,
  verifyEmail
} = client;