import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ToNumber } from '../decorators/to-number.decorator';

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

export class BasePaginationReqDto {
  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @ToNumber()
  @IsNumber()
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
  })
  @IsOptional()
  @ToNumber()
  @IsNumber()
  limit: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get take(): number {
    return this.limit;
  }
}

@Exclude()
export class BasePaginationResDto {
  constructor(
    currentPage: number,
    currentItems: number,
    limit: number,
    totalItems: number,
  ) {
    this.currentPage = currentPage;
    this.currentItems = currentItems;
    this.limit = limit;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / limit);
  }

  @ApiProperty({
    example: 1,
  })
  @Expose()
  currentPage: number;

  @ApiProperty({
    example: 10,
  })
  @Expose()
  currentItems: number;

  @ApiProperty({
    example: 10,
  })
  @Expose()
  limit: number;

  @ApiProperty({
    example: 100,
  })
  @Expose()
  totalItems: number;

  @ApiProperty({
    example: 100,
  })
  @Expose()
  totalPages: number;
}

@Exclude()
export class PaginationResDto {
  @ApiProperty({
    type: BasePaginationResDto,
  })
  @Expose()
  @Type(() => BasePaginationResDto)
  pagination: BasePaginationResDto;
}

@Exclude()
export class BaseResponseDto<T> {
  constructor(Data: Type<T>) {}

  @ApiProperty({
    example: true,
  })
  @Expose()
  success: boolean;

  @ApiProperty({
    type: () => Data,
  })
  @Expose()
  @Type(() => Data)
  data: T;
}
