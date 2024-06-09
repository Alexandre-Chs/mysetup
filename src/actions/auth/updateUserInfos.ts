"use server";

import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import {
  updateUserInfosEmailZod,
  updateUserInfosUsernameZod,
} from "@/zod/auth/update-user";
import { eq } from "drizzle-orm";

export async function updateUserInfosEmail(id: string, email: string) {
  const parseDataWithZod = updateUserInfosEmailZod.safeParse({
    email,
  });

  if (!parseDataWithZod.success) {
    return;
  }

  const parseData = parseDataWithZod.data;
  await db
    .update(userTable)
    .set({ email: parseData.email })
    .where(eq(userTable.id, id));
}

export async function updateUserInfosUsername(id: string, username: string) {
  const parseDataWithZod = updateUserInfosUsernameZod.safeParse({
    username,
  });

  if (!parseDataWithZod.success) {
    return;
  }

  const parseData = parseDataWithZod.data;
  await db
    .update(userTable)
    .set({ username: parseData.username })
    .where(eq(userTable.id, id));
}
