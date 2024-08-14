import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { type LiquidityType, type SwapToken } from "types/common";

interface LiquidityState {
  pools: LiquidityType[];
  swapTokens: SwapToken[];
  selectedPool: LiquidityType | null;
  saveLP: (data: LiquidityType) => void;
  deleteLP: (data: LiquidityType) => void;
  selectLP: (newLP: LiquidityType | null, swapTokens: SwapToken[]) => void;
  updateTokens: (newTokens: SwapToken[]) => void;
}

const resetSwapTokens = (tokens: SwapToken[]): SwapToken[] =>
  tokens.map((token) => ({
    ...token,
    amount: "",
    estimated: true,
  }));

// Reset the swapTokens amounts to "" and put estivate into false
export const useLiquidityStore = create<LiquidityState>()(
  devtools(
    persist(
      (set) => ({
        pools: [],
        swapTokens: [],
        selectedPool: null,
        saveLP: (data) => set(({ pools }) => ({ pools: [...pools, data] })),
        selectLP: (newLP, swapTokens) =>
          set(() => ({ selectedPool: newLP, swapTokens })),
        deleteLP: (data) =>
          set(({ pools }) => ({
            pools: pools.filter((item) => item.name !== data.name),
          })),
        updateTokens: (newTokens) => set(() => ({ swapTokens: newTokens })),
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
