import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261016121253 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "custom_design" ("id" text not null, "url" text not null, "file_id" text null, "original_filename" text null, "mime_type" text not null default 'image/webp', "width" integer null, "height" integer null, "cart_id" text null, "line_item_id" text null, "order_id" text null, "order_item_id" text null, "customer_id" text null, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "custom_design_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_custom_design_deleted_at" ON "custom_design" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "custom_design" cascade;`);
  }

}
