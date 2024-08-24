import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username"),
  password_hash: text("password"),
  email: text("email").unique(),
  email_verified: boolean("email_verified").default(false).notNull(),
  is_first_visit: boolean("is_first_visit").default(true).notNull(),
});

export type User = typeof userTable.$inferSelect;
