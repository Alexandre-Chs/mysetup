"use server";

import { db } from "@/db/db";
import { upVoteTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { and, eq } from "drizzle-orm";

export const getSetupUpVotes = async (setupId: string) => {
  return await db.query.upVoteTable.findMany({
    where: eq(upVoteTable.setupId, setupId),
  });
};

export const hasUserUpVotedSetup = async (setupId: string) => {
  const { user } = await validateRequest();
  if (!user) { return false; }

  const upvote = await db.query.upVoteTable.findFirst({
    where: and(eq(upVoteTable.setupId, setupId), eq(upVoteTable.userId, user.id)),
  });

  return !!upvote;
};