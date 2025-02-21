import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedByToPermissionTable1740065000286
  implements MigrationInterface
{
  name = 'AddCreatedByToPermissionTable1740065000286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_c398f7100db3e0d9b6a6cd6beaf\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_c398f7100db3e0d9b6a6cd6beaf\``,
    );
  }
}
