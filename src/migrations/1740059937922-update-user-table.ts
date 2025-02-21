import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1740059937922 implements MigrationInterface {
  name = 'UpdateUserTable1740059937922';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE \`users\` ADD \`role_id\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role_id\``);
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
}
