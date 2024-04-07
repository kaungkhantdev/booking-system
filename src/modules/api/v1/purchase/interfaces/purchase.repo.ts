import { Packages, Users } from '@database/entities';

export interface CreatePurchase {
  user: Users;
  package: Packages;
  expired_time: string;
  remark?: string;
}

export interface UpdatePurchase {
  user?: Users;
  package?: Packages;
  expired_time?: number;
  remark?: string;
}
