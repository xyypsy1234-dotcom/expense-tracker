import { z } from "zod";
export const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z
      .email({ message: "Please enter a valid email address" })
      .min(4, { message: "Email is required" }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignupFormData = z.infer<typeof signupSchema>;
