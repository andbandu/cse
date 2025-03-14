
// Bank and Rate types
export interface Bank {
  id: string;
  name: string;
  shortName: string;
  description: string;
  established: number;
  minDeposit: string;
  website?: string;
  logoUrl: string;
  category: string;
  regulatedBy: string;
  status: string;
  updatedAt: string;
}

export interface Rate {
  id?: string;
  bankId: string;
  bankName: string;
  termMonths: number;
  interestRate: number;
  minDeposit: string;
  lastUpdated: string;
}



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
