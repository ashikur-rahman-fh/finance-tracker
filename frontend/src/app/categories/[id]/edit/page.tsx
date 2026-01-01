"use client";

import React, { useCallback } from "react";
import { useParams } from "next/navigation";
import { fetchCategory } from "@/service/service";
import { useDataLoader } from "@/hooks/useDataLoader";
import { ICategory } from "../../../../../lib/types";
import ErrorMessage from "@/app/components/ErrorMessage";
import Loader from "@/app/components/Loader";
import UpdateCategory from "@/app/update/UpdateCategory";



const EditCategoryPage = () => {
  const params = useParams<{ id: string }>();

  const fetchCategoryCb = useCallback(() => {
    return fetchCategory(params.id);
  }, [params.id]);
  const { data : oldCategory, state } = useDataLoader<ICategory> (fetchCategoryCb, null);

  if (state === "loading" || state === "idle") {
    return <Loader />
  }
  if (state === "error") {
    return <ErrorMessage message="Cannot load category."/>
  }
  if (oldCategory === null) {
    return <ErrorMessage message="Invalid Category." />
  }


  return (
    <React.Fragment>
      <div className="flex items-center justify-center mt-4">
        <UpdateCategory old={oldCategory} />
      </div>
    </React.Fragment>
  );
};

export default EditCategoryPage;
