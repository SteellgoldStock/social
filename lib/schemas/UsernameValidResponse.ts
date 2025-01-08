import { z } from "zod";

// Type d'erreur possible
const UsernameErrorSchema = z.enum([
  "Missing",
  "TooShort",
  "TooLong",
  "InvalidCharacters",
  "InvalidStarting",
  "InvalidEnding",
  "Taken"
]);

const ErrorResponseSchema = z.object({
  status: z.literal(400),
  body: z.object({
    error: UsernameErrorSchema
  })
});

const SuccessResponseSchema = z.object({
  status: z.literal(200),
  body: z.object({
    valid: z.literal(true)
  })
});

export const UsernameCheckResponseSchema = z.discriminatedUnion("status", [
  ErrorResponseSchema,
  SuccessResponseSchema
]);

export type UsernameCheckResponse = z.infer<typeof UsernameCheckResponseSchema>;