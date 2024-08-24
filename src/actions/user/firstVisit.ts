"use server";

import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";

export async function setFirstVisit() {
  const { user } = await validateRequest();
  if (!user) return;

  await db
    .update(userTable)
    .set({ is_first_visit: false })
    .where(eq(userTable.id, user.id));
}

export async function getFirstVisit() {
  const { user } = await validateRequest();
  if (!user) return;

  const isFirstVisit = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, user.id));

  return isFirstVisit[0].is_first_visit;
}
