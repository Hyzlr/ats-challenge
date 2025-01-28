import { z } from 'zod';

export const roleSchema = z.object({
  name: z.string().min(1, { message: "Role name is required." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long." }),
  addedBy: z.string().min(1, { message: "Added by field is required." }),
}).refine((data) => data.name !== data.description, {
  message: "Role name and description cannot be the same.",
  path: ["name", "description"],
});

export type RoleSchema = z.infer<typeof roleSchema>;