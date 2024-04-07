import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestsTable1712489190141 implements MigrationInterface {
  name = 'CreateTestsTable1712489190141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "title" character varying, "no" SERIAL NOT NULL, "snippet" text, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9f94f9fed4634591b9ff3f5e4a2" PRIMARY KEY ("id", "no"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tests"`);
  }
}
