"use client";

import React, { useState, useCallback } from "react";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import TransactionTable from "../components/TransactionTable";
import PageTitle from "../components/PageTitle";

import { api } from "../../../lib/api";
import { ITransaction } from "../../../lib/types";
import { useDataLoader } from "@/hooks/useDataLoader";
import { MyInput } from "../components/MyFrom/MyInput";

export default function TransactionsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");


  const fetchTransactions = useCallback(async () => {
    let url = "/transactions/";
    const params = [];
    if (from) params.push(`from=${from}`);
    if (to) params.push(`to=${to}`);
    if (params.length) url += "?" + params.join("&");
    return await api.get(url) as ITransaction[];
  }, [from, to]);

  const { data: transactions, state } = useDataLoader<ITransaction[]>(fetchTransactions, []);

  if (state === "loading") {
    return <Loader size="lg" />;
  }
  if (state === "error") {
    return <ErrorMessage message={"Failed to load transactions"} />;
  }

  return (
    <div className="container mx-auto">
      <PageTitle title="Transactions" />
      <div className="flex max-w-[400px] gap-2 my-4 items-center justify-center">
        <MyInput
          name="from"
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          placeholder="From"
        />
        <MyInput
          name="to"
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder="To"
        />
        <button
          className="h-full flex items-center justify-center rounded-md border border-violet-300 bg-violet-50 pt-2 pb-1 px-2 cursor-pointer hover:border-violet-500 hover:bg-violet-500 hover:text-white"
          type="button"
          onClick={() => {fetchTransactions}}
        >
          Filter
        </button>
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  );
}
