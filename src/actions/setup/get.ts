"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getSetup(id: string) {
    return await db.query.setupTable.findFirst({ 
        where: eq(setupTable.id, id),
        with: {
            setupPhotos: true,
        }
    });
}