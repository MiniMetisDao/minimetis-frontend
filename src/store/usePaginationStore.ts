import create from "zustand";

interface PaginationState {
  currentPage: number;
  changePage: (newPage: number) => void;
  reset: () => void;
}

export const usePaginationStore = create<PaginationState>()((set) => ({
  currentPage: 1,
  changePage: (newPage) => set(() => ({ currentPage: newPage })),
  reset: () => set(() => ({ currentPage: 1 })),
}));
