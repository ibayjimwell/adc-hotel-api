ALTER TABLE "guests" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "guests" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "guests" ADD COLUMN "is_active" varchar(1) DEFAULT 'Y' NOT NULL;--> statement-breakpoint
ALTER TABLE "guests" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
CREATE INDEX "guests_email_idx" ON "guests" USING btree ("email");--> statement-breakpoint
CREATE INDEX "guests_phone_idx" ON "guests" USING btree ("phone");

CREATE UNIQUE INDEX IF NOT EXISTS guests_email_unique ON guests (email)
WHERE
    email IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS guests_phone_unique ON guests (phone)
WHERE
    phone IS NOT NULL;