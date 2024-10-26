"use server";

import { db } from "@/db/db";
import {
  mediaTable,
  socialLinksTable,
  userProfileTable,
  userTable,
} from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getUserInfos(username: string) {
  if (!username) return null;

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1);

  if (user.length === 0) return null;

  const media = user[0].pictureId
    ? await db
        .select()
        .from(mediaTable)
        .where(eq(mediaTable.id, user[0].pictureId))
        .limit(1)
    : [];

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
    media: media[0] || null,
    profile: userProfile[0] || null,
    socialLinks: socialLinks,
  };
}
