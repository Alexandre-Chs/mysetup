import { Google } from "arctic";

export const google = new Google(
  process.env.GOOGLE_ID!,
  process.env.GOOGLE_SECRET!,
  `${process.env.BASE_URL}/login/google/callback`
);
