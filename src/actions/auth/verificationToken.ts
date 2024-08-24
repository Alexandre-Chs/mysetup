import { db } from "@/db/db";
import { emailVerificationToken } from "@/db/schemas/email_verification_token";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { TimeSpan, createDate } from "oslo";

export async function createEmailVerificationToken(
  userId: string,
  email: string
): Promise<string> {
  // optionally invalidate all existing tokens for the current user id
  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.userId, userId));

  const tokenId = generateIdFromEntropySize(25);

  await db.insert(emailVerificationToken).values({
    id: tokenId,
    userId,
    email,
    expires_at: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}
