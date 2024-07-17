"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";

export async function createSetup(name: string, description?: string) {
    const { user } = await validateRequest();
    
    await db.insert(setupTable).values({
        id: generateIdFromEntropySize(10),
        userId: user!.id,
        name,
        description,
    }).returning();

    revalidatePath("/profile/" + user!.username);
}