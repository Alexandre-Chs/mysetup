import { relations } from "drizzle-orm";
import { setupTable } from "./setup";
import { setupPhotoTable } from "./setup_photo";
import { mediaTable } from "./media";

export const setupPhotoTableRelation = relations(setupPhotoTable, ({ one }) => ({
    setup: one(setupTable, {
        //@ts-ignore
        fields: [setupTable.id],
        //@ts-ignore
        references: [setupPhotoTable.setupId]
    }),
    media: one(mediaTable, {
        //@ts-ignore
        fields: [mediaTable.id],
        //@ts-ignore
        references: [setupPhotoTable.mediaId]
    }),
}));

export const setupTableRelation = relations(setupTable, ({ many }) => ({
    setupPhotos: many(setupPhotoTable)
}))

export const mediaTableRelation = relations(mediaTable, ({ one }) => ({
    setupPhoto: one(setupPhotoTable)
}));