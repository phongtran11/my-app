import { IsNumber, IsOptional } from 'class-validator';
import { ToNumber } from '../decorators/to-number.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class BasePaginationRequestDto {
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
}

@Exclude()
export class BasePaginationResponseDto {
  constructor(
    page: number,
    limit: number,
    currentItems: number,
    totalItems: number,
  ) {
    this.page = page;
    this.currentItems = currentItems;
    this.limit = limit;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / limit);
  }

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
    example: 10,
  })
  @Expose()
  currentItems: number;

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
