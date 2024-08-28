"use server";

import { db } from "@/db/db";
import { setupPhotoTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteSetupPhoto(id: string) {
  const { user } = await validateRequest();

  const photoUser = await db.query.setupPhotoTable.findFirst({
    with: {
      setup: true,
    },
    where: (setupPhotoTable, { eq }) => eq(setupPhotoTable.id, id),
  })

  console.log({ photoUser, user });
  if (photoUser?.setup.userId !== user!.id) {
    throw new Error("Unauthorized");
  }

  await db.delete(setupPhotoTable).where(eq(setupPhotoTable.id, id));

  revalidatePath(`/${user!.username}/${photoUser.setup.id}`);
}