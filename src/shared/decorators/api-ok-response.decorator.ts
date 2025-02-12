import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const ApiOkResponse = (data: T) => {
  return applyDecorators((target, key, descriptor) => {});
};
