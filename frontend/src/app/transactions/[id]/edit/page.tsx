"use client";

import React, { useCallback } from "react";

import UpdateTransaction from "@/app/update/UpdateTransaction";
import Loader from "@/app/components/Loader";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useParams } from "next/navigation";
import { useDataLoader } from "@/hooks/useDataLoader";
import { fetchTransaction } from "@/service/service";

const EditTransactionPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const fetchTransactionCb = useCallback(async () => {
    return await fetchTransaction(id);
  }, [id]);
  const { data: oldTransaction, state } = useDataLoader(fetchTransactionCb, null);
  if (state === "idle" || state === "loading") {
    return <Loader />;
  }
  if (state === "error" || oldTransaction === null) {
    return <ErrorMessage message="Cannot load transaction. Please try again!" />;
  }
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
      <UpdateTransaction
        old={oldTransaction}
      />
      </div>
    </React.Fragment>
  );
};

export default EditTransactionPage;
