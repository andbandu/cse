import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mongoStorage } from "./mongodb-storage";
import { z } from "zod";
import { Router } from "express";
import { mongoDBService } from "./services/mongodb";
import { sheetsService } from "./services/googleSheets";
import { log } from "console";

const router = Router();

// ===== BANKS ENDPOINTS =====
router.get("/banks", async (req, res) => {
  try {
    console.log("Fetching all banks from MongoDB...");
    const banks = await mongoDBService.getBanks();
    console.log(`Successfully fetched ${banks.length} banks`);
    res.json(banks);
  } catch (error) {
    console.error("Error fetching banks:", error);
    res.status(500).json({ error: "Failed to fetch banks" });
  }
});

router.get("/banks/:id", async (req, res) => {
  try {
    console.log(`Fetching bank with id: ${req.params.id}`);
    const bank = await mongoDBService.getBank(req.params.id);
    if (!bank) {
      console.log(`Bank with id ${req.params.id} not found`);
      return res.status(404).json({ error: "Bank not found" });
    }
    console.log(`Successfully fetched bank: ${bank.name}`);
    res.json(bank);
  } catch (error) {
    console.error("Error fetching bank:", error);
    res.status(500).json({ error: "Failed to fetch bank" });
  }
});

// ===== RATES ENDPOINTS =====
router.get("/rates", async (req, res) => {
  try {
    // Parse query parameters
    const termMonths = req.query.term
      ? parseInt(req.query.term as string)
      : undefined;
    const amount = req.query.amount
      ? parseInt(req.query.amount as string)
      : undefined;

    let rates;

    if (termMonths && amount) {
      rates = await mongoDBService.getRatesByTermAndMinAmount(
        termMonths,
        amount,
      );
      console.log("buduammo1");
    } else if (termMonths) {
      rates = await mongoDBService.getRatesByTerm(termMonths);
      console.log("buduammo2");
    } else {
      rates = await mongoDBService.getAllRates();
      console.log("buduammo3");
    }

    res.json(rates);
  } catch (error) {
    console.error("Error fetching rates:", error);
    res.status(500).json({ error: "Failed to fetch rates" });
  }
});

router.get("/rates/bank/:bankId", async (req, res) => {
  try {
    const rates = await mongoDBService.getRatesByBank(req.params.bankId);
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rates" });
  }
});

router.get("/rates/top", async (req, res) => {
  console.log("buduammo");
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const termMonths = req.query.term
      ? parseInt(req.query.term as string)
      : undefined;

    const topRates = await mongoDBService.getTopRates(limit, termMonths);
    res.json(topRates);
  } catch (error) {
    console.error("Error fetching top rates:", error);
    res.status(500).json({ error: "Failed to fetch top rates" });
  }
});

// ===== BANKS ENDPOINTS =====
router.get("/banks", async (req, res) => {
  try {
    console.log("Fetching all banks from MongoDB...");
    const banks = await mongoDBService.getBanks();
    console.log(`Successfully fetched ${banks.length} banks`);
    res.json(banks);
  } catch (error) {
    console.error("Error fetching banks:", error);
    res.status(500).json({ error: "Failed to fetch banks" });
  }
});

router.post("/admin/banks", async (req, res) => {
  try {
    console.log("Creating new bank:", req.body);
    const newBank = await mongoDBService.createBank(req.body);
    console.log(`Successfully created bank with id: ${newBank.id}`);
    res.status(201).json(newBank);
  } catch (error) {
    console.error("Error creating bank:", error);
    res.status(500).json({ error: "Failed to create bank" });
  }
});

router.put("/admin/banks/:id", async (req, res) => {
  try {
    console.log(`Updating bank with id: ${req.params.id}`);
    const updatedBank = await mongoDBService.updateBank(
      req.params.id,
      req.body,
    );
    if (!updatedBank) {
      console.log(`Bank with id ${req.params.id} not found`);
      return res.status(404).json({ error: "Bank not found" });
    }
    console.log(`Successfully updated bank: ${updatedBank.name}`);
    res.json(updatedBank);
  } catch (error) {
    console.error("Error updating bank:", error);
    res.status(500).json({ error: "Failed to update bank" });
  }
});

router.delete("/admin/banks/:id", async (req, res) => {
  try {
    console.log(`Deleting bank with id: ${req.params.id}`);
    const result = await mongoDBService.deleteBank(req.params.id);
    if (!result) {
      console.log(`Bank with id ${req.params.id} not found`);
      return res.status(404).json({ error: "Bank not found" });
    }
    console.log(`Successfully deleted bank with id: ${req.params.id}`);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Error deleting bank:", error);
    res.status(500).json({ error: "Failed to delete bank" });
  }
});

// ===== UPDATES ENDPOINTS =====
router.get("/updates", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
    const updates = await mongoDBService.getUpdates(limit);
    res.json(updates);
  } catch (error) {
    console.error("Error fetching updates:", error);
    res.status(500).json({ error: "Failed to fetch updates" });
  }
});

// ===== DIVIDEND DATA ENDPOINTS =====
router.get("/dividends", async (req, res) => {
  try {
    const dividendData = await sheetsService.getDividendData();
    res.json(dividendData);
  } catch (error) {
    console.error("Error fetching dividend data:", error);
    res.status(500).json({ error: "Failed to fetch dividend data" });
  }
});

export default router;

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiPrefix = "/api";

  app.use(apiPrefix, router); // Use the new router for API routes

  app.get("/api/analytics", async (_req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics data" });
    }
  });

  // Ensure all routes are properly defined
  app.use((req, res, next) => {
    // Handle 404 errors for API routes
    if (req.path.startsWith(apiPrefix) && !res.headersSent) {
      res.status(404).json({ error: "API endpoint not found" });
    } else {
      next();
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
