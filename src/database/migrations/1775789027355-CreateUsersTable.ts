import { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLE_TABLE_NAME } from '../../app/roles/entities/role.entity';
import { USER_TABLE_NAME } from '../../app/users/entities/user.entity';

export class CreateUsersTable1775789027355 implements MigrationInterface {
  name = 'CreateUsersTable1775789027355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "${USER_TABLE_NAME}" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "first_name" character varying(100) NOT NULL,
        "last_name" character varying(100) NOT NULL,
        "email" character varying(150) NOT NULL,
        "alias" character varying(80),
        "phone" character varying(30),
        "role_id" uuid NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        "last_login_at" TIMESTAMP WITH TIME ZONE,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_users_role_id" ON "${USER_TABLE_NAME}" ("role_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_is_active" ON "${USER_TABLE_NAME}" ("is_active")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_created_at" ON "${USER_TABLE_NAME}" ("created_at")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_last_login_at" ON "${USER_TABLE_NAME}" ("last_login_at")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_first_name_trgm" ON "${USER_TABLE_NAME}" USING gin ("first_name" gin_trgm_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_last_name_trgm" ON "${USER_TABLE_NAME}" USING gin ("last_name" gin_trgm_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_email_trgm" ON "${USER_TABLE_NAME}" USING gin ("email" gin_trgm_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_alias_trgm" ON "${USER_TABLE_NAME}" USING gin ("alias" gin_trgm_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_phone_trgm" ON "${USER_TABLE_NAME}" USING gin ("phone" gin_trgm_ops)`,
    );
    await queryRunner.query(`
      ALTER TABLE "${USER_TABLE_NAME}"
      ADD CONSTRAINT "FK_users_role_id_roles_id"
      FOREIGN KEY ("role_id") REFERENCES "${ROLE_TABLE_NAME}"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${USER_TABLE_NAME}" DROP CONSTRAINT "FK_users_role_id_roles_id"`,
    );
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_phone_trgm"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_alias_trgm"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_email_trgm"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_last_name_trgm"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_first_name_trgm"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_last_login_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_created_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_is_active"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_users_role_id"');
    await queryRunner.query(`DROP TABLE "${USER_TABLE_NAME}"`);
  }
}
