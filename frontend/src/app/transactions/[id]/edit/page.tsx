"use client";

import React from "react";
import { useParams } from "next/navigation";

const EditTransactionPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  return (
    <React.Fragment>
      <h1>Edit Transaction - {id}</h1>
    </React.Fragment>
  );
};

export default EditTransactionPage;
