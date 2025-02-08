import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export class BaseResDto {
  @ApiProperty({
    example: '1',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    example: '1',
  })
  @Expose()
  createdBy: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: string;

  @ApiProperty({
    example: '1',
  })
  @Expose()
  updatedBy: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
  })
  @Expose()
  deletedAt: string;

  @ApiProperty({
    example: '1',
  })
  @Expose()
  deletedBy: string;
}

@Exclude()
export class BasePaginationResDto {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  page: number;

  @ApiProperty({
    example: 10,
  })
  @Expose()
  limit: number;

  @ApiProperty({
    example: 100,
  })
  @Expose()
  totalPage: number;

  @ApiProperty({
    example: 100,
  })
  @Expose()
  totalItem: number;
}

export class BaseConditionResDto<F, O> {
  @ApiProperty({
    type: Object,
  })
  @Expose()
  filter: F;

  @ApiProperty({
    type: Object,
  })
  @Expose()
  order: O;
}

@Exclude()
export class BaseListResDto<T, F, O> {
  @ApiProperty({
    type: Object,
    isArray: true,
  })
  @Expose()
  items: T[];

  @ApiProperty({
    type: Object,
  })
  @Expose()
  @Type(() => BaseConditionResDto)
  conditions: BaseConditionResDto<F, O>;

  @ApiProperty({
    type: BasePaginationResDto,
  })
  @Expose()
  @Type(() => BasePaginationResDto)
  pagination: BasePaginationResDto;
}
