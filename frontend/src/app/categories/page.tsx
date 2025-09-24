"use client"

import React from "react";

import { useDataLoader } from "@/hooks/useDataLoader";
import { ICategory } from "../../../lib/types";
import Loader from "../components/Loader";

import { api } from "../../../lib/api";
import ErrorMessage from "../components/ErrorMessage";
import CategoryCard from "../components/CategoryCard";
import PageTitle from "../components/PageTitle";

const fetchCategories = async (): Promise<ICategory[]> => {
  return await api.get('/categories');
};

const CategoryPage = () => {
  const { data: categories, state } = useDataLoader<ICategory[]>(fetchCategories, []);

  if (state === "loading") {
    return <Loader size="lg" />
  }
  if (state === "error") {
    return <ErrorMessage message="Failed to load categories" />
  }

  if (categories.length === 0) {
    return "No category to display";
  }

  const categoriesGroupedByType = Object.groupBy(categories, (category) => category.category_type);

  return (
    <React.Fragment>
      <PageTitle title="Categories" />
      {Object.keys(categoriesGroupedByType).map((categoryKey) => {
        const categoryList = categoriesGroupedByType[categoryKey];
        if (!categoryList) {
          return null;
        }

        return (
          <div key={categoryKey}>
            <span className="font-semibold mb-2 p-1 rounded-md bg-violet-300">{categoryKey}</span>
            <div className="flex flex-wrap gap-2 mx-8 my-2">
            {categoryList.map((category) => {
              return (
                <CategoryCard key={category.id} category={category} />
              )
            })}
            </div>
          </div>
        )
      })}
    </React.Fragment>
  );
};

export default CategoryPage;
