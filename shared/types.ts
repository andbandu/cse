

// Dividend tracker types
export interface DividendRecord {
  company: string;
  ticker: string;
  sector: string;
  established: number;
  quotedDate: number;
  fyEnding: string;
  frequency: string;
  dividends: {
    [year: string]: number;
  };
}
