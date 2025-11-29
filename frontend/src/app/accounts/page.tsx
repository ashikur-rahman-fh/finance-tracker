"use client";
import React from "react";
import { api } from "../../../lib/api";
import { IAccount } from "../../../lib/types";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import AccountTable from "../components/AccountTable";
import { useRouter } from "next/navigation";
import { useDataLoader } from "@/hooks/useDataLoader";
import PageTitle from "../components/PageTitle";

export const fetchAccounts = async () => {
  return await api.get('/accounts') as IAccount[];
};

export default function AccountsPage() {
  const {data, state} = useDataLoader<IAccount[]>(fetchAccounts, []);
  const router = useRouter();


  if (state === "loading") return <Loader size="lg" />;
  if (state === "error" || data === null) return <ErrorMessage message={"Failed to load accounts"} />;

  return (
    <div className="container mx-auto">
      <PageTitle title="Accounts" />
      <AccountTable accounts={data} onSelect={id => router.push(`/accounts/${id}`)} />
    </div>
  );
}
