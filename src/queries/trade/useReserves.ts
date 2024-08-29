import { useEffect, useState } from "react";

import { getPoolReserves } from "utils/ethers";

export const useReserves = (lpAddress: string | null) => {
  const [value, setvalue] = useState("0");

  useEffect(() => {
    const getValue = async () => {
      if (!lpAddress) return;
      const result: string = await getPoolReserves(lpAddress);

      setvalue(result);
    };

    getValue();
  }, [lpAddress]);

  return value;
};
