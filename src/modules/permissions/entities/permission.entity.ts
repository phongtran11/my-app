import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/bases/base.entity';
import { DB_TABLES } from 'src/shared/constants/db-tables.constant';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity(DB_TABLES.PERMISSIONS)
export class Permission extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    name: 'resource_name',
  })
  resourceName: string;

  @Column({
    type: 'boolean',
  })
  create: boolean;

  @Column({
    type: 'boolean',
  })
  read: boolean;

  @Column({
    type: 'boolean',
  })
  update: boolean;

  @Column({
    type: 'boolean',
  })
  delete: boolean;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;
}
