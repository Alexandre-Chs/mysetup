"use server";

import { db } from "@/db/db";
import { socialLinksTable } from "@/db/schemas";
import { userProfileTable } from "@/db/schemas/user_profile";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";

export async function updateProfile(data: any) {
  const { user } = await validateRequest();
  if (!user) return;

  await db.transaction(async (tx) => {
    try {
      await tx.insert(userProfileTable).values({
        id: crypto.randomUUID(),
        userId: user.id,
        profileDescription: data.profileDescription,
      });

      await tx
        .delete(socialLinksTable)
        .where(eq(socialLinksTable.userId, user.id));

      for (const link of data.socialLinks) {
        await tx.insert(socialLinksTable).values({
          id: crypto.randomUUID(),
          userId: user.id,
          socialName: link.socialName,
          link: link.link,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}
