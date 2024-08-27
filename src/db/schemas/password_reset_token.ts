import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const passwordResetToken = pgTable("password_reset_token", {
  id: text("id").primaryKey(),
  tokenHash: text("token_hash").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expires_at: timestamp("expires_at", { mode: "date" }).notNull(),
});

export type passwordResetToken = typeof passwordResetToken.$inferSelect;
