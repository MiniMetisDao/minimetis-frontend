import React from "react";

import { useGetWalletDetails } from "queries";
import { listen, unlisten } from "utils";

export const AccountChainIdListener: React.FC = () => {
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
