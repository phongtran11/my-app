import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

export function ApiListQuery(filterDto: Type, orderDto: Type) {
  return applyDecorators(
    ApiExtraModels(filterDto, orderDto),
    ApiQuery({
      name: 'filters',
      required: false,
      type: 'object',
      style: 'deepObject',
      schema: { $ref: getSchemaPath(filterDto) },
    }),
    ApiQuery({
      name: 'orders',
      required: false,
      type: 'object',
      style: 'deepObject',
      schema: { $ref: getSchemaPath(orderDto) },
    }),
  );
}
