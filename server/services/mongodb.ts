
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import type { Bank, Rate, Update } from '@shared/types';
import NodeCache from 'node-cache';

// Load environment variables
dotenv.config();

// Cache configuration (30 seconds TTL)
const cache = new NodeCache({ stdTTL: 30 });

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fd_rates';
const DB_NAME = 'fd_rates';

class MongoDBService {
  private client: MongoClient;
  private connected: boolean = false;
  
  constructor() {
    this.client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  async connect(): Promise<void> {
    if (!this.connected) {
      try {
        await this.client.connect();
        console.log('Connected to MongoDB');
        this.connected = true;
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
      }
    }
  }

  async getBanks(): Promise<Bank[]> {
    const cachedData = cache.get<Bank[]>('banks');
    if (cachedData) return cachedData;

    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('banks');
      const banksRaw = await collection.find().toArray();
      
      // Transform MongoDB _id to id for client consumption
      const banks = banksRaw.map(bank => {
        const { _id, ...rest } = bank;
        return { 
          id: _id.toString(), 
          ...rest 
        };
      }) as unknown as Bank[];
      
      cache.set('banks', banks);
      return banks;
    } catch (error) {
      console.error('Failed to fetch banks from MongoDB:', error);
      throw new Error('Failed to fetch banks data');
    }
  }

  async getBank(id: string): Promise<Bank | null> {
    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('banks');
      
      // Try to convert id to MongoDB ObjectId
      let bankId;
      try {
        const { ObjectId } = require('mongodb');
        bankId = new ObjectId(id);
      } catch (err) {
        // If conversion fails, use the string id
        bankId = id;
      }
      
      const bank = await collection.findOne({ _id: bankId });
      
      if (!bank) return null;
      
      // Transform MongoDB _id to id for client consumption
      const { _id, ...rest } = bank;
      return { 
        id: _id.toString(), 
        ...rest 
      } as unknown as Bank;
    } catch (error) {
      console.error('Failed to fetch bank from MongoDB:', error);
      throw new Error('Failed to fetch bank data');
    }
  }

  async getRatesByBank(bankId: string): Promise<Rate[]> {
    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('rates');
      return await collection.find({ bankId }).toArray() as unknown as Rate[];
    } catch (error) {
      console.error('Failed to fetch rates from MongoDB:', error);
      throw new Error('Failed to fetch rates data');
    }
  }

  async getAllRates(): Promise<Rate[]> {
    const cachedData = cache.get<Rate[]>('rates');
    if (cachedData) return cachedData;

    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('rates');
      const rates = await collection.find().toArray() as unknown as Rate[];
      
      cache.set('rates', rates);
      return rates;
    } catch (error) {
      console.error('Failed to fetch rates from MongoDB:', error);
      throw new Error('Failed to fetch rates data');
    }
  }

  async getRatesByTerm(termMonths: number): Promise<Rate[]> {
    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('rates');
      return await collection.find({ termMonths }).toArray() as unknown as Rate[];
    } catch (error) {
      console.error('Failed to fetch rates from MongoDB:', error);
      throw new Error('Failed to fetch rates data');
    }
  }

  async getRatesByTermAndMinAmount(termMonths: number, minAmount: number): Promise<Rate[]> {
    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('rates');
      return await collection.find({ 
        termMonths, 
        minDeposit: { $lte: minAmount } 
      }).toArray() as unknown as Rate[];
    } catch (error) {
      console.error('Failed to fetch rates from MongoDB:', error);
      throw new Error('Failed to fetch rates data');
    }
  }

  async getTopRates(limit: number, termMonths?: number): Promise<Rate[]> {
    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('rates');
      
      const query = termMonths ? { termMonths } : {};
      return await collection
        .find(query)
        .sort({ interestRate: -1 })
        .limit(limit)
        .toArray() as unknown as Rate[];
    } catch (error) {
      console.error('Failed to fetch top rates from MongoDB:', error);
      throw new Error('Failed to fetch top rates data');
    }
  }

  async getUpdates(limit: number): Promise<Update[]> {
    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('updates');
      return await collection
        .find()
        .sort({ date: -1 })
        .limit(limit)
        .toArray() as unknown as Update[];
    } catch (error) {
      console.error('Failed to fetch updates from MongoDB:', error);
      throw new Error('Failed to fetch updates data');
    }
  }

  // Helper method to close MongoDB connection
  async close(): Promise<void> {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
      console.log('MongoDB connection closed');
    }
  }
}

export const mongoDBService = new MongoDBService();
