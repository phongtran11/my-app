import { ORDER_DIRECTION } from '../constants/query.constant';

export type OrderDirection = typeof ORDER_DIRECTION;
export type OrderDirectionEnum = OrderDirection[keyof OrderDirection];
