"use client";

import React from "react";

import { IAccount } from "../../../lib/types";
import AccountCard from "./AccountCard";

type Props = {
  accounts: IAccount[];
  onSelect?: (id: string) => void;
};

export default function AccountTable({ accounts }: Props) {
  const groupedAccountByType = Object.groupBy(accounts, (account) => account.account_type);

  return (
    <React.Fragment>
      {Object.keys(groupedAccountByType).map((accountType) => {

        const currAccounts = groupedAccountByType[accountType];
        if (!currAccounts) return null;

        return (
          <div key={accountType} className="mb-4">
            <h1 className="font-semibold mb-2 p-1 rounded-md bg-violet-300">{accountType}</h1>
            <div className="flex gap-4 items-center justify-center flex-wrap">
              {currAccounts.map((account) => <AccountCard key={account.name} account={account} />)}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
