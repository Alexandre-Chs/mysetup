"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";

export async function createSetup(setupId: string) {
    const { user } = await validateRequest();

    return await db.delete(setupTable).where(eq(setupTable.id, setupId))
}