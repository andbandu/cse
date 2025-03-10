import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
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

  return createServer(app);
}
