import React from "react";

import { useGetWalletDetails } from "queries/walletDetails";
import { listen, unlisten } from "utils/ethers";

export const AccountChainIdListener: React.FC = () => {
  const { refetch } = useGetWalletDetails();

  React.useEffect(() => {
    listen("accountsChanged", refetch);
    listen("chainChanged", refetch);

    return () => {
      unlisten("accountsChanged", refetch);
      unlisten("chainChanged", refetch);
    };
  }, [refetch]);

  return null;
};
