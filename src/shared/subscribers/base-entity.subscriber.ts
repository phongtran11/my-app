import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  SoftRemoveEvent,
  DataSource,
} from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { ClsService } from 'nestjs-cls';
import { JWT_USER } from '../constants/cls.constant';
import { JwtUser } from '../types/cls.type';
import { InjectDataSource } from '@nestjs/typeorm';

@EventSubscriber()
export class BaseEntitySubscriber
  implements EntitySubscriberInterface<BaseEntity>
{
  constructor(
    @InjectDataSource() dataSource: DataSource,
    private readonly clsService: ClsService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return BaseEntity;
  }

  /**
   * Called before insert.
   */
  beforeInsert(event: InsertEvent<BaseEntity>) {
    const userId = this.clsService.get<JwtUser>(JWT_USER)?.userId;
    if (userId) {
      event.entity.createdBy = userId;
    }
  }

  /**
   * Called before update.
   */
  beforeUpdate(event: UpdateEvent<BaseEntity>): Promise<any> | void {
    const userId = this.clsService.get<JwtUser>(JWT_USER)?.userId;
    if (userId) {
      event.entity.updatedBy = userId;
    }
  }

  /**
   * Called before remove.
   */
  beforeSoftRemove(event: SoftRemoveEvent<BaseEntity>): Promise<any> | void {
    const userId = this.clsService.get<JwtUser>(JWT_USER)?.userId;
    if (userId) {
      event.entity.deletedBy = userId;
    }
  }
}
