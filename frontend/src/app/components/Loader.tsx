import React from "react";

type LoaderOpt = "sm" | "md" | "lg";


const LoaderSm = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600`}></div>
    </div>
  );
};

const LoaderMd = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600`}></div>
    </div>
  );
};

const LoaderLg = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600`}></div>
    </div>
  );
};

const getLoader = (size: LoaderOpt) => {
  if (size == "sm") {
    return LoaderSm;
  }
  if (size == "md") {
    return LoaderMd;
  }
  return LoaderLg;
};

const Loader = ({ size = "md" } : { size?: LoaderOpt }) => {
  const LoaderCmp = getLoader(size);

  return (
    <LoaderCmp />
  );
};

export default Loader;
