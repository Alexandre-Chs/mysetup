"use server";

import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db/db";
import { passwordResetToken } from "@/db/schemas/password_reset_token";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schemas";

export async function createPasswordResetToken(userId: string): Promise<string> {
  await db.delete(passwordResetToken).where(eq(passwordResetToken.userId, userId as string));

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
  const currentUser = await db.select().from(userTable).where(eq(userTable.email, email));
  if (!currentUser || currentUser.length === 0) {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  const verificationToken = await createPasswordResetToken(currentUser[0].id);
  const baseUrl = process.env.BASE_URL;
  const verificationLink = `${baseUrl}/reset-password/${verificationToken}`;

  await fetch(`${baseUrl}/api/send-reset-password`, {
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
