import { google } from 'googleapis';
import NodeCache from 'node-cache';
import type { DividendRecord } from '@shared/types';

const SPREADSHEET_ID = '14D2R_AK9ZU0AVnLDMNQCkeElBfzvALz5wLr57kQy0mk';
const RANGE = 'Sheet1!A2:Z'; // Extended range to capture all years

// Reduce cache time to 30 seconds for more frequent updates
const cache = new NodeCache({ stdTTL: 30 });

export class GoogleSheetsService {
  private auth;
  private sheets;

  constructor() {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      throw new Error('Failed to initialize Google Sheets service');
    }
  }

  async getDividendData(): Promise<DividendRecord[]> {
    const cachedData = cache.get<DividendRecord[]>('dividend_data');
    if (cachedData) return cachedData;

    try {
      console.log('Fetching fresh data from Google Sheets...');
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
      });

      const rows = response.data.values;
      if (!rows) {
        console.error('No data found in Google Sheets');
        return [];
      }

      console.log(`Found ${rows.length} rows of data`);

      const records: DividendRecord[] = rows.map(row => {
        // Extract basic company information from fixed columns
        const baseRecord = {
          company: row[0] || '',    // Column A: Company Name
          ticker: row[1] || '',     // Column B: Ticker
          sector: row[2] || '',     // Column C: Sector
          established: parseInt(row[3]) || 0,  // Column D: Established
          quotedDate: parseInt(row[4]) || 0,   // Column E: Quoted Date
          fyEnding: row[5] || '',    // Column F: FY Ending
          frequency: 'Annual',
          dividends: {}
        };

        // Start from column G (index 6) for dividend years
        // Calculate the year for each column
        const currentYear = new Date().getFullYear();
        for (let i = 6; i < row.length; i++) {
          const year = (currentYear - (i - 6)).toString();
          if (row[i] && !isNaN(parseFloat(row[i]))) {
            baseRecord.dividends[year] = parseFloat(row[i]);
          }
        }

        return baseRecord;
      });

      cache.set('dividend_data', records);
      return records;
    } catch (error) {
      console.error('Failed to fetch data from Google Sheets:', error);
      throw new Error('Failed to fetch dividend data');
    }
  }
}

export const sheetsService = new GoogleSheetsService();