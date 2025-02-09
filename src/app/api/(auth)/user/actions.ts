"use server";

import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { updateUserInfosEmailZod, updateUserInfosUsernameZod } from "@/zod/auth/update-user";
import { eq, sql } from "drizzle-orm";
import { discordLog } from "../../(utils)/actions";

//
//#region ifUsernameExistInDatabase
//

export async function ifUsernameExistInDatabase(username: string): Promise<boolean> {
  const response = await db.select().from(userTable).where(eq(userTable.username, username.toLowerCase()));

  return response.length > 0;
}

//
//#region ifEmailExistInDatabase
//

export async function ifEmailExistInDatabase(email: string): Promise<boolean> {
  const response = await db.select().from(userTable).where(eq(userTable.email, email));

  return response.length > 0;
}

//
//#region getUserFromDatabaseIfExist
//

export async function getUserFromDatabaseIfExist(email: string) {
  const response = await db
    .select({
      id: userTable.id,
      username: userTable.username,
      password_hash: userTable.password_hash,
    })
    .from(userTable)
    .where(eq(sql`LOWER(${userTable.email})`, email.toLowerCase()));

  if (response.length === 0) {
    return false;
  } else {
    return response[0];
  }
}

//
//#region addUserToDatabase
//

export async function addUserToDatabase(id: string, username: string, password_hash: string, email: string) {
  await db.insert(userTable).values({
    id,
    username,
    password_hash,
    email,
    email_verified: false,
  });
}

//
//#region updateUserInfosEmail
//

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
  await db.update(userTable).set({ email: parseData.email }).where(eq(userTable.id, user.id));

  try {
    if (email && user.username) {
      await discordLog(`🎉 NOUVEAU USER ! Username : ${user.username} - Email : ${email} via les providers !`);
    }
  } catch (e) {
    console.log(e);
  }

  const baseUrl = process.env.BASE_URL;
  try {
    await fetch(`${baseUrl}/api/send-welcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username: user.username,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}

//
//#region updateUserInfosUsername
//

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
  await db.update(userTable).set({ username: parseData.username }).where(eq(userTable.id, user.id));

  try {
    const baseUrl = process.env.BASE_URL;

    await fetch(`${baseUrl}/api/send-welcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        username: parseData.username,
      }),
    });
  } catch (e) {
    console.log(e);
  }

  try {
    if (username && user.email) {
      await discordLog(`🎉 NOUVEAU USER ! Username : ${username} - Email : ${user.email} via les providers !`);
    }
  } catch (e) {
    console.log(e);
  }
}
