import { BaseEntity } from 'src/shared/bases/base.entity';
import { DB_TABLES } from 'src/shared/constants/db-tables.constant';
import { Column, Entity } from 'typeorm';

@Entity({ name: DB_TABLES.USERS })
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;
}
