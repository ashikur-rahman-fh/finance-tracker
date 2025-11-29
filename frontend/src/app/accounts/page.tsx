"use client";

import React from "react";

import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import AccountTable from "../components/AccountTable";

import { useRouter } from "next/navigation";
import { useDataLoader } from "@/hooks/useDataLoader";
import { fetchAccounts } from "@/service/service";
import { IAccount } from "../../../lib/types";

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
