"use client";

import React, { useCallback } from "react";

import ErrorMessage from "@/app/components/ErrorMessage";
import Loader from "@/app/components/Loader";
import DetailCard from "@/app/components/DetailCard";
import DetailHeader from "@/app/components/DetailHeader";
import TableView from "@/app/components/TableView";

import { useParams } from "next/navigation";
import { useDataLoader } from "@/hooks/useDataLoader";
import { ITransaction } from "../../../../lib/types";
import { fetchTransaction } from "@/service/service";

const CreateCategory = () => {
  const params = useParams<{ id: string }>();
  const id: string = params.id;

  const fetchTransactionCb = useCallback(async () => {
    const data = await fetchTransaction(id);
    return data;
  }, [id]);

  const { data: transaction, state } = useDataLoader<ITransaction>(fetchTransactionCb, null);

  if (state === "loading" || state === "idle") {
    return <Loader />;
  } else if (state === "error" || transaction === null) {
    return <ErrorMessage message="Cannot load transactions!" />;
  }

  return (
    <React.Fragment>
      <DetailCard>
        <DetailHeader header="Transaction Detail" />
        <TableView
          rows={[
          ["Type", transaction.transaction_type],
          ["Amount", transaction.amount],
          ["Account", transaction.account.name],
          ["Date", transaction.date],
          ["Note", transaction.note],
          ["Descriptions", transaction.description],
          ["Category", transaction.category.name],
          ]}
        />
      </DetailCard>
    </React.Fragment>
  );
};

export default CreateCategory;
