
"use client"

import React, { useMemo, useState } from "react";
import MyForm from "../components/MyFrom";

import { ConfirmationModal } from "../components/Modal";
import { ICondition, IOption, MyFormProps } from "../components/MyFrom/types";
import { useDataLoader } from "@/hooks/useDataLoader";
import { IAccount, ICategory } from "../../../lib/types";
import { createTransaction, fetchAccounts, fetchCategories } from "@/service/service";

const CreateAccountForm: Omit<MyFormProps, "value" | "onChange" | "onSubmit" | "options"> = {
  buttonText: "Create",
  title: "Create Transaction",
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
      <h1>Proceed with creating transaction?</h1>
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

const CreateTransaction = () => {
  const [value, setValue] = useState<Record<string, string>>({ transaction_type: "EXPENSE" });
  const { data : accounts } = useDataLoader<IAccount[]>(fetchAccounts, []);
  const { data : categories } = useDataLoader<ICategory[]>(fetchCategories, []);
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
    return categories.map((category) => category.name);
  }, [categories]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    setOpenModal(true);
  };

  const createTransactionsCb = async () => {
    await createTransaction(value);
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
        onConfirm={createTransactionsCb}
      />
    </React.Fragment>
  );
};

export default CreateTransaction;
