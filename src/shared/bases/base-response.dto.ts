import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseResponseDto {
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

export class BaseSuccessResponseDto<T> {
  constructor(success: boolean, data: T) {
    this.success = success;
    this.data = data;
  }

  @ApiProperty({ example: true })
  @Expose()
  success: boolean;

  @Expose()
  data: T;

  static build<T>(data: T): BaseSuccessResponseDto<T> {
    return new BaseSuccessResponseDto<T>(true, data);
  }
}

export class BaseErrorResponseDto {
  constructor(
    success: boolean,
    error?: string,
    message?: string[],
    statusCode?: number,
  ) {
    this.success = success;
    this.error = error ?? null;
    this.message = message ?? null;
    this.statusCode = statusCode ?? 400;
  }

  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: ['id must be a number'] })
  message: string[];

  @ApiProperty({ example: 400 })
  statusCode: number;

  static build(
    error: string,
    message: string[],
    statusCode: number,
  ): BaseErrorResponseDto {
    return new BaseErrorResponseDto(false, error, message, statusCode);
  }
}
