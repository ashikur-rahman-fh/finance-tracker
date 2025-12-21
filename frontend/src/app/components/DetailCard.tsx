"use client";

import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { DeleteForever } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { ConfirmationModal } from "./Modal";
import { deleteAccount, deleteCategory, deleteTransaction } from "@/service/service";

type deleteItem = "account" | "category" | "transaction" | null;

const getItem = (pathname: string): deleteItem => {
  const pathParams = pathname.split("/");
  const param = pathParams[1].trim();
  switch (param) {
    case "accounts":
      return "account";
    case "categories":
      return "category";
    case "transactions":
      return "transaction";
    default:
      return null;
  };
};

const getId = (pathname: string) => {
  const pathParams = pathname.split("/");
  const id = pathParams[2].trim();
  return id;
};

const DeleteModalBody = () => {
  const pathname = usePathname();
  const name = getItem(pathname);

  return (
    <React.Fragment>
      <h1>Delete this {name}?</h1>
      <h2 className="text-sm text-red-500">This action cannot be undone!</h2>
    </React.Fragment>
  );
};

const DetailCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleClick = () => {
    router.push(`${pathname}/edit`);
  };
  const handleDelete = () => {
    setOpenModal(true);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onConfirm = () => {
    const id = getId(pathname);
    const item = getItem(pathname);
    switch(item) {
      case "account":
        deleteAccount(id);
        break;
      case "category":
        deleteCategory(id);
        break;
      case "transaction":
        deleteTransaction(id);
        break;
      default:
        break;
    };
  };

  return (
    <React.Fragment>
      <div
        className="rounded-md border-1 border-emerald-300 bg-emerald-50 shadow-xl p-2 m-2 flex items-center justify-center text-2xl"
      >
        <div>
          <DeleteForever
            className="mx-2 text-red-400 float-right mt-3 hover:text-red-700 cursor-pointer"
            onClick={handleDelete}
          />
          <EditIcon
            className="mx-2 text-amber-300 float-right mt-3 hover:text-amber-500 cursor-pointer"
            onClick={handleClick}
          />
          {children}
        </div>
        <ConfirmationModal
          open={openModal}
          onCancel={onCancel}
          setOpen={setOpenModal}
          onConfirm={onConfirm}
          body={<DeleteModalBody />}
        />
      </div>
    </React.Fragment>
  );
};

export default DetailCard;
