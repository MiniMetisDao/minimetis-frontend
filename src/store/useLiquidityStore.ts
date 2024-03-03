import type { LiquidityType } from "utils/types";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface LiquidityState {
  pools: LiquidityType[];
  selectedPool: LiquidityType | null;
  saveLP: (data: LiquidityType) => void;
  deleteLP: (data: LiquidityType) => void;
  selectLP: (newLP: LiquidityType | null) => void;
}

export const useLiquidityStore = create<LiquidityState>()(
  devtools(
    persist(
      (set) => ({
        pools: [],
        selectedPool: null,
        saveLP: (data) => set(({ pools }) => ({ pools: [...pools, data] })),
        selectLP: (newLP) => set(() => ({ selectedPool: newLP })),
        deleteLP: (data) =>
          set(({ pools }) => ({
            pools: pools.filter((item) => item.name !== data.name),
          })),
      }),
      { name: "liquidityStore" }
    )
  )
);
