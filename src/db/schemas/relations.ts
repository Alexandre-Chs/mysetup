import { relations } from "drizzle-orm";
import { setupTable } from "./setup";
import { setupPhotoTable } from "./setup_photo";
import { mediaTable } from "./media";
import { photoEquipmentTable } from "./photo_equipment";
import { equipmentsTable } from "./equipments";
import { userTable } from "./user";
import { upVoteTable } from "./up_votes";

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

export const setupTableRelation = relations(setupTable, ({ many, one }) => ({
    setupPhotos: many(setupPhotoTable),
    user: one(userTable, {
        fields: [setupTable.userId],
        references: [userTable.id]
    }),
    equipments: many(equipmentsTable),
    upVotes: many(upVoteTable)
}))

export const upVoteTableRelation = relations(upVoteTable, ({ one }) => ({
    setup: one(setupTable, {
        fields: [upVoteTable.setupId],
        references: [setupTable.id]
    })
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

export const equipmentsTableRelation = relations(equipmentsTable, ({ many, one }) => ({
    photoEquipments: many(photoEquipmentTable),
    setup: one(setupTable, {
        fields: [equipmentsTable.setupId],
        references: [setupTable.id]
    })
}))

export const userTableRelation = relations(userTable, ({ many }) => ({
    setups: many(setupTable)
}));