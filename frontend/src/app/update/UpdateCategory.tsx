"use client";

import React, { useState } from "react";
import MyForm from "../components/MyFrom";
import { ConfirmationModal } from "../components/Modal";
import { ICondition, IOption, MyFormProps } from "../components/MyFrom/types";
import { ICategory } from "../../../lib/types";
import { updateCategory } from "@/service/service";
import { getPostUpdateUri } from "../../../lib/utils";
import { usePathname, useRouter } from "next/navigation";

const CategoryFormCfg: Omit<MyFormProps, "value" | "onChange" | "onSubmit" | "options"> = {
  buttonText: "Update",
  title: "Modify Category",
  fields: [
    { name: "name", placeholder: "Category name", type: "text" },
    { name: "category_type", placeholder: "Category type", type: "select" },
    { name: "description", placeholder: "Description", type: "text" },
  ],
};

const CategoryModalBody: React.FC<{ value: Record<string, string> }> = ({ value }) => (
  <>
    <h1>Proceed with modifying category?</h1>
    <pre>
      Name: {value.name}
      <br />
      Type: {value.category_type}
      <br />
      Description: {value.description}
      <br />
    </pre>
  </>
);

const UpdateCategory: React.FC<{ old: ICategory }> = ({ old }) => {
  const initialValue: Record<string, string> = {
    name: old?.name ?? "",
    category_type: old?.category_type ?? "EXPENSE",
    description: old?.description ?? "",
  };

  const [value, setValue] = useState<Record<string, string>>(initialValue);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const onSubmit = () => setOpenModal(true);

  const pathname = usePathname();
  const router = useRouter();

  const submitCb = async () => {
    try {
      await updateCategory(old.id, value);
      router.replace(getPostUpdateUri(pathname));
    } catch(error) {
      console.log(error);
    }
  };

  const options: IOption[] = [
    {
      name: "category_type",
      options: ["INCOME", "EXPENSE"],
    },
  ];

  const conditions: ICondition[] = [];

  return (
    <>
      <MyForm
        title={CategoryFormCfg.title}
        buttonText={CategoryFormCfg.buttonText}
        fields={CategoryFormCfg.fields}
        options={options}
        value={value}
        conditions={conditions}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        open={openModal}
        body={<CategoryModalBody value={value} />}
        onCancel={() => setOpenModal(false)}
        setOpen={setOpenModal}
        onConfirm={submitCb}
      />
    </>
  );
};

export default UpdateCategory;
