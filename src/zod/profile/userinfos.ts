import { z } from "zod";

const socialLinkSchema = z.object({
  id: z.number(),
  socialName: z
    .string()
    .min(1, { message: "You must select a social network" }),
  link: z.string().url({ message: "Invalid URL for social link" }),
});

export const validUserInfosProfile = z.object({
  profileDescription: z
    .string()
    .min(1, { message: "You must enter a profile description" })
    .max(500, {
      message: "Profile description must be at most 500 characters long",
    }),
  socialLinks: z
    .array(socialLinkSchema)
    .max(5, { message: "You can have a maximum of 5 social links" })
    .optional()
    .default([]),
});

// Types dérivés du schéma Zod pour une utilisation dans le composant
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type UserProfile = z.infer<typeof validUserInfosProfile>;
