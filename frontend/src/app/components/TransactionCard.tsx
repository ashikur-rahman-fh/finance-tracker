import React from "react";
import { ITransaction } from "../../../lib/types";

const FixedEllipsis = ({ text }: { text: string }) => {
  return (
    <div className="w-30">
      <span className="truncate block">{text}</span>
    </div>
  );
};

const FixedFull = ({ text }: { text: string }) => {
  return (
    <div className="w-30">
      <span className="block">{text}</span>
    </div>
  );
};

const TransactionCard = ({ transaction }: { transaction: Partial<ITransaction> }) => {
  return (
    <div className="rounded-md border-1 border-emerald-300 bg-emerald-50 shadow-xl p-2 m-2">
      <div className="flex gap-6 justify-between">
        <span>{transaction.date}</span>
        <FixedEllipsis text={transaction.account?.name ?? "-"} />
        <FixedEllipsis text={transaction.to_account?.name ?? "-"} />
        <FixedFull text={transaction.transaction_type ?? "-"} />
        <FixedEllipsis text={transaction.category?.name ?? "-"} />
        <FixedFull text={`${transaction.amount ?? "0.00"} ${transaction.currency}`} />
      </div>
    </div>
  );
};

export default TransactionCard;
