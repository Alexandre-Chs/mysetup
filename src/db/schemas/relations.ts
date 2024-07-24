import { relations } from "drizzle-orm";
import { setupTable } from "./setup";
import { setupPhotoTable } from "./setup_photo";
import { mediaTable } from "./media";
import { photoEquipmentTable } from "./photo_equipment";
import { equipmentsTable } from "./equipments";

export const setupPhotoTableRelation = relations(setupPhotoTable, ({ one, many }) => ({
    setup: one(setupTable, {
        fields: [setupPhotoTable.setupId],
        references: [setupTable.id]
    }),
    media: one(mediaTable, {
        fields: [setupPhotoTable.mediaId],
        references: [mediaTable.id]
    }),
    photoEquipments: many(photoEquipmentTable)
}));

export const setupTableRelation = relations(setupTable, ({ many }) => ({
    setupPhotos: many(setupPhotoTable)
}))

export const mediaTableRelation = relations(mediaTable, ({ one }) => ({
    setupPhoto: one(setupPhotoTable)
}));

export const photoEquipmentTableRelation = relations(photoEquipmentTable, ({ one }) => ({
    setupPhoto: one(setupPhotoTable, {
        fields: [photoEquipmentTable.setupPhotoId],
        references: [setupPhotoTable.id]
    }),
    equipment: one(equipmentsTable, {
        fields: [photoEquipmentTable.equipmentId],
        references: [equipmentsTable.id]
    })
}))

export const equipmentsTableRelation = relations(equipmentsTable, ({ many }) => ({
    photoEquipments: many(photoEquipmentTable)
}))