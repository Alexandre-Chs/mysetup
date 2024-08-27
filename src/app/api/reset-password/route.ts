import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import { passwordResetToken } from "@/db/schemas/password_reset_token";
import { lucia } from "@/lib/auth/auth";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (typeof password !== "string" || password.length < 8) {
    return new Response(null, {
      status: 400,
    });
  }

  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));

  const currentUserToken = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.tokenHash, tokenHash));

  if (currentUserToken.length > 0) {
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.tokenHash, tokenHash));
  }

  if (
    currentUserToken.length === 0 ||
    !isWithinExpirationDate(currentUserToken[0].expires_at)
  ) {
    return NextResponse.json({
      error: "Invalid token",
    });
  }

  await lucia.invalidateUserSessions(currentUserToken[0].userId);
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  await db
    .update(userTable)
    .set({ password_hash: passwordHash })
    .where(eq(userTable.id, currentUserToken[0].userId));

  const session = await lucia.createSession(currentUserToken[0].userId, {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": sessionCookie.serialize(),
      "Referrer-Policy": "strict-origin",
    },
  });
}
