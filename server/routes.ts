import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fdstorage } from "./fd-storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {

   // API routes prefix
   const apiPrefix = "/api";

  app.get('/api/dividends', async (_req, res) => {
    try {
      const data = await storage.getDividendData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dividend data' });
    }
  });

  app.get('/api/analytics', async (_req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
  });

  // Get all banks
  app.get(`${apiPrefix}/banks`, async (req, res) => {
    try {
      const banks = await fdstorage.getAllBanks();
      res.json(banks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching banks" });
    }
  });

  // Get a specific bank
  app.get(`${apiPrefix}/banks/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid bank ID" });
      }

      const bank = await fdstorage.getBank(id);
      if (!bank) {
        return res.status(404).json({ message: "Bank not found" });
      }

      res.json(bank);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bank" });
    }
  });

  // Get rates for a specific bank
  app.get(`${apiPrefix}/banks/:id/rates`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid bank ID" });
      }

      const rates = await fdstorage.getRatesByBank(id);
      res.json(rates);
    } catch (error) {
      res.status(500).json({ message: "Error fetching rates" });
    }
  });

  // Get all rates
  app.get(`${apiPrefix}/rates`, async (req, res) => {
    try {
      const rates = await fdstorage.getAllRates();
      res.json(rates);
    } catch (error) {
      res.status(500).json({ message: "Error fetching rates" });
    }
  });

  // Get top rates
  app.get(`${apiPrefix}/rates/top`, async (req, res) => {
    try {
      const limitParam = req.query.limit;
      const termParam = req.query.term;

      const limit = limitParam ? parseInt(limitParam as string) : 5;
      const term = termParam ? parseInt(termParam as string) : undefined;

      if (isNaN(limit)) {
        return res.status(400).json({ message: "Invalid limit parameter" });
      }

      if (termParam && isNaN(parseInt(termParam as string))) {
        return res.status(400).json({ message: "Invalid term parameter" });
      }

      const rates = await fdstorage.getTopRates(limit, term);
      
      // Fetch bank details for each rate
      const ratesWithBanks = await Promise.all(rates.map(async (rate) => {
        const bank = await fdstorage.getBank(rate.bankId);
        return { ...rate, bank };
      }));
      
      res.json(ratesWithBanks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching top rates" });
    }
  });

  // Filter rates by term and deposit amount
  app.get(`${apiPrefix}/rates/filter`, async (req, res) => {
    try {
      const schema = z.object({
        term: z.coerce.number().optional(),
        amount: z.coerce.number().optional()
      });
      
      const result = schema.safeParse(req.query);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid query parameters" });
      }
      
      const { term, amount } = result.data;
      
      let rates;
      if (term && amount) {
        rates = await fdstorage.getRatesByTermAndMinAmount(term, amount);
      } else if (term) {
        rates = await fdstorage.getRatesByTerm(term);
      } else {
        rates = await fdstorage.getAllRates();
      }
      
      // Fetch bank details for each rate
      const ratesWithBanks = await Promise.all(rates.map(async (rate) => {
        const bank = await fdstorage.getBank(rate.bankId);
        return { ...rate, bank };
      }));
      
      // Sort by interest rate in descending order
      ratesWithBanks.sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
      
      res.json(ratesWithBanks);
    } catch (error) {
      res.status(500).json({ message: "Error filtering rates" });
    }
  });

  // Get latest updates
  app.get(`${apiPrefix}/updates`, async (req, res) => {
    try {
      const limitParam = req.query.limit;
      const limit = limitParam ? parseInt(limitParam as string) : 3;

      if (isNaN(limit)) {
        return res.status(400).json({ message: "Invalid limit parameter" });
      }

      const updates = await fdstorage.getLatestUpdates(limit);
      res.json(updates);
    } catch (error) {
      res.status(500).json({ message: "Error fetching updates" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
