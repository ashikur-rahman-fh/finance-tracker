export interface IAccount {
  id: string;
  name: string;
  account_type: string;
  balance: string;
  real_balance: string;
  currency: string;
  description?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  category_type: string;
  description?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ITransaction {
  id: string;
  account: IAccount;
  transaction_type: string;
  amount: string;
  currency: string;
  note?: string;
  description?: string;
  date: string;
  to_account?: IAccount;
  category: ICategory;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}
