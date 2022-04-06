import { useGetWalletDetails } from "queries";
import React from "react";
import { listen, unlisten } from "utils";

export const AccountChainIdListener: React.FunctionComponent = () => {
  const { refetch } = useGetWalletDetails();

  React.useEffect(() => {
    listen("accountsChanged", refetch);
    listen("chainChanged", refetch);

    return () => {
      unlisten("accountsChanged", refetch);
      unlisten("chainChanged", refetch);
    };
  }, []);

  return null;
};
