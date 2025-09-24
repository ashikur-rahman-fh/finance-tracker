import React from "react";
import { Category } from "../../../lib/types";

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center h-[100px] w-[220px] border-2 border-emerald-300 bg-emerald-50 rounded-md p-2">
        <pre>
          Name: {category.name}<br />
          Type: {category.category_type}<br />
          Desc: {category.description}
        </pre>
      </div>
    </React.Fragment>
  );
};

export default CategoryCard;
