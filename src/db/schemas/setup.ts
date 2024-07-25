import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const setupTable = pgTable("setup", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  name: text("name"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Setup = typeof setupTable.$inferSelect;
