"use server";

import { db } from "@/db/db";
import { socialLinksTable, userProfileTable, userTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getUserInfos(username: string) {
  if (!username) return null;

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1);

  if (user.length === 0) return null;

  const userProfile = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, user[0].id))
    .limit(1);

  const socialLinks = await db
    .select()
    .from(socialLinksTable)
    .where(eq(socialLinksTable.userId, user[0].id));

  return {
    profile: userProfile[0] || null,
    socialLinks: socialLinks,
  };
}
