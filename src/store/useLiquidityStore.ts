import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import {
  type LiquidityType,
  type PoolDetails,
  type SwapToken,
} from "types/common";

interface LiquidityState {
  pools: LiquidityType[];
  swapTokens: SwapToken[];
  selectedPool: LiquidityType | null;
  poolDetails: PoolDetails | null;
  poolsMap: Record<string, PoolDetails>;
  saveLP: (data: LiquidityType) => void;
  deleteLP: (data: LiquidityType) => void;
  selectLP: (newLP: LiquidityType | null, swapTokens: SwapToken[]) => void;
  updateTokens: (newTokens: SwapToken[]) => void;
  updatePoolDetails: (newDetails: PoolDetails) => void;
  updatePoolsMap: (newMap: Record<string, PoolDetails>) => void;
}

const resetSwapTokens = (tokens: SwapToken[]): SwapToken[] =>
  tokens.map((token) => ({
    ...token,
    amount: "",
    estimated: true,
  }));

export const useLiquidityStore = create<LiquidityState>()(
  devtools(
    persist(
      (set) => ({
        pools: [],
        swapTokens: [],
        selectedPool: null,
        poolDetails: null,
        poolsMap: {},
        saveLP: (data) => set(({ pools }) => ({ pools: [...pools, data] })),
        selectLP: (newLP, swapTokens) =>
          set(() => ({ selectedPool: newLP, swapTokens })),
        deleteLP: (data) =>
          set(({ pools }) => ({
            pools: pools.filter((item) => item.name !== data.name),
          })),
        updateTokens: (newTokens) => set(() => ({ swapTokens: newTokens })),
        updatePoolDetails: (newDetails) =>
          set(() => ({ poolDetails: newDetails })),
        updatePoolsMap: (newMap) =>
          set(({ poolsMap }) => {
            return { poolsMap: { ...poolsMap, ...newMap } };
          }),
      }),
      {
        name: "liquidityStore",
        partialize: ({ pools, selectedPool, swapTokens }) => {
          const resetTokens = resetSwapTokens(swapTokens);

          return {
            pools,
            selectedPool,
            swapTokens: resetTokens,
          };
        },
      }
    )
  )
);
