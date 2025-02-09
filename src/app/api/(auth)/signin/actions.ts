"use server";

import { validSchemaAuth } from "@/zod/auth/schema-auth";
import { ActionResult } from "next/dist/server/app-render/types";
import { verify } from "@node-rs/argon2";
import { reddit } from "@/lib/auth/providers";
import { lucia } from "@/lib/auth/auth";
import { google } from "@/lib/auth/providers";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromDatabaseIfExist } from "../user/actions";

//
//#region login
//

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
  const ifUsernameAlreadyExist = await getUserFromDatabaseIfExist(parseData.email);

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
      message: "A problem occured, please contact the support or login with google or reddit",
    };
  }

  const validPassword = await verify(ifUsernameAlreadyExist.password_hash as string, parseData.password, { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 });

  if (!validPassword) {
    return {
      status: "error",
      message: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(ifUsernameAlreadyExist.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/");
}

//
//#region loginWithGoogle
//

export const loginWithGoogle = async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookies().set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  console.log("SUCCESS LOGIN oura");

  redirect(url.toString());
};

//
//#region loginWithReddit
//

export const loginWithReddit = async () => {
  const state = generateState();
  const url: URL = await reddit.createAuthorizationURL(state, {
    scopes: ["identity"],
  });

  cookies().set("reddit_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  redirect(url.toString());
};
