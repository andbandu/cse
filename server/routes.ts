import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  app.get("/api/banks", async (_req, res) => {
    try {
      const banks = await storage.getBanks();
      res.json(banks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch banks" });
    }
  });

  app.get("/api/banks/:id", async (req, res) => {
    try {
      const bank = await storage.getBank(parseInt(req.params.id));
      if (!bank) {
        res.status(404).json({ message: "Bank not found" });
        return;
      }
      res.json(bank);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bank details" });
    }
  });

  app.get("/api/banks/:id/rates", async (req, res) => {
    try {
      const rates = await storage.getBankRates(parseInt(req.params.id));
      res.json(rates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bank rates" });
    }
  });

  app.get("/api/rates", async (_req, res) => {
    try {
      const rates = await storage.getRates();
      res.json(rates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rates" });
    }
  });

  app.get("/api/dividends", async (_req, res) => {
    try {
      const data = await storage.getDividendData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dividend data" });
    }
  });

  app.get("/api/analytics", async (_req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics data" });
    }
  });

  return createServer(app);
}
