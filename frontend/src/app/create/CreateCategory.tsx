
"use client"

import React, { useState } from "react";
import { ConfirmationModal } from "../components/Modal";
import { api } from "../../../lib/api";
import { IOption, MyFormProps } from "../components/MyFrom/types";
import MyForm from "../components/MyFrom";

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

  const createCategory = async () => {
    try {
      await api.post('/categories/', value);
    } catch (error) {
      console.log("Failed to create category", error);
    }
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
        onConfirm={createCategory}
      />
    </React.Fragment>
  );
};

export default CreateCategory;
