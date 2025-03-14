
// Bank and FD rates types
export interface Bank {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  established?: number;
  logoUrl?: string;
  website?: string;
  category: 'bank' | 'finance';
  regulatedBy: string;
  status: 'active' | 'inactive';
}

export interface Rate {
  id: string;
  bankId: string;
  bankName: string;
  termMonths: number;
  interestRate: number;
  minDeposit: number;
  maxDeposit?: number;
  specialConditions?: string;
  lastUpdated: Date;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  date: Date;
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
