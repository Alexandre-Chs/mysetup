"use server";

import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import { setupTable } from "@/db/schemas";
import { desc, eq } from "drizzle-orm";

export async function listUserSetup(username: string) {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username));

  return await db
    .select()
    .from(setupTable)
    .where(eq(setupTable.userId, users[0].id))
    .orderBy(desc(setupTable.createdAt));
}
