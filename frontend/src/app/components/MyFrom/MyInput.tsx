import React from "react";

import { InputProps } from "./types";

export const MyInput: React.FC<InputProps> = (
  { name, placeholder, type, value, onChange }
) => {
  return (
    <React.Fragment>
      <input
        className="block w-full p-2 rounded-md border focus:border-none border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 "
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </React.Fragment>
  );
};
