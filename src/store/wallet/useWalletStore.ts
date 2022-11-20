import create from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  connected: boolean;
  login: () => void;
  logout: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      connected: false,
      login: () => set({ connected: true }),
      logout: () => set({ connected: false }),
    }),
    {
      name: "walletConnected", // name of item in the storage (must be unique)
    }
  )
);
