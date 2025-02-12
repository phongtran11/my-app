import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import {
  PaginationResDto,
  BaseResDto,
  BasePaginationReqDto,
} from 'src/shared/bases/base.dto';
import { ORDER_DIRECTION } from 'src/shared/constants/query.constant';
import { OrderDirectionEnum } from 'src/shared/types/query.type';

export class GetUserListFilterDto {
  @ApiPropertyOptional({ example: 'john' })
  @IsOptional()
  email?: string;
}

export class GetUserListOrderDto {
  @ApiPropertyOptional({ example: ORDER_DIRECTION.ASC })
  @IsEnum(ORDER_DIRECTION)
  @IsOptional()
  createdAt?: OrderDirectionEnum;
}

export class GetUserListQueryDto extends BasePaginationReqDto {
  @ApiPropertyOptional({ type: GetUserListFilterDto })
  @IsOptional()
  @Type(() => GetUserListFilterDto)
  @ValidateNested()
  filters?: GetUserListFilterDto;

  @ApiPropertyOptional({ type: GetUserListOrderDto })
  @IsOptional()
  @Type(() => GetUserListOrderDto)
  @ValidateNested()
  orders?: GetUserListOrderDto;
}

@Exclude()
export class UserListItem extends BaseResDto {
  @ApiProperty({ example: 'john' })
  @Expose()
  email: string;
}

@Exclude()
export class GetUserListResDto extends PaginationResDto {
  @ApiProperty({ type: GetUserListFilterDto })
  @Expose()
  filters?: GetUserListFilterDto;

  @ApiProperty({ type: GetUserListOrderDto })
  @Expose()
  orders?: GetUserListOrderDto;

  @ApiProperty({ type: UserListItem, isArray: true })
  @Expose()
  @Type(() => UserListItem)
  items: UserListItem[];
}
