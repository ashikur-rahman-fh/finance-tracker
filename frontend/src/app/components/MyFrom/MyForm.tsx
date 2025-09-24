import React from "react";

import { MyInput } from "./MyInput";

import { FormFieldProps, MyFormProps } from "./types";
import { MySelect } from "./MySelect";

const FormField: React.FC<FormFieldProps> = ({ field, value, options, onChange }) => {
  const { name, type, placeholder } = field;
  const option = options.filter((opt) => opt.name === name);
  if (typeof field === "object" && Object.hasOwn(field, "type") && field["type"] === "select") {
    return (
      <MySelect
        name={name}
        options={option[0].options}
        value={value[name] ? value[name] : ""}
        onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} />
    );
  } else {
    return (
      <MyInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={value[name] ? value[name] : ""}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} />
    );
  }
};

export const MyForm: React.FC<MyFormProps> = (
  { fields, title, options, conditions = [],  buttonText, value, onChange, onSubmit },
) => {
  return (
    <React.Fragment>
      <div>
        <div className="w-[400px] flex flex-col items-center justify-center gap-4 border border-emerald-300 bg-emerald-50 rounded-md px-8 py-4">
          <h1 className="font-semibold">{title}</h1>

          {
            fields.map((field) => {
              const condition = conditions.filter((con) => con.name === field.name);
              if (condition.length === 0) {
                return <FormField key={field.name} field={field} value={value} options={options} onChange={onChange} />;
              }
              return condition[0].show ? <FormField key={field.name} field={field} value={value} options={options} onChange={onChange} /> : null;
            })
          }

          <button
            className="flex items-center justify-center rounded-md border border-violet-300 bg-violet-50 mt-2 pt-2 pb-1 px-2 cursor-pointer hover:border-violet-500 hover:bg-violet-500 hover:text-white"
            type="button"
            onClick={onSubmit}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
