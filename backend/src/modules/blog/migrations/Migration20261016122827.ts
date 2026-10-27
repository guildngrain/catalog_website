import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261016122827 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "blog_post" add column if not exists "subtitle" text null, add column if not exists "cover_alt" text null, add column if not exists "layout" text check ("layout" in ('default', 'editorial', 'minimal', 'magazine')) not null default 'default', add column if not exists "style_preset" text check ("style_preset" in ('classic', 'dark', 'warm', 'contrast')) not null default 'classic', add column if not exists "custom_css" text null, add column if not exists "is_featured" boolean not null default false, add column if not exists "tags" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "blog_post" drop column if exists "subtitle", drop column if exists "cover_alt", drop column if exists "layout", drop column if exists "style_preset", drop column if exists "custom_css", drop column if exists "is_featured", drop column if exists "tags";`);
  }

}
