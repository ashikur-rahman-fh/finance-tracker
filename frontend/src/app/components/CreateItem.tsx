"use client"
import Link from "next/link";
import React from "react";

const CreateItem = () => {
  const createPath = `/create`;

  return (
    <Link href={createPath}>
      <div className="flex items-center justify-center h-8 w-8 rounded-full fixed bottom-8 right-8 bg-emerald-50 border-2 border-emerald-300 font-bold text-2xl pt-1">+</div>
    </Link>
  );
};

export default CreateItem;
