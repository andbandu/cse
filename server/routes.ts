import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mongoStorage } from "./mongodb-storage";
import { z } from "zod";
import { Router } from 'express';
import { mongoDBService } from './services/mongodb';
import { sheetsService } from './services/googleSheets';
import { sampleBanks, sampleRates, sampleUpdates } from './sample-data';

const router = Router();

// Initialize database with sample data if empty
async function seedDatabaseIfEmpty() {
  try {
    await mongoDBService.seedData('banks', sampleBanks);
    await mongoDBService.seedData('rates', sampleRates);
    await mongoDBService.seedData('updates', sampleUpdates);
    console.log('Database seeding check complete');
  } catch (error) {
    console.error('Error during database seeding check:', error);
  }
}

// Run seeding on router initialization
seedDatabaseIfEmpty();

// ===== BANKS ENDPOINTS =====
router.get('/banks', async (req, res) => {
  try {
    const banks = await mongoDBService.getBanks();
    console.log(`Successfully fetched ${banks.length} banks`);
    res.json(banks);
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({ error: 'Failed to fetch banks' });
  }
});

router.get('/banks/:id', async (req, res) => {
  try {
    const bank = await mongoDBService.getBank(req.params.id);
    if (!bank) {
      console.log(`Bank with id ${req.params.id} not found`);
      return res.status(404).json({ error: 'Bank not found' });
    }
    console.log(`Successfully fetched bank with id ${req.params.id}`);
    res.json(bank);
  } catch (error) {
    console.error('Error fetching bank:', error);
    res.status(500).json({ error: 'Failed to fetch bank' });
  }
});

// ===== RATES ENDPOINTS =====
router.get('/rates', async (req, res) => {
  try {
    // Parse query parameters
    const termMonths = req.query.term ? parseInt(req.query.term as string) : undefined;
    const amount = req.query.amount ? parseInt(req.query.amount as string) : undefined;

    let rates;

    if (termMonths && amount) {
      rates = await mongoDBService.getRatesByTermAndMinAmount(termMonths, amount);
      console.log(`Fetched ${rates.length} rates for term ${termMonths} months and amount ${amount}`);
    } else if (termMonths) {
      rates = await mongoDBService.getRatesByTerm(termMonths);
      console.log(`Fetched ${rates.length} rates for term ${termMonths} months`);
    } else {
      rates = await mongoDBService.getAllRates();
      console.log(`Fetched ${rates.length} rates`);
    }

    res.json(rates);
  } catch (error) {
    console.error('Error fetching rates:', error);
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

// Add a POST endpoint to support the client-side POST fetches
router.post('/rates', async (req, res) => {
  try {
    const filters = req.body;
    console.log('Received rate request with filters:', filters);
    
    let rates;
    if (filters.term && filters.amount) {
      rates = await mongoDBService.getRatesByTermAndMinAmount(filters.term, filters.amount);
      console.log(`Fetched ${rates.length} rates for term ${filters.term} months and amount ${filters.amount}`);
    } else if (filters.term) {
      rates = await mongoDBService.getRatesByTerm(filters.term);
      console.log(`Fetched ${rates.length} rates for term ${filters.term} months`);
    } else {
      rates = await mongoDBService.getAllRates();
      console.log(`Fetched ${rates.length} rates`);
    }
    
    res.json(rates);
  } catch (error) {
    console.error('Error in POST /rates:', error);
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

router.get('/rates/bank/:bankId', async (req, res) => {
  try {
    const rates = await mongoDBService.getRatesByBank(req.params.bankId);
    console.log(`Fetched ${rates.length} rates for bank with id ${req.params.bankId}`);
    res.json(rates);
  } catch (error) {
    console.error('Error fetching rates by bank:', error);
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

router.get('/rates/top', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const termMonths = req.query.term ? parseInt(req.query.term as string) : undefined;

    const topRates = await mongoDBService.getTopRates(limit, termMonths);
    console.log(`Fetched top ${topRates.length} rates${termMonths ? ` for term ${termMonths} months` : ''}`);
    res.json(topRates);
  } catch (error) {
    console.error('Error fetching top rates:', error);
    res.status(500).json({ error: 'Failed to fetch top rates' });
  }
});

// ===== UPDATES ENDPOINTS =====
router.get('/updates', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
    const updates = await mongoDBService.getUpdates(limit);
    console.log(`Fetched ${updates.length} updates with limit ${limit}`);
    res.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
});

// ===== DIVIDEND DATA ENDPOINTS =====
router.get('/dividends', async (req, res) => {
  try {
    const dividendData = await sheetsService.getDividendData();
    res.json(dividendData);
  } catch (error) {
    console.error('Error fetching dividend data:', error);
    res.status(500).json({ error: 'Failed to fetch dividend data' });
  }
});

export default router;


export async function registerRoutes(app: Express): Promise<Server> {

  // API routes prefix
  const apiPrefix = "/api";

  app.use(apiPrefix, router); // Use the new router for API routes

  app.get('/api/analytics', async (_req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
  });


  const httpServer = createServer(app);
  return httpServer;
}