import { pgTable, text } from "drizzle-orm/pg-core";
import { setupPhotoTable } from "./setup_photo";
import { equipmentsTable } from "./equipments";

export const photoEquipmentTable = pgTable("photo_equipment", {
  id: text("id").primaryKey(),
  setupPhotoId: text("setup_photo_id")
    .notNull()
    .references(() => setupPhotoTable.id),
  equipmentId: text("equipment_id").notNull().references(() => equipmentsTable.id),
});

export type PhotoEquipment = typeof photoEquipmentTable.$inferSelect;