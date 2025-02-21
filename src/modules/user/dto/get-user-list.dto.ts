import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { BaseListResponseDto } from 'src/shared/bases/base-list.dto';
import {
  BasePaginationRequestDto,
  BasePaginationResponseDto,
} from 'src/shared/bases/base-pagination.dto';
import {
  BaseResponseDto,
  BaseSuccessResponseDto,
} from 'src/shared/bases/base-response.dto';
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

export class GetUserListQueryDto extends BasePaginationRequestDto {
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
export class UserListItemDto extends BaseResponseDto {
  @ApiProperty({ example: 'john' })
  @Expose()
  email: string;
}

export class UserListDto
  implements
    BaseListResponseDto<
      GetUserListFilterDto,
      GetUserListOrderDto,
      UserListItemDto[]
    >
{
  @ApiProperty({ type: GetUserListFilterDto })
  @Type(() => GetUserListFilterDto)
  filters: GetUserListFilterDto;

  @ApiProperty({ type: GetUserListOrderDto })
  @Type(() => GetUserListOrderDto)
  orders: GetUserListOrderDto;

  @ApiProperty({ type: BasePaginationResponseDto })
  @Type(() => BasePaginationResponseDto)
  pagination: BasePaginationResponseDto;

  @ApiProperty({
    type: UserListItemDto,
    isArray: true,
  })
  @Type(() => UserListItemDto)
  items: UserListItemDto[];
}

export class GetUserListDto extends BaseSuccessResponseDto<UserListDto> {
  @ApiProperty({ type: UserListDto })
  data: UserListDto;
}
