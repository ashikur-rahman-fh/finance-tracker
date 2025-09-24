import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return <h1 className="font-bold uppercase text-xl text-center mb-2 p-2">{title}</h1>
};

export default PageTitle;
