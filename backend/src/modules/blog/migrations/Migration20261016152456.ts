import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261016152456 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "blog_post" add column if not exists "design_config" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "blog_post" drop column if exists "design_config";`);
  }

}
