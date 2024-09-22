"use server";

import { db } from "@/db/db";
import { socialLinksTable, userTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getUserInfos(username: string) {
  if (!username) return null;
  const user = await db
    .select()
    .from(userTable)
    .innerJoin(socialLinksTable, eq(userTable.id, socialLinksTable.userId))
    .where(eq(userTable.username, username))
    .limit(1);

  if (user.length === 0) return null;
  return user[0];
}
