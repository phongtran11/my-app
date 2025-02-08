import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import {
  BaseConditionResDto,
  BaseListResDto,
  BasePaginationResDto,
  BaseResDto,
} from 'src/shared/bases/base.dto';
import {
  ORDER_DIRECTION,
  OrderDirectionEnum,
} from 'src/shared/types/query.type';

export class GetUsersFilterDto {
  @ApiPropertyOptional({ example: 'johndoe@gmail.com' })
  @IsOptional()
  email?: string;
}

export class GetUsersOrderDto {
  @ApiPropertyOptional({ example: ORDER_DIRECTION.ASC })
  @IsEnum(ORDER_DIRECTION)
  @IsOptional()
  created_at?: OrderDirectionEnum;
}

export class GetUsersQueryDto {
  @ApiPropertyOptional({ type: GetUsersFilterDto })
  filter?: GetUsersFilterDto;

  @ApiPropertyOptional({ type: GetUsersOrderDto })
  order?: GetUsersOrderDto;
}

@Exclude()
export class UserItem extends BaseResDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @Expose()
  email: string;
}

export class GetUsersResDto extends BaseListResDto<
  UserItem,
  GetUsersFilterDto,
  GetUsersOrderDto
> {
  items: UserItem[];

  conditions: BaseConditionResDto<GetUsersFilterDto, GetUsersOrderDto>;
}
