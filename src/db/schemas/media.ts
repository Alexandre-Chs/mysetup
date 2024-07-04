import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const mediaTable = pgTable("media", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  size: integer("size").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull().defaultNow(),
});

export type Media = typeof mediaTable.$inferSelect;
