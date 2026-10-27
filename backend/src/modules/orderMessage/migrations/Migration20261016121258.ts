import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261016121258 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "message_category" drop constraint if exists "message_category_handle_unique";`);
    this.addSql(`create table if not exists "message_category" ("id" text not null, "name" text not null, "handle" text not null, "description" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "message_category_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_message_category_handle_unique" ON "message_category" ("handle") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_message_category_deleted_at" ON "message_category" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "order_message" ("id" text not null, "body" text not null, "status" text check ("status" in ('open', 'quoted', 'closed')) not null default 'open', "cart_id" text null, "order_id" text null, "customer_id" text null, "email" text null, "staff_note" text null, "quote_amount" integer null, "metadata" jsonb null, "category_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "order_message_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_order_message_category_id" ON "order_message" ("category_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_order_message_deleted_at" ON "order_message" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "order_message" add constraint "order_message_category_id_foreign" foreign key ("category_id") references "message_category" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "order_message" drop constraint if exists "order_message_category_id_foreign";`);

    this.addSql(`drop table if exists "message_category" cascade;`);

    this.addSql(`drop table if exists "order_message" cascade;`);
  }

}
