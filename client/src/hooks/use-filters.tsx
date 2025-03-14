import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PayoutOption } from "@/lib/utils/calculator";

interface FiltersState {
  term: number;
  amount: number;
  payoutOption: PayoutOption;
  setFilters: (filters: Partial<Omit<FiltersState, "setFilters">>) => void;
}

export const useFilters = create<FiltersState>()(
  persist(
    (set) => ({
      term: 12,
      amount: 100000,
      payoutOption: 'maturity',
      setFilters: (filters) => set((state) => ({ ...state, ...filters })),
    }),
    {
      name: "deposit-filters",
    }
  )
);
