import { BaseEntity } from 'src/shared/bases/base.entity';
import { DB_TABLES } from 'src/shared/constants/db-tables.constant';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { USER_STATUSES } from '../constants/user_status.constant';
import { UserStatusesEnum } from '../types/user_status.type';
import { Role } from 'src/modules/roles/entities/role.entity';

@Entity({
  name: DB_TABLES.USERS,
  orderBy: {
    created_at: 'DESC',
  },
})
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
    nullable: true,
  })
  password: string;

  @Column({
    type: 'tinyint',
    default: USER_STATUSES.VERIFYING_EMAIL,
  })
  status: UserStatusesEnum;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'full_name',
  })
  fullName: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
