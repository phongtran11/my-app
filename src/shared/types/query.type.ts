export const ORDER_DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type OrderDirection = typeof ORDER_DIRECTION;

export type OrderDirectionEnum = OrderDirection[keyof OrderDirection];
