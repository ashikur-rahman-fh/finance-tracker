"use client";

import React from "react";

const DetailCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <div
        className="rounded-md border-1 border-emerald-300 bg-emerald-50 shadow-xl p-2 m-2 flex items-center justify-center text-2xl"
      >
        <div>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailCard;
