"use client";

import React from "react";

const DetailHeader : React.FC<{ header : string}> = ({ header }) => {
  return <h1 className="text-center mt-2 uppercase text-violet-500">{header}</h1>;
};

export default DetailHeader;
