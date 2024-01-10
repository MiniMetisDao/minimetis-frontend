import type { LiquidityType } from "utils/types";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface LiquidityState {
  pools: LiquidityType[];
  saveLP: (data: LiquidityType) => void;
  deleteLP: (data: LiquidityType) => void;
}

export const useLiquidityStore = create<LiquidityState>()(
  devtools(
    persist(
      (set) => ({
        pools: [],
        saveLP: (data) => set(({ pools }) => ({ pools: [...pools, data] })),
        deleteLP: (data) =>
          set(({ pools }) => ({
            pools: pools.filter((item) => item.name !== data.name),
          })),
      }),
      { name: "liquidityStore" }
    )
  )
);
