import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePermissionTable1739627773279 implements MigrationInterface {
  name = 'CreatePermissionTable1739627773279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`permissions\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`deleted_at\` timestamp(6) NULL, \`deleted_by\` bigint NULL, \`resource_name\` varchar(255) NOT NULL, \`create\` tinyint NOT NULL, \`read\` tinyint NOT NULL, \`update\` tinyint NOT NULL, \`delete\` tinyint NOT NULL, UNIQUE INDEX \`IDX_c19b212110b6337e56a222bd97\` (\`resource_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`roles_permissions_permissions\` (\`role_id\` bigint NOT NULL, \`permission_id\` bigint NOT NULL, INDEX \`IDX_5a00ec97b502af1504d8ca0caf\` (\`role_id\`), INDEX \`IDX_d59b3105d248d8927feee0b4d7\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_5a00ec97b502af1504d8ca0cafe\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_d59b3105d248d8927feee0b4d73\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_d59b3105d248d8927feee0b4d73\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_5a00ec97b502af1504d8ca0cafe\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d59b3105d248d8927feee0b4d7\` ON \`roles_permissions_permissions\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5a00ec97b502af1504d8ca0caf\` ON \`roles_permissions_permissions\``,
    );
    await queryRunner.query(`DROP TABLE \`roles_permissions_permissions\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_c19b212110b6337e56a222bd97\` ON \`permissions\``,
    );
    await queryRunner.query(`DROP TABLE \`permissions\``);
  }
}
