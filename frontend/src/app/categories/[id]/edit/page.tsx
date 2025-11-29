"use client";

import React from "react";
import { useParams } from "next/navigation";

const EditCategoryPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <React.Fragment>
      <h1>Edit Category - {id}</h1>
    </React.Fragment>
  );
};

export default EditCategoryPage;
