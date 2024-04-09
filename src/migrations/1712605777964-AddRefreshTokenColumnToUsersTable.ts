import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenColumnToUsersTable1712605777964
  implements MigrationInterface
{
  name = 'AddRefreshTokenColumnToUsersTable1712605777964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }
}
