import { db } from "@/db/db";
import { passwordResetToken } from "@/db/schemas/password_reset_token";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
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

  console.log(currentUserToken);

  if (currentUserToken.length > 0) {
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.tokenHash, tokenHash));
  }

  //   if (!token || !isWithinExpirationDate(token.expires_at)) {
  //     return new Response(null, {
  //       status: 400,
  //     });
  //   }

  //   await lucia.invalidateUserSessions(token.user_id);
  //   const passwordHash = await hash(password, {
  //     // recommended minimum parameters
  //     memoryCost: 19456,
  //     timeCost: 2,
  //     outputLen: 32,
  //     parallelism: 1,
  //   });
  //   await db.table("user").where("id", "=", token.user_id).update({
  //     password_hash: passwordHash,
  //   });

  //   const session = await lucia.createSession(token.user_id, {});
  //   const sessionCookie = lucia.createSessionCookie(session.id);
  //   return new Response(null, {
  //     status: 302,
  //     headers: {
  //       Location: "/",
  //       "Set-Cookie": sessionCookie.serialize(),
  //       "Referrer-Policy": "strict-origin",
  //     },
  //   });

  return NextResponse.json({
    message: "Mot de passe réinitialisé avec succès",
  });
}
