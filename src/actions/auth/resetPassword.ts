"use server";

import { TimeSpan, createDate } from "oslo";
import { random, sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db/db";
import { passwordResetToken } from "@/db/schemas/password_reset_token";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schemas";

export async function createPasswordResetToken(
  userId: string
): Promise<string> {
  await db
    .delete(passwordResetToken)
    .where(eq(passwordResetToken.userId, userId as string));

  const tokenId = generateIdFromEntropySize(25);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

  await db.insert(passwordResetToken).values({
    id: generateIdFromEntropySize(15),
    tokenHash,
    userId: userId as string,
    expires_at: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}

export async function resetPassword(email: string) {
  const currentUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (currentUser.length === 0) {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  //TODO base url ici
  const verificationToken = await createPasswordResetToken(currentUser[0].id);
  const verificationLink =
    "http://localhost:3000/reset-password/" + verificationToken;

  await fetch("/api/send-welcome", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      verificationLink,
    }),
  });

  return {
    status: 200,
    message: "Password reset email sent",
  };
}
