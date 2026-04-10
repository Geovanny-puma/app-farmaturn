import { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLE_TABLE_NAME } from '../../app/roles/entities/role.entity';

export class CreateRolesTable1775789027354 implements MigrationInterface {
  name = 'CreateRolesTable1775789027354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "${ROLE_TABLE_NAME}" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(80) NOT NULL,
        "description" character varying(255),
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "UQ_roles_name" UNIQUE ("name"),
        CONSTRAINT "PK_roles_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_is_active" ON "${ROLE_TABLE_NAME}" ("is_active")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_created_at" ON "${ROLE_TABLE_NAME}" ("created_at")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_name_trgm" ON "${ROLE_TABLE_NAME}" USING gin ("name" gin_trgm_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_description_trgm" ON "${ROLE_TABLE_NAME}" USING gin ("description" gin_trgm_ops)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX IF EXISTS "IDX_roles_description_trgm"',
    );
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_roles_name_trgm"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_roles_created_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_roles_is_active"');
    await queryRunner.query(`DROP TABLE "${ROLE_TABLE_NAME}"`);
  }
}
