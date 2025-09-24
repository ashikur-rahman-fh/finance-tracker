import React from "react";

import { SelectProps } from "./types";

export const MySelect: React.FC<SelectProps> = (
  { name, options, value, onChange }
) => {
  return (
    <React.Fragment>
      <select
        className="block w-full px-1 py-2.5 rounded-md border focus:border-none border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option: string) => {
          return <option key={option} value={option} label={option} className="bg-emerald-50 border-emerald-500">{option}</option>;
        })}
      </select>
    </React.Fragment>
  );
};
