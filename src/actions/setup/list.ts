"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas/setup";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";

export async function listUserSetup() {
    const {user} = await validateRequest();
    if (!user) {
        console.log("here")
        return;
    }

    return await db.select().from(setupTable).where(eq(setupTable.userId, user.id));

}