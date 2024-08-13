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
      { name: "liquidityStore" }
    )
  )
);
