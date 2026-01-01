
"use client"

import React, { useMemo, useState } from "react";
import MyForm from "../components/MyFrom";

import { ConfirmationModal } from "../components/Modal";
import { ICondition, IOption, MyFormProps } from "../components/MyFrom/types";
import { useDataLoader } from "@/hooks/useDataLoader";
import { IAccount, ICategory, ITransaction } from "../../../lib/types";
import { fetchAccounts, fetchCategories, updateTransaction } from "@/service/service";
import { usePathname, useRouter } from "next/navigation";
import { getPostUpdateUri } from "../../../lib/utils";

const CreateAccountForm: Omit<MyFormProps, "value" | "onChange" | "onSubmit" | "options"> = {
  buttonText: "Update",
  title: "Modify Transaction",
  fields: [
    {
      name: "amount",
      placeholder: "Amount",
      type: "number",
    },
    {
      name: "date",
      placeholder: "Date",
      type: "date",
    },
    {
      name: "transaction_type",
      type: "select",
      placeholder: "Transaction Type",
    },
    {
      name: "account",
      placeholder: "From Account",
      type: "select",
    },
    {
      name: "to_account",
      placeholder: "To Account",
      type: "select",
    },
    {
      name: "category",
      placeholder: "Category",
      type: "select",
    },
    {
      name: "note",
      placeholder: "Note",
      type: "text",
    },
    {
      name: "description",
      placeholder: "Description",
      type: "text",
    },
  ],
};

const TransactionModalBody: React.FC<{ value: Record<string, string> }> = ({ value }) => {
  const {
    amount,
    date,
    transaction_type: transactionType,
    account: fromAccount,
    to_account: toAccount,
    category,
    note,
    description,
  } = value;
  return (
    <React.Fragment>
      <h1>Proceed with modifying transaction?</h1>
      <pre>
        Amount: {amount}<br />
        Date: {date}<br />
        Type: {transactionType}<br />
        From Account: {fromAccount}<br />
        {transactionType === "TRANSFER" ? `To Account:  ${toAccount}` : `Category: ${category}`}<br />
        Note: {note}<br />
        Description: {description}<br />
      </pre>
    </React.Fragment>
  );
};

const UpdateTransaction: React.FC<{ old : ITransaction }> = ({ old }) => {
  const formatDate = (d: string | Date | number | null | undefined): string => {
    if (!d) return "";
    const dt = typeof d === "string" && d.includes("T") ? new Date(d) : new Date(d);
    return isNaN(dt.getTime()) ? String(d) : dt.toISOString().slice(0, 10);
  };

  const isAccountObject = (obj: unknown): obj is IAccount => {
    return typeof obj === "object" && obj !== null && "name" in obj;
  }

  const isCategoryObject = (obj: unknown): obj is ICategory => {
    return typeof obj === "object" && obj !== null && "name" in obj;
  }

  const acc = old?.account;
  const toAcc = old?.to_account;
  const cat = old?.category;

  const initialValue: Record<string, string> = {
    amount: old?.amount != null ? String(old.amount) : "",
    date: formatDate(old?.date),
    transaction_type: old?.transaction_type ?? "",
    account: typeof acc === "string" ? acc : (isAccountObject(acc) ? acc.name : ""),
    to_account: typeof toAcc === "string" ? toAcc : (isAccountObject(toAcc) ? toAcc.name : ""),
    category: typeof cat === "string" ? cat : (isCategoryObject(cat) ? cat.name : ""),
    note: old?.note ?? "",
    description: old?.description ?? "",
  };

  const [value, setValue] = useState<Record<string, string>>(initialValue);
  const { data : accounts } = useDataLoader<IAccount[]>(fetchAccounts, []);
  const { data : categories } = useDataLoader<ICategory[]>(fetchCategories, []);

  const pathname = usePathname();
  const router = useRouter();
  const accountOpt = useMemo(() => {
    if (!accounts) {
      return [];
    }
    return accounts.map((account) => account.name);
  }, [accounts]);
  const categoryOpt = useMemo(() => {
    if (!categories) {
      return [];
    }
    const matchedCategories = categories.filter(cat => cat.category_type === value['transaction_type']);
    return matchedCategories.map((category) => category.name);
  }, [categories, value]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    setOpenModal(true);
  };

  const updateTransactionsCb = async () => {
    try {
      await updateTransaction(old.id, value);
      router.replace(getPostUpdateUri(pathname));
    } catch (error) {
      console.log(error);
    }
  };

  const options: IOption[] = [
    {
      name: "transaction_type",
      options: ["INCOME", "EXPENSE", "TRANSFER"]
    },
    {
      name: "account",
      options: ["Select Account From", ...accountOpt],
    },
    {
      name: "to_account",
      options: ["Select Account To", ...accountOpt],
    },
    {
      name: "category",
      options: ["Select Category", ...categoryOpt],
    },
  ];

  const conditions: ICondition[] = [
    {
      name: "to_account",
      show: value["transaction_type"] === "TRANSFER",
    },
    {
      name: "category",
      show: value["transaction_type"] !== "TRANSFER",
    },
  ];

  return (
    <React.Fragment>
      <MyForm
        title={CreateAccountForm.title}
        buttonText={CreateAccountForm.buttonText}
        fields={CreateAccountForm.fields}
        options={options}
        value={value}
        conditions={conditions}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        open={openModal}
        body={<TransactionModalBody value={value} />}
        onCancel={() => setOpenModal(false)}
        setOpen={setOpenModal}
        onConfirm={updateTransactionsCb}
      />
    </React.Fragment>
  );
};

export default UpdateTransaction;
