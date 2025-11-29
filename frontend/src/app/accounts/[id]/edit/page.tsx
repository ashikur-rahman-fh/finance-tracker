"use client";

import React from "react";

import { useParams } from "next/navigation";

const EditAccountPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <React.Fragment>
      <h1>Edit Account - {id}</h1>
    </React.Fragment>
  );
};

export default EditAccountPage;
