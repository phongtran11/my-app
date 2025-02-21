import { BasePaginationResponseDto } from './base-pagination.dto';

export class BaseListResponseDto<F, O, I> {
  filters: F;
  orders: O;
  pagination: BasePaginationResponseDto;
  items: I;
}
