
import { MongoClient, ServerApiVersion, Collection } from 'mongodb';
import dotenv from 'dotenv';
import type { Bank, Rate, Update } from '@shared/fd-schema';
import NodeCache from 'node-cache';

// Load environment variables
dotenv.config();

// Cache configuration (30 seconds TTL)
const cache = new NodeCache({ stdTTL: 30 });

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fd_rates';
const DB_NAME = 'fd_rates';

export class MongoDBService {
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
      const banks = await collection.find().toArray() as unknown as Bank[];
      
      cache.set('banks', banks);
      return banks;
    } catch (error) {
      console.error('Failed to fetch banks from MongoDB:', error);
      throw new Error('Failed to fetch banks data');
    }
  }

  async getBank(id: number): Promise<Bank | null> {
    try {
      await this.connect();
      const collection = this.client.db(DB_NAME).collection('banks');
      return await collection.findOne({ id }) as unknown as Bank;
    } catch (error) {
      console.error('Failed to fetch bank from MongoDB:', error);
      throw new Error('Failed to fetch bank data');
    }
  }

  async getRatesByBank(bankId: number): Promise<Rate[]> {
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
        minDeposit: { $lte: minAmount.toString() } 
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
import { MongoClient } from 'mongodb';
import { Bank, Rate, Update } from '@shared/fd-schema';

class MongoDBService {
  private client: MongoClient;
  private db: any;

  constructor() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    this.client = new MongoClient(uri);
    this.db = this.client.db('fd-rates');
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async getBanks(): Promise<Bank[]> {
    try {
      const collection = this.db.collection('banks');
      return await collection.find({}).toArray();
    } catch (error) {
      console.error('Error fetching banks:', error);
      throw error;
    }
  }

  async getBank(id: number): Promise<Bank | null> {
    try {
      const collection = this.db.collection('banks');
      return await collection.findOne({ id });
    } catch (error) {
      console.error('Error fetching bank:', error);
      throw error;
    }
  }

  async getAllRates(): Promise<Rate[]> {
    try {
      const collection = this.db.collection('rates');
      return await collection.find({}).toArray();
    } catch (error) {
      console.error('Error fetching rates:', error);
      throw error;
    }
  }

  async getRatesByBank(bankId: number): Promise<Rate[]> {
    try {
      const collection = this.db.collection('rates');
      return await collection.find({ bankId }).toArray();
    } catch (error) {
      console.error('Error fetching rates by bank:', error);
      throw error;
    }
  }

  async getRatesByTerm(termMonths: number): Promise<Rate[]> {
    try {
      const collection = this.db.collection('rates');
      return await collection.find({ termMonths }).toArray();
    } catch (error) {
      console.error('Error fetching rates by term:', error);
      throw error;
    }
  }

  async getRatesByTermAndMinAmount(termMonths: number, minAmount: number): Promise<Rate[]> {
    try {
      const collection = this.db.collection('rates');
      return await collection.find({ 
        termMonths, 
        minDeposit: { $lte: minAmount.toString() } 
      }).toArray();
    } catch (error) {
      console.error('Error fetching rates by term and amount:', error);
      throw error;
    }
  }

  async getTopRates(limit: number, termMonths?: number): Promise<Rate[]> {
    try {
      const collection = this.db.collection('rates');
      let query = {};
      
      if (termMonths) {
        query = { termMonths };
      }
      
      return await collection.find(query)
        .sort({ interestRate: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error fetching top rates:', error);
      throw error;
    }
  }

  async getUpdates(limit: number): Promise<Update[]> {
    try {
      const collection = this.db.collection('updates');
      return await collection.find({})
        .sort({ date: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error fetching updates:', error);
      throw error;
    }
  }

  // Initialize the MongoDB service connection
  async init() {
    await this.connect();
  }
}

// Create and export an instance
const mongoDBService = new MongoDBService();

// Initialize connection
(async () => {
  try {
    await mongoDBService.init();
  } catch (error) {
    console.error('Failed to initialize MongoDB service:', error);
  }
})();

export { mongoDBService };
