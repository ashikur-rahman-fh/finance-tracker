import React from "react";
import CreateAccount from "./CreateAccount";
import CreateCategory from "./CreateCategory";
import CreateTransaction from "./CreateTransaction";

const CreatePage = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center gap-4">
        <CreateAccount />
        <CreateCategory />
        <CreateTransaction />
      </div>
    </React.Fragment>
  );
};

export default CreatePage;
