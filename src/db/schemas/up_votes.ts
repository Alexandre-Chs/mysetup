import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { setupTable } from "./setup";
import { userTable } from "./user";

export const upVoteTable = pgTable("up_vote", {
  id: text("id").primaryKey(),
  setupId: text("setup_id")
    .notNull()
    .references(() => setupTable.id),
  userId: text("user_id").notNull().references(() => userTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export type UpVote = typeof upVoteTable.$inferSelect;