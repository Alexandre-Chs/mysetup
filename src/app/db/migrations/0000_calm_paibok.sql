CREATE TABLE IF NOT EXISTS "example" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"created_at" text,
	"updated_at" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
