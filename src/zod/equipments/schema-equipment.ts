import { z } from "zod";

export const validSchemaEquipment = z.object({
  name: z
    .string()
    .min(1, { message: "You must enter a name" })
    .max(31, { message: "Name must be at most 31 characters long" })
    .regex(/^[a-zA-Z0-9-_ ]+$/, {
      message: "Name can only contain letters, numbers, dashes and underscores",
    }),
  category: z.enum(["Main Hardware", "Audio", "Desk Setup", "Lighting", "Accessories", "Decoration"], {
    message: "You must select a type",
  }),
  type: z.string(),
  url: z.string().optional(),
});
