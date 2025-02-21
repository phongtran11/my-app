import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoleTable1739626780313 implements MigrationInterface {
  name = 'CreateRoleTable1739626780313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`deleted_at\` timestamp(6) NULL, \`deleted_by\` bigint NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_roles_roles\` (\`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, INDEX \`IDX_32e5adf0a2e33e130de343c6ee\` (\`user_id\`), INDEX \`IDX_38703d4da3789a6ad8552ba783\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_32e5adf0a2e33e130de343c6ee8\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_38703d4da3789a6ad8552ba783e\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_38703d4da3789a6ad8552ba783e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_32e5adf0a2e33e130de343c6ee8\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_38703d4da3789a6ad8552ba783\` ON \`users_roles_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_32e5adf0a2e33e130de343c6ee\` ON \`users_roles_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`users_roles_roles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
