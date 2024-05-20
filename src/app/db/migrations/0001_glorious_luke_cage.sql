ALTER TABLE "example" ADD COLUMN "lastname" text;--> statement-breakpoint
ALTER TABLE "example" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "example" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "example" DROP COLUMN IF EXISTS "updated_at";