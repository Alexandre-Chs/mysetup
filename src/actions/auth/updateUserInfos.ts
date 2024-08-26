"use server";

import { SendWelcomeEmail } from "@/app/api/send/route";
import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import {
  updateUserInfosEmailZod,
  updateUserInfosUsernameZod,
} from "@/zod/auth/update-user";
import { eq } from "drizzle-orm";
import { discordLog } from "../utils";

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

  try {
    if (email && user.username) {
      await discordLog(`🎉 NOUVEAU USER ! Username : ${user.username} - Email : ${email} via les providers !`);
    }
  } catch (e) {
    console.log(e);
  }

  try {
    await SendWelcomeEmail(email, user.username);
  } catch (e) {
    console.log(e);
  }
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

  try {
    await SendWelcomeEmail(user.email, parseData.username);
  } catch (e) {
    console.log(e);
  }

  try {
    if (username && user.email) {
      await discordLog(`🎉 NOUVEAU USER ! Username : ${username} - Email : ${user.email} via les providers !`)
    }
  } catch (e) {
    console.log(e);
  }
}
