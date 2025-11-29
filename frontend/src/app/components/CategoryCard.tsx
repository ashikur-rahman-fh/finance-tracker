import React from "react";

import { useRouter } from "next/navigation";
import { ICategory } from "../../../lib/types";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`categories/${category.id}`);
  };

  return (
    <React.Fragment>
      <div
        className="flex items-center justify-center h-[100px] w-[220px] border-2 border-emerald-300 bg-emerald-50 rounded-md p-2 cursor-pointer"
        onClick={handleClick}
      >
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
