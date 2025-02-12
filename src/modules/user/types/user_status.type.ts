import { USER_STATUSES } from '../constants/user_status.constant';

export type UserStatuses = typeof USER_STATUSES;
export type UserStatusesEnum = UserStatuses[keyof UserStatuses];
