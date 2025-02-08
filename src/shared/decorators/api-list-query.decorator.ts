import { applyDecorators, Type } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiListQuery(filterDto: Type, orderDto: Type) {
  return applyDecorators(
    ApiQuery({
      name: 'filter',
      required: false,
      type: filterDto,
    }),
    ApiQuery({
      name: 'order',
      required: false,
      type: orderDto,
    }),
    ApiQuery({
      name: 'page',
      required: false,
      example: 1,
      type: Number,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      example: 10,
      type: Number,
    }),
  );
}
