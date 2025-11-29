
"use client"

import React, { useState } from "react";
import MyForm from "../components/MyFrom";

import { ConfirmationModal } from "../components/Modal";
import { IOption, MyFormProps } from "../components/MyFrom/types";
import { createCategory } from "@/service/service";

const CreateCategoryForm: Omit<MyFormProps, "value" | "onChange" | "onSubmit" | "options"> = {
  buttonText: "Create",
  title: "Create Category",
  fields: [
    {
      name: "name",
      placeholder: "Category",
      type: "text",
    },
    {
      name: "category_type",
      type: "select",
      placeholder: "Account Type",
    },
  ],
};

const CategoryModalBody = ({ name, type } : { name: string, type: string }) => {
  return (
    <React.Fragment>
      <h1>Proceed with creating category?</h1>
      <pre>
        Name: {name}<br />
        Type: {type}
      </pre>
    </React.Fragment>
  );
};

const CreateCategory = () => {
  const [value, setValue] = useState<Record<string, string>> ({category_type: "EXPENSE"});
  const [openModal, setOpenModal] = useState<boolean> (false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({...value, [event.target.name]: event.target.value});
  };

  const onSubmit = () => {
    setOpenModal(true);
  };

  const createCategoryCb = async () => {
    await createCategory(value);
  };

  const options: IOption[] = [
    {
      name: "category_type",
      options: ["INCOME", "EXPENSE", "OTHER"]
    }
  ]

  return (
    <React.Fragment>
      <MyForm
        title={CreateCategoryForm.title}
        buttonText={CreateCategoryForm.buttonText}
        fields={CreateCategoryForm.fields}
        options={options}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        open={openModal}
        body={<CategoryModalBody name={value["name"]} type={value["category_type"]} />}
        onCancel={() => setOpenModal(false)}
        setOpen={setOpenModal}
        onConfirm={createCategoryCb}
      />
    </React.Fragment>
  );
};

export default CreateCategory;
