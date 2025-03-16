import type { DividendRecord, AnalyticsData } from '@shared/types';
import { sheetsService } from './services/googleSheets';

export interface IStorage {
  getDividendData(): Promise<DividendRecord[]>;
  getAnalytics(): Promise<AnalyticsData>;
  getBanks(): Promise<any[]>;
  getRates(): Promise<any[]>;
  getBankRates(bankId: number): Promise<any[]>;
  getRatesByFilter(term: number, amount: number): Promise<any[]>;
}

export class MemStorage implements IStorage {
  async getBanks(): Promise<any[]> {
    return await sheetsService.getBankData();
  }

  async getBank(id: number): Promise<any | null> {
    const banks = await this.getBanks();
    return banks.find(bank => bank.id === id) || null;
  }

  async getBankRates(bankId: number): Promise<any[]> {
    const rates = await sheetsService.getRatesData();
    return rates.filter(rate => rate.bankId === bankId);
  }

  async getRates(): Promise<any[]> {
    return await sheetsService.getRatesData();
  }
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

  async getRatesByFilter(term: number, amount: number): Promise<any[]> {
    const rates = await sheetsService.getRatesData();
    return rates.filter((rate) => {
      return rate.termMonths === term && rate.minDeposit <= amount;
    });
  }
}

export const storage = new MemStorage();