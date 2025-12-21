import { api } from "../../lib/api";
import { IAccount, ICategory, ITransaction } from "../../lib/types";

export const fetchAccounts = async () : Promise<IAccount[]> => {
  const data = await api.get('/accounts/');
  return data as IAccount[];
};

export const fetchAccount = async (id: string) : Promise<IAccount> => {
  const data = await api.get(`/accounts/${id}/`);
  return data as IAccount;
};

export const createAccount = async (value: Partial<IAccount>) : Promise<IAccount | null> => {
  try {
    const data = await api.post(`/accounts/`, value);
    return data as IAccount;
  } catch(error) {
    console.log(error);
  }
  return null;
};

export const deleteAccount = async (id: string) : Promise<void> => {
  try {
    await api.delete(`/accounts/${id}/`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = async () : Promise<ICategory[]> => {
  const data = await api.get('/categories/');
  return data as ICategory[];
};

export const fetchCategory = async (id: string) : Promise<ICategory> => {
  const data = await api.get(`/categories/${id}/`);
  return data as ICategory;
};


export const deleteCategory = async (id: string) : Promise<void> => {
  try {
    await api.delete(`/categories/${id}/`);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (value: Partial<ICategory>) : Promise<ICategory | null> => {
  try {
    const data = await api.post(`/categories/`, value);
    return data as ICategory;
  } catch(error) {
    console.log(error);
  }
  return null;
};

export const fetchTransactions = async (
  from: string | null | undefined = null,
  to: string | null | undefined = null
): Promise<ITransaction[]> => {
  let url = "/transactions/";
  const params = [];
  if (from) params.push(`from=${from}`);
  if (to) params.push(`to=${to}`);
  if (params.length) url += "?" + params.join("&");
  return (await api.get(url)) as ITransaction[];
};

export const fetchTransaction = async (id: string) : Promise<ITransaction> => {
  const data = await api.get(`/transactions/${id}/`);
  return data as ITransaction;
};

export const createTransaction = async (value: Partial<ITransaction>) : Promise<ITransaction | null> => {
  try {
    const data = await api.post(`/transactions/`, value);
    return data as ITransaction;
  } catch(error) {
    console.log(error);
  }
  return null;
};

export const deleteTransaction = async (id: string) : Promise<void> => {
  try {
    await api.delete(`/transactions/${id}/`);
  } catch (error) {
    console.log(error);
  }
};
