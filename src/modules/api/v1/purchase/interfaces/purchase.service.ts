export interface CreatePurchase {
  user_id: string;
  package_id: string;
  expired_time: any;
  remark?: string;
}

export interface UpdatePurchase {
  user_id?: string;
  package_id?: string;
  expired_time?: any;
  remark?: string;
}

export interface BuyPackage {
  user_id: string;
  package_id: string;
}
