import React from "react";

import { ITransaction } from "../../../lib/types";
import TransactionCard from "./TransactionCard";

type Props = {
  transactions: ITransaction[];
};

export default function TransactionTable({ transactions }: Props) {
  const groupedTransactionByDate = Object.groupBy(transactions, (transaction) => transaction.date);

  return (
    <React.Fragment>
      {Object.keys(groupedTransactionByDate).map((transactionDate) => {

        const currAccounts = groupedTransactionByDate[transactionDate];
        if (!currAccounts) return null;

        return (
          <div key={transactionDate} className="mb-4">
            <span className="font-semibold mb-2 p-1 rounded-md bg-violet-300">{transactionDate}</span>
            <div className="ml-16">
              {currAccounts.map((transaction) => <TransactionCard key={transaction.id} transaction={transaction} />)}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
