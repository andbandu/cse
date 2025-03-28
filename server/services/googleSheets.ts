import { google } from "googleapis";
import NodeCache from "node-cache";
import type { DividendRecord } from "@shared/types";
import dotenv from "dotenv";
dotenv.config();

const SPREADSHEET_ID = "14D2R_AK9ZU0AVnLDMNQCkeElBfzvALz5wLr57kQy0mk";
const DIVIDEND_RANGE = "Sheet1!A2:Z";
const BANKS_RANGE = "Sheet2!A2:Z";
const RATES_RANGE = "Sheet3!A2:Z";

// Reduce cache time to 30 seconds for more frequent updates
const cache = new NodeCache({ stdTTL: 30 });

export class GoogleSheetsService {
  private auth;
  private sheets;

  constructor() {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}");
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });

      this.sheets = google.sheets({ version: "v4", auth: this.auth });
    } catch (error) {
      console.error("Failed to initialize Google Sheets service:", error);
      throw new Error("Failed to initialize Google Sheets service");
    }
  }

  async getDividendData(): Promise<DividendRecord[]> {
    const cachedData = cache.get<DividendRecord[]>("dividend_data");
    if (cachedData) return cachedData;

    try {
      console.log("Fetching fresh data from Google Sheets...");
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: DIVIDEND_RANGE,
      });

      const rows = response.data.values;
      if (!rows) {
        console.error("No data found in Google Sheets");
        return [];
      }

      

      const records: DividendRecord[] = rows.map((row) => {
        const baseRecord = {
          company: row[0] || "",
          ticker: row[1] || "",
          sector: row[2] || "",
          established: parseInt(row[3]) || 0,
          quotedDate: parseInt(row[4]) || 0,
          fyEnding: row[5] || "",
          frequency: "Annual",
          dividends: {},
        };

        const currentYear = new Date().getFullYear();
        for (let i = 6; i < row.length; i++) {
          const year = (currentYear - (i - 6)).toString();
          if (row[i] && !isNaN(parseFloat(row[i]))) {
            baseRecord.dividends[year] = parseFloat(row[i]);
          }
        }

        return baseRecord;
      });

      cache.set("dividend_data", records);
      return records;
    } catch (error) {
      console.error("Failed to fetch data from Google Sheets:", error);
      throw new Error("Failed to fetch dividend data");
    }
  }

  async getRatesData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RATES_RANGE,
      });

      const rows = response.data.values;
      if (!rows) {
        console.error("No rates data found in Google Sheets");
        return [];
      }

      return rows.map((row) => ({
        id: parseInt(row[0]) || 0,
        bankId: parseInt(row[1]) || 0,
        termMonths: parseInt(row[2]) || 0,
        monthlyRate: parseFloat(row[3]) || 0,
        monthlyAer: parseFloat(row[4]) || 0,
        yearlyRate: parseFloat(row[5]) || 0,
        yearlyAer: parseFloat(row[6]) || 0,
        maturityRate: parseFloat(row[7]) || 0,
        maturityAer: parseFloat(row[8]) || 0,
        minDeposit: parseInt(row[9]) || 0,
        updatedAt: row[10] || new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Failed to fetch rates data from Google Sheets:", error);
      throw new Error("Failed to fetch rates data");
    }
  }

  async getBankData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: BANKS_RANGE,
      });

      const rows = response.data.values;
      if (!rows) {
        console.error("No bank data found in Google Sheets");
        return [];
      }

      return rows.map((row) => ({
        id: parseInt(row[0]),
        name: row[1] || "",
        shortName: row[2] || "",
        type: row[3] || "",
        description: row[4] || "",
        minDeposit: row[5] || "",
        updatedAt: row[6] || "",
        fitchRatings: row[7] || "",
      }));
    } catch (error) {
      console.error("Failed to fetch bank data from Google Sheets:", error);
      throw new Error("Failed to fetch bank data");
    }
  }
}

export const sheetsService = new GoogleSheetsService();
