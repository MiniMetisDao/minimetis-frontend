import { BigNumber } from "ethers";

import {
  METIS_CONTRACT_ADDRESS,
  METIS_HOLDER_CONTRACT_ADDRESS,
  METIS_TOKEN_DECIMALS,
  MINIME_CONTRACT_ADDRESS,
  TREASURY_ADDRESS,
} from "config";
import { type TokenAmount } from "types/common";
import { useMultiCallContract } from "utils/multicall";

type TreasuryData = {
  miniMe: TokenAmount;
  metis: TokenAmount;
};

const selector = (response: string[]): TreasuryData => {
  const totalMetis = BigNumber.from(response[1])
    .add(BigNumber.from(response[2]))
    .toString();

  return {
    miniMe: { amount: response[0], decimals: METIS_TOKEN_DECIMALS },
    metis: { amount: totalMetis, decimals: METIS_TOKEN_DECIMALS },
  };
};

export const useGetTreasury = () => {
  return useMultiCallContract<TreasuryData>(
    ["treasuryQuery", "treasury", "holder"],
    [
      {
        address: MINIME_CONTRACT_ADDRESS,
        method: "balanceOf",
        params: [TREASURY_ADDRESS],
      },
      {
        address: METIS_CONTRACT_ADDRESS,
        method: "balanceOf",
        params: [TREASURY_ADDRESS],
      },
      {
        address: METIS_CONTRACT_ADDRESS,
        method: "balanceOf",
        params: [METIS_HOLDER_CONTRACT_ADDRESS],
      },
    ],
    {
      select: selector,
    }
  );
};
