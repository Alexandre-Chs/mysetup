"use server";
import { db } from "@/db/db";
import { upVoteTable } from "@/db/schemas";
import { and, eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";

export const toggleUpVote = async (setupId: string, userId: string) => {
  const upVote = await db.query.upVoteTable.findFirst({
    where: and(eq(upVoteTable.setupId, setupId), eq(upVoteTable.userId, userId)),
  });

  if (upVote) { await db.delete(upVoteTable).where(eq(upVoteTable.id, upVote.id)); }
  else {
    await db.insert(upVoteTable).values({
      id: generateIdFromEntropySize(10),
      setupId,
      userId
    }).execute();
  }

  const setup = await db.query.setupTable.findFirst({ where: eq(upVoteTable.id, setupId) });

  revalidatePath(`/${setup?.userId}/${setup?.id}`);
};