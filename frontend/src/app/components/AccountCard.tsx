"use client";

import React from "react";

import { IAccount } from "../../../lib/types";
import { useRouter } from "next/navigation";

const AccountCard = ({ account }: { account: Partial<IAccount> }) => {
  const router = useRouter();
  const handleClick = () => {
    if (account?.id) {
      router.push(`accounts/${account.id}`);
    }
  };

  return (
    <React.Fragment>
      <div
        className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 shadow-xl h-fit w-[400px] p-2 cursor-pointer"
        onClick={handleClick}
      >
        <h1 className="font-semibold text-lg text-center">{account.name}</h1>
        <div className="flex items-center justify-center my-2">
          <pre>
            Account Type:     {account.account_type}<br />
            Account Balance:  {account.balance} {account.currency}<br />
            Actual Balance:   {account.real_balance} {account.currency}
          </pre>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountCard;
