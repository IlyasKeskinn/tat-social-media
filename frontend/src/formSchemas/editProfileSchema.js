import * as z from "zod";

export const editProfileSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(24, "Username must be at most 24 characters"),
  fullName: z
    .string()
    .min(6, "Full name must be at least 6 characters")
    .max(48, "Full name must be at most 48 characters"),
  bio: z.string().max(300, "Bio must be at most 300 characters"),
});
