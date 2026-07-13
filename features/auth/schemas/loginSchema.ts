import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .and(
      z.union([
        z.string().email({ message: "Please enter a valid email address" }),
        z.string(),
      ]),
    ),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
