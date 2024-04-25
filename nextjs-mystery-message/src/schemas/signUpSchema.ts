import { z } from "zod";

export const UsernameValidation = z
.string()
.min(2, "username must be atleasr 2 char")
.max(20, "username must be no more than 20 char")
.regex(/^[a-zA-Z0-9_]+$/, "username must not contain special char")

export const SignUpSchema = z.object({
  username: UsernameValidation,
  email: z.string().email({message: "Invalid Email"}),
  password: z
  .string()
  .min(6, {message: "password must be atleast 6 char"})
  .max(20, {message: "password must not be more than 20 char"}),
})
