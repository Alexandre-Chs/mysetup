import { db } from "@/db/db";
import { lucia } from "@/lib/auth/auth";
import { google } from "@/lib/auth/providers";
import {
  generateCodeVerifier,
  generateState,
  OAuth2RequestError,
} from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log("GET request received");
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedStateVerifier =
    cookies().get("google_oauth_code_verifier")?.value ?? null;

  //throw error if nothing matches
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedStateVerifier as string
    );

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await googleUserResponse.json();

    console.log({ googleUser });

    // const existingUser = await db.query.userTable.findFi

    // if (existingUser) {
    //   const session = await lucia.createSession(existingUser.id, {});
    //   const sessionCookie = lucia.createSessionCookie(session.id);
    //   cookies().set(
    //     sessionCookie.name,
    //     sessionCookie.value,
    //     sessionCookie.attributes
    //   );
    //   return new Response(null, {
    //     status: 302,
    //     headers: {
    //       Location: "/",
    //     },
    //   });
    // }

    // const userId = generateIdFromEntropySize(10); // 16 characters long

    // // Replace this with your own DB client.
    // await db.table("user").insert({
    //   id: userId,
    //   github_id: githubUser.id,
    //   username: githubUser.login,
    // });

    // const session = await lucia.createSession(userId, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes
    // );
    // return new Response(null, {
    //   status: 302,
    //   headers: {
    //     Location: "/",
    //   },
    // });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
