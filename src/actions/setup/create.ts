"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas/setup";
import { validateRequest } from "@/lib/auth/validate-request";
import { generateIdFromEntropySize } from "lucia";

export async function createSetup(name: string, description?: string) {
    const { user } = await validateRequest();
    
    return await db.insert(setupTable).values({
        id: generateIdFromEntropySize(10),
        userId: user!.id,
        name,
        description,
    }).returning();
}