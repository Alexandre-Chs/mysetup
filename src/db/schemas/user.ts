import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password").notNull(),
  email: text("email").unique(),
  email_verified: boolean("email_verified").notNull().default(false),
});

export type User = typeof userTable.$inferSelect;
