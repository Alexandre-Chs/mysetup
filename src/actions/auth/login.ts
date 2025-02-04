"use server";

import { validSchemaAuth } from "@/zod/auth/schema-auth";
import { ActionResult } from "next/dist/server/app-render/types";
import { getUserFromDatabaseIfExist } from "./user";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData): Promise<ActionResult> {
  //check if data is valid
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const parseResult = validSchemaAuth.safeParse({ email, password });

  if (!parseResult.success) {
    return;
  }

  const parseData = parseResult.data;

  //check if user exist in database
  const ifUsernameAlreadyExist = await getUserFromDatabaseIfExist(
    parseData.email
  );

  //if user does not exist
  if (!ifUsernameAlreadyExist) {
    return {
      status: "error",
      message: "Incorrect username or password",
    };
  }
  //else check if password is correct

  if (!ifUsernameAlreadyExist.password_hash) {
    return {
      status: "error",
      message:
        "A problem occured, please contact the support or login with google or reddit",
    };
  }

  const validPassword = await verify(
    ifUsernameAlreadyExist.password_hash as string,
    parseData.password,
    { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 }
  );

  if (!validPassword) {
    return {
      status: "error",
      message: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(ifUsernameAlreadyExist.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}
