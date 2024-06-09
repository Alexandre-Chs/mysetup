import { z } from "zod";

export const updateUserInfosUsernameZod = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(31, { message: "Username must be at most 31 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers and underscores",
    }),
});

export const updateUserInfosEmailZod = z.object({
  email: z.string().email(),
});

export const updateUserInfosUsernameAndEmailZod = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(31, { message: "Username must be at most 31 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers and underscores",
    }),
  email: z.string().email(),
});
