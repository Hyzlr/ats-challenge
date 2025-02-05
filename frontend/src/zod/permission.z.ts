import { z } from 'zod';

export const permissionSchema = z.object({
  name: z.string().min(1, { message: "Permission name is required." }),
  code: z.number().int().min(1, { message: "Permission code must be a positive integer." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long." }),
  addedBy: z.string().min(1, { message: "Added by field is required." }),
}).refine((data) => data.name !== data.description, {
  message: "Permission name and description cannot be the same.",
  path: ["name", "description"],
});

export type PermissionSchema = z.infer<typeof permissionSchema>;