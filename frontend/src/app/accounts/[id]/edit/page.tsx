"use client";

import React, { useCallback } from "react";

import { useParams } from "next/navigation";
import { fetchAccount } from "@/service/service";
import { useDataLoader } from "@/hooks/useDataLoader";
import { IAccount } from "../../../../../lib/types";
import ErrorMessage from "@/app/components/ErrorMessage";
import Loader from "@/app/components/Loader";
import UpdateAccount from "@/app/update/UpdateAccount";

const EditAccountPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const fetchAccountCb = useCallback(() => {
    return fetchAccount(id);
  }, [id]);

  const { data: oldAccount, state } = useDataLoader<IAccount | null>(fetchAccountCb, null);

  if (state === "loading" || state === "idle") return <Loader />;
  if (state === "error") return <ErrorMessage message="Cannot load account." />;
  if (!oldAccount) return <ErrorMessage message="Invalid Account." />;

  return (
    <React.Fragment>
      <div className="flex items-center justify-center mt-4">
        <UpdateAccount old={oldAccount} />
      </div>
    </React.Fragment>
  );
};

export default EditAccountPage;
