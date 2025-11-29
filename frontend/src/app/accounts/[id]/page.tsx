"use client";

import React, { useCallback } from "react";

import Loader from "@/app/components/Loader";
import ErrorMessage from "@/app/components/ErrorMessage";
import DetailCard from "@/app/components/DetailCard";
import DetailHeader from "@/app/components/DetailHeader";
import TableView from "@/app/components/TableView";

import { useParams } from "next/navigation";
import { useDataLoader } from "@/hooks/useDataLoader";
import { IAccount } from "../../../../lib/types";
import { api } from "../../../../lib/api";

const Account = () => {
  const params = useParams<{id: string}>();
  const id: string = params.id;

  const fetchAccount = useCallback(async () => {
    const data = await api.get(`/accounts/${id}/`);
    return data as IAccount;
  }, [id]);

  const { data : account, state } = useDataLoader<IAccount> (fetchAccount, null);

  if (state === "loading" || state === "idle") {
    return <Loader />;
  } else if (state === "error" || account === null) {
    return <ErrorMessage message="Cannot load account!" />;
  }

  return (
    <React.Fragment>
      <DetailCard>
        <DetailHeader header="Account Detail" />
          <TableView
            rows={[
              ["Name", account.name],
              ["Type", account.account_type],
              ["Balance", account.balance],
              ["Real Balance", account.real_balance]
            ]}
          />
      </ DetailCard>
    </React.Fragment>
  );
};

export default Account;
