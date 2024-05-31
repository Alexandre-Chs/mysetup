"use server";

import { validSchemaSignup } from "@/zod/auth/schema-auth";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { addUserToDatabase, ifUsernameExistInDatabase } from "./user";
import { lucia } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  //check if data is valid
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const parseResult = validSchemaSignup.safeParse({ username, password });

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
  const ifUsernameAlreadyExist = await ifUsernameExistInDatabase(
    parseData.username
  );
  if (ifUsernameAlreadyExist) {
    return {
      status: "error",
      message: "Username already exists",
    };
  }

  //add user in database if username does not exist
  await addUserToDatabase(userId, parseData.username, passwordHash);

  //config session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
