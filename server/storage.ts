import type { DividendRecord, AnalyticsData } from '@shared/types';
import { sheetsService } from './services/googleSheets';

export interface IStorage {
  getDividendData(): Promise<DividendRecord[]>;
  getAnalytics(): Promise<AnalyticsData>;
}

export class MemStorage implements IStorage {
  async getDividendData(): Promise<DividendRecord[]> {
    return await sheetsService.getDividendData();
  }

  async getAnalytics(): Promise<AnalyticsData> {
    const data = await this.getDividendData();
    
    const currentYear = new Date().getFullYear();
    const yields = data.map(record => record.dividends[currentYear] || 0);
    
    const analytics: AnalyticsData = {
      averageYield: yields.reduce((a, b) => a + b, 0) / yields.length,
      sectorDistribution: data.reduce((acc, record) => {
        acc[record.sector] = (acc[record.sector] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      highestYield: data.reduce((max, record) => {
        const yield_ = record.dividends[currentYear] || 0;
        return yield_ > max.yield ? { company: record.company, yield: yield_ } : max;
      }, { company: '', yield: 0 })
    };

    return analytics;
  }
}

export const storage = new MemStorage();
