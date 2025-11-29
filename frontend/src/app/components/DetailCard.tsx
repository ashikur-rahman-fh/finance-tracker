"use client";

import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useRouter, usePathname } from "next/navigation";

const DetailCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    router.push(`${pathname}/edit`);
  };
  return (
    <React.Fragment>
      <div
        className="rounded-md border-1 border-emerald-300 bg-emerald-50 shadow-xl p-2 m-2 flex items-center justify-center text-2xl"
      >
        <div>
          <EditIcon
            className="text-violet-300 float-right mt-3 hover:text-violet-500 cursor-pointer"
            onClick={handleClick}
          />
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailCard;
