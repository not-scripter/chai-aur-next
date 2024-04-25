import { z } from "zod";

export const MessagesSchema = z.object({
  content: z
  .string()
  .min(10, {message: "message must be at least of 10 char"})
  .max(100, {message: "message must be no longer than 100 char"})
})
