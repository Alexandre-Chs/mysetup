import { Google } from "arctic";
import { Reddit } from "arctic";

export const google = new Google(
  process.env.GOOGLE_ID!,
  process.env.GOOGLE_SECRET!,
  `${process.env.BASE_URL}/login/google/callback`
);

export const reddit = new Reddit(
  "gcWAWcDjvc1EWSjOilarNw",
  "qPO5OYSBt5C_AachRHoUSx_rw2k0dg",
  `${process.env.BASE_URL}/login/reddit/callback`
);
