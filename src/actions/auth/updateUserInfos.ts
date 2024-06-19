"use server";

import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import {
  updateUserInfosEmailZod,
  updateUserInfosUsernameZod,
} from "@/zod/auth/update-user";
import { eq } from "drizzle-orm";

export async function updateUserInfosEmail(email: string) {
  const { user } = await validateRequest();
  if (!user) return;

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
    .where(eq(userTable.id, user.id));
}

export async function updateUserInfosUsername(username: string) {
  const { user } = await validateRequest();
  if (!user) return;

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
    .where(eq(userTable.id, user.id));
}
