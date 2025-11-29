"use client"

import React, { useState } from "react";
import MyForm from "../components/MyFrom";

import { ConfirmationModal } from "../components/Modal";
import { IOption, MyFormProps } from "../components/MyFrom/types";
import { createAccount } from "@/service/service";

const CreateAccountForm: Omit<MyFormProps, "value" | "onChange" | "onSubmit" | "options"> = {
  buttonText: "Create",
  title: "Create Account",
  fields: [
    {
      name: "name",
      placeholder: "Account Name",
      type: "text",
    },
    {
      name: "account_type",
      type: "select",
      placeholder: "Account Type",
    },
  ],
};


const AccModalBody = ({ name, type }: { name: string, type: string }) => {
  return (
    <React.Fragment>
      <h1>Proceed with creating account?</h1>
      <pre>
        Name: {name}<br />
        Type: {type}
      </pre>
    </React.Fragment>
  );
};

const CreateAccount = () => {
  const [value, setValue] = useState<Record<string, string>>({ account_type: "BANK" });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    setOpenModal(true);
  };

  const createAccountCb = async () => {
    await createAccount(value);
  };

  const options: IOption[] = [
    {
      name: "account_type",
      options: ["BANK", "CASH", "CREDIT", "INVESTMENT", "LOAN", "OTHER"]
    },
  ]

  return (
    <React.Fragment>
      <MyForm
        title={CreateAccountForm.title}
        buttonText={CreateAccountForm.buttonText}
        fields={CreateAccountForm.fields}
        options={options}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        open={openModal}
        body={<AccModalBody name={value["name"]} type={value["account_type"]} />}
        onCancel={() => setOpenModal(false)}
        setOpen={setOpenModal}
        onConfirm={createAccountCb}
      />
    </React.Fragment>
  );
};

export default CreateAccount;
