import create from "zustand";

interface TradeNavState {
  option: "create" | "import" | null;
  setOption: (option: "create" | "import" | null) => void;
}

export const useTradeNavigation = create<TradeNavState>()((set) => ({
  option: null,
  setOption: (option) => set(() => ({ option })),
}));
