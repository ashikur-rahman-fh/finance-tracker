"use client";

import React, { useCallback } from "react";

import Loader from "@/app/components/Loader";
import ErrorMessage from "@/app/components/ErrorMessage";
import DetailCard from "@/app/components/DetailCard";
import DetailHeader from "@/app/components/DetailHeader";
import TableView from "@/app/components/TableView";

import { useParams } from "next/navigation";
import { useDataLoader } from "@/hooks/useDataLoader";
import { ICategory } from "../../../../lib/types";
import { fetchCategory } from "@/service/service";

const CreateCategory = () => {
  const params = useParams<{ id: string }>();
  const id: string = params.id;

  const fetchCategoryCb = useCallback(async () => {
    const data = fetchCategory(id);
    return data;
  }, [id]);
  const { data: category, state } = useDataLoader<ICategory>(fetchCategoryCb, null);

  if (state === "loading" || state === "idle") {
    return <Loader />;
  } else if (state === "error" || category === null) {
    return <ErrorMessage message="Cannot load category!" />
  }

  return (
    <React.Fragment>
      <DetailCard>
        <DetailHeader header="Category Detail" />
        <TableView
          rows={[
            ["Category", category.name],
            ["Type", category.category_type],
            ["Description", category.description]
          ]}
        />
      </DetailCard>
    </React.Fragment>
  );
};

export default CreateCategory;
