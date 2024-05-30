"use server";

import { db } from "@/app/db/db";
import { userTable } from "@/app/db/schemas/user";
import { eq } from "drizzle-orm";

export async function ifUserExistInDatabase(username: string) {
  const response = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username.toLowerCase()));

  return response.length > 0;
}
