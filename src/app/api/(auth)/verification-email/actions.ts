"use server";

import { db } from "@/db/db";
import { emailVerificationToken } from "@/db/schemas/email_verification_token";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { userTable } from "@/db/schemas";
import { lucia } from "@/lib/auth/auth";
import { cookies } from "next/headers";

//
//#region createEmailVerificationToken
//

export async function createEmailVerificationToken(userId: string, email: string): Promise<string> {
  // optionally invalidate all existing tokens for the current user id
  await db.delete(emailVerificationToken).where(eq(emailVerificationToken.userId, userId));

  const tokenId = generateIdFromEntropySize(25);

  await db.insert(emailVerificationToken).values({
    id: tokenId,
    userId,
    email,
    expires_at: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}

//
//#region SendVerifyEmail
//
export async function SendVerifyEmail() {
  const { user } = await validateRequest();
  if (!user) return console.log("user not found for verification email");

  const verificationToken = await createEmailVerificationToken(user.id, user.email);

  const baseUrl = process.env.BASE_URL;
  const verificationLink = `${baseUrl}/email-verification/${verificationToken}`;

  try {
    await fetch(`${baseUrl}/api/verification-email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        verificationLink,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}

//
//#region VerifyEmail
//

export async function VerifyEmail(verificationToken: string) {
  try {
    const token = await db.select().from(emailVerificationToken).where(eq(emailVerificationToken.id, verificationToken));

    if (token) {
      await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id, token[0].id));
    }

    if (!token || !isWithinExpirationDate(token[0].expires_at)) {
      return new Response(null, {
        status: 400,
      });
    }
    const user = await db.select().from(userTable).where(eq(userTable.id, token[0].userId));

    // const user = await db.table("user").where("id", "=", token.user_id).get();
    if (!user || user[0].email !== token[0].email) {
      return new Response(null, {
        status: 400,
      });
    }

    await lucia.invalidateUserSessions(user[0].id);
    await db.update(userTable).set({ email_verified: true }).where(eq(userTable.id, user[0].id));

    const session = await lucia.createSession(user[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return {
      message: "Email verified successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error while verifying email",
      status: 500,
    };
  }
}
