"use server";

import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validSchemaAuthWithEmail } from "@/lib/zod/auth";
import { addUserToDatabase, ifEmailExistInDatabase, ifUsernameExistInDatabase } from "../user/actions";
import { discordLog } from "../../(utils)/actions";

export async function signup(formData: FormData) {
  //check if data is valid
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;

  const parseResult = validSchemaAuthWithEmail.safeParse({
    username,
    password,
    email,
  });

  if (!parseResult.success) {
    return;
  }

  const parseData = parseResult.data;
  //hash password
  const passwordHash = await hash(parseData.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10);

  const ifUsernameAlreadyExist = await ifUsernameExistInDatabase(parseData.username);
  if (ifUsernameAlreadyExist) {
    return {
      status: "error",
      message: "Username already exists",
    };
  }

  //check if email is already in database
  const ifEmailAlreadyExist = await ifEmailExistInDatabase(parseData.email);
  if (ifEmailAlreadyExist) {
    return {
      status: "error",
      message: "Email already exists",
    };
  }

  //add user in database if username does not exist
  await addUserToDatabase(userId, parseData.username, passwordHash, email);

  try {
    await discordLog(`🎉 NOUVEAU USER ! Username : ${parseData.username} - Email : ${email} via les credentials !`);
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
        username: parseData.username,
      }),
    });
  } catch (e) {
    console.log(e);
  }

  //config session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/");
}
