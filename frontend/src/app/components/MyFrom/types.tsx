import React from "react";

export type InputType = "text" | "number" | "select" | "date";

export interface IInput {
  name: string;
  placeholder?: string;
  type: InputType;
};

export interface IOption {
  name: string;
  options: string[];
}

export interface ICondition {
  name: string;
  show: boolean;
};

export interface InputProps extends IInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface SelectProps extends Omit<IInput, "type" | "placeholder"> {
  options: string[],
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export interface FormFieldProps {
  field: IInput;
  value: Record<string, string>,
  options: IOption[];
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export interface MyFormProps {
  fields: IInput[];
  title: string;
  buttonText: string;
  value: Record<string, string>;
  options: IOption[];
  conditions?: ICondition[],
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
};
