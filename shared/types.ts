export interface DividendRecord {
  _id?: string;
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

export interface AnalyticsData {
  averageYield: number;
  sectorDistribution: {
    [sector: string]: number;
  };
  highestYield: {
    company: string;
    yield: number;
  };
}
