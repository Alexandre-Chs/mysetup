"use server";

import { db } from "@/app/db/db";
import { userTable } from "@/app/db/schemas/user";
import { eq } from "drizzle-orm";

export async function ifUsernameExistInDatabase(username: string) {
  const response = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username.toLowerCase()));

  return response.length > 0;
}

export async function addUserToDatabase(
  id: string,
  username: string,
  password_hash: string
) {
  await db.insert(userTable).values({
    id,
    username,
    password_hash,
  });
}
