"use client";

import React, { useState } from "react";
import MyForm from "../components/MyFrom";
import { ConfirmationModal } from "../components/Modal";
import { ICondition, IOption, MyFormProps } from "../components/MyFrom/types";
import { IAccount } from "../../../lib/types";
import { updateAccount } from "@/service/service";
import { usePathname, useRouter } from "next/navigation";
import { getPostUpdateUri } from "../../../lib/utils";

const AccountFormCfg: Omit<MyFormProps, "value" | "onChange" | "onSubmit" | "options"> = {
  buttonText: "Update",
  title: "Modify Account",
  fields: [
    { name: "name", placeholder: "Account name", type: "text" },
    { name: "account_type", placeholder: "Account type", type: "select" },
    { name: "real_balance", placeholder: "Real Balance", type: "number" },
    { name: "currency", placeholder: "Currency", type: "text" },
    { name: "description", placeholder: "Description", type: "text" },
  ],
};

const AccountModalBody: React.FC<{ value: Record<string, string> }> = ({ value }) => (
  <>
    <h1>Proceed with modifying account?</h1>
    <pre>
      Name: {value.name}
      <br />
      Type: {value.account_type}
      <br />
      Real Balance: {value.real_balance}
      <br />
      Currency: {value.currency}
      <br />
      Description: {value.description}
      <br />
    </pre>
  </>
);

const UpdateAccount: React.FC<{ old: IAccount }> = ({ old }) => {
  const initialValue: Record<string, string> = {
    name: old?.name ?? "",
    account_type: old?.account_type ?? "BANK",
    real_balance: old?.real_balance != null ? String(old.real_balance) : "0",
    currency: old?.currency ?? "USD",
    description: old?.description ?? "",
  };

  const [value, setValue] = useState<Record<string, string>>(initialValue);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = () => setOpenModal(true);

  const submitCb = async () => {
    try {
      await updateAccount(old.id, value);
      router.replace(getPostUpdateUri(pathname));
    } catch (error) {
      console.log(error);
    }

  };

  const options: IOption[] = [
    {
      name: "account_type",
      options: ["BANK", "CASH", "CREDIT", "INVESTMENT", "LOAN", "OTHER"],
    },
  ];

  const conditions: ICondition[] = [];

  return (
    <>
      <MyForm
        title={AccountFormCfg.title}
        buttonText={AccountFormCfg.buttonText}
        fields={AccountFormCfg.fields}
        options={options}
        value={value}
        conditions={conditions}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        open={openModal}
        body={<AccountModalBody value={value} />}
        onCancel={() => setOpenModal(false)}
        setOpen={setOpenModal}
        onConfirm={submitCb}
      />
    </>
  );
};

export default UpdateAccount;
