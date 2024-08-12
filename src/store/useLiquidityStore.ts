import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { type LiquidityType, type PoolSwap } from "types/common";

interface LiquidityState {
  pools: LiquidityType[];
  swapTokens: PoolSwap[];
  selectedPool: LiquidityType | null;
  saveLP: (data: LiquidityType) => void;
  deleteLP: (data: LiquidityType) => void;
  selectLP: (newLP: LiquidityType | null, swapTokens: PoolSwap[]) => void;
  updateTokens: (newTokens: PoolSwap[]) => void;
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
