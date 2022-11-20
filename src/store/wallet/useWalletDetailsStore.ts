import create from "zustand";

interface WalletDetailsState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useWalletDetailsStore = create<WalletDetailsState>()((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open })),
}));
