import { relations } from "drizzle-orm";
import { setupTable } from "./setup";
import { setupPhotoTable } from "./setup_photo";
import { mediaTable } from "./media";

export const setupPhotoTableRelation = relations(setupPhotoTable, ({ one }) => ({
    setup: one(setupTable, {
        fields: [setupPhotoTable.setupId],
        references: [setupTable.id]
    }),
    media: one(mediaTable, {
        fields: [setupPhotoTable.mediaId],
        references: [mediaTable.id]
    }),
}));

export const setupTableRelation = relations(setupTable, ({ many }) => ({
    setupPhotos: many(setupPhotoTable)
}))

export const mediaTableRelation = relations(mediaTable, ({ one }) => ({
    setupPhoto: one(setupPhotoTable)
}));