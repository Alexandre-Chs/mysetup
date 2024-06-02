import { pgTable, text } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password").notNull(),
});

export type User = typeof userTable.$inferSelect;
