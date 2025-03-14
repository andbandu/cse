
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PayoutOption } from "@/lib/utils/calculator";
import React, { createContext, useContext } from "react";

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

const FiltersContext = createContext<FiltersState | null>(null);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const filters = useFilters();
  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFiltersContext() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }
  return context;
}
