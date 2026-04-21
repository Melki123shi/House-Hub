import { MigrationInterface, QueryRunner } from 'typeorm';

export class HardenSupabaseIdentityAndHouseRls1776800000000
  implements MigrationInterface
{
  name = 'HardenSupabaseIdentityAndHouseRls1776800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "supabaseUserId" uuid`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_user_supabase_user_id" ON "user" ("supabaseUserId")`,
    );

    await queryRunner.query(`ALTER TABLE "house" ENABLE ROW LEVEL SECURITY`);

    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_select_public" ON "house"`,
    );
    await queryRunner.query(
      `CREATE POLICY "house_select_public" ON "house" FOR SELECT USING (true)`,
    );

    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_insert_owner_admin" ON "house"`,
    );
    await queryRunner.query(
      `CREATE POLICY "house_insert_owner_admin" ON "house" FOR INSERT WITH CHECK (
        auth.role() = 'authenticated'
        AND (
          "ownerId" = auth.uid()
          OR coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
          OR (auth.jwt() -> 'app_metadata' -> 'roles') ? 'admin'
        )
      )`,
    );

    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_update_owner_only" ON "house"`,
    );
    await queryRunner.query(
      `CREATE POLICY "house_update_owner_only" ON "house" FOR UPDATE USING ("ownerId" = auth.uid()) WITH CHECK ("ownerId" = auth.uid())`,
    );

    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_delete_owner_or_admin" ON "house"`,
    );
    await queryRunner.query(
      `CREATE POLICY "house_delete_owner_or_admin" ON "house" FOR DELETE USING (
        "ownerId" = auth.uid()
        OR coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
        OR (auth.jwt() -> 'app_metadata' -> 'roles') ? 'admin'
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_delete_owner_or_admin" ON "house"`,
    );
    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_update_owner_only" ON "house"`,
    );
    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_insert_owner_admin" ON "house"`,
    );
    await queryRunner.query(
      `DROP POLICY IF EXISTS "house_select_public" ON "house"`,
    );
    await queryRunner.query(`ALTER TABLE "house" DISABLE ROW LEVEL SECURITY`);

    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_user_supabase_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN IF EXISTS "supabaseUserId"`,
    );
  }
}
