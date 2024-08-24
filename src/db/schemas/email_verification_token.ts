import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const emailVerificationToken = pgTable("email_verification_token", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  email: text("email").notNull(),
  expires_at: timestamp("expires_at", { mode: "date" }).notNull(),
});

export type EmailVerificationToken = typeof emailVerificationToken.$inferSelect;
