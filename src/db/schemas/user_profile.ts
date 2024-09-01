import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const userProfileTable = pgTable("user_profile", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  profileDescription: text("profile_description").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }),
});

export type UserProfile = typeof userProfileTable.$inferSelect;
