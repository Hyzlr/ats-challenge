import { z } from "zod";

export const userSignupSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Please provide a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(100, { message: "Password cannot be more than 100 characters long." }),
  }).refine((data) => data.firstName !== data.lastName, {
    message: "First name and last name cannot be the same.",
    path: ["firstName", "lastName"],
  });

export type UserSignupSchema = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
    email: z.string().email({ message: "Please provide a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(100, { message: "Password cannot be more than 100 characters long." }),
  });

export type UserLoginSchema = z.infer<typeof userLoginSchema>;