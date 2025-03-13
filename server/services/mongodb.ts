
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

  // Initialize the database with sample data if collections are empty
  async initSampleData(): Promise<void> {
    try {
      await this.connect();
      const db = this.client.db(DB_NAME);
      
      // Check if banks collection is empty
      const banksCount = await db.collection('banks').countDocuments();
      if (banksCount === 0) {
        console.log('Initializing MongoDB with sample bank data...');
        
        // Sample bank data
        const banks = [
          {
            name: "Commercial Bank of Ceylon PLC",
            shortName: "ComBank",
            description: "Commercial Bank of Ceylon PLC is one of the leading banks in Sri Lanka with a strong presence across the country.",
            established: 1969,
            minDeposit: "25000",
            updatedAt: new Date(),
            logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            website: "https://www.combank.lk",
            category: "bank",
            regulatedBy: "CBSL",
            status: "active"
          },
          {
            name: "Hatton National Bank PLC",
            shortName: "HNB",
            description: "Hatton National Bank PLC is one of the largest private sector commercial banks in Sri Lanka.",
            established: 1888,
            minDeposit: "50000",
            updatedAt: new Date(),
            logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            website: "https://www.hnb.net",
            category: "bank",
            regulatedBy: "CBSL",
            status: "active"
          },
          {
            name: "People's Bank",
            shortName: "PB",
            description: "People's Bank is a state-owned commercial bank in Sri Lanka focusing on retail and development banking.",
            established: 1961,
            minDeposit: "5000",
            updatedAt: new Date(),
            logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            website: "https://www.peoplesbank.lk",
            category: "bank",
            regulatedBy: "CBSL",
            status: "active"
          },
          {
            name: "Bank of Ceylon",
            shortName: "BOC",
            description: "Bank of Ceylon is a state-owned commercial bank with a wide network across Sri Lanka.",
            established: 1939,
            minDeposit: "5000",
            updatedAt: new Date(),
            logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            website: "https://www.boc.lk",
            category: "bank",
            regulatedBy: "CBSL",
            status: "active"
          },
          {
            name: "Central Finance Company PLC",
            shortName: "CF",
            description: "Central Finance Company PLC is a leading financial institution offering fixed deposits with competitive rates.",
            established: 1957,
            minDeposit: "10000",
            updatedAt: new Date(),
            logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            website: "https://www.centralfinance.lk",
            category: "finance",
            regulatedBy: "CBSL",
            status: "active"
          }
        ];
        
        // Insert sample banks
        await db.collection('banks').insertMany(banks);
        console.log(`Added ${banks.length} sample banks to MongoDB`);
        
        // Get inserted bank IDs
        const insertedBanks = await db.collection('banks').find().toArray();
        
        // Sample rates data
        const rates = [];
        for (const bank of insertedBanks) {
          const bankId = bank._id.toString();
          const bankName = bank.name;
          
          // Create rates for each bank
          const termMonths = [3, 6, 12, 24];
          for (const term of termMonths) {
            // Generate a random interest rate between 12 and 15.5
            const baseRate = 12.0;
            const randomAddition = Math.random() * 3.5;
            const interestRate = (baseRate + randomAddition).toFixed(2);
            
            rates.push({
              bankId,
              bankName,
              termMonths: term,
              interestRate: parseFloat(interestRate),
              minDeposit: bank.minDeposit,
              lastUpdated: new Date()
            });
          }
        }
        
        // Insert sample rates
        if (rates.length > 0) {
          await db.collection('rates').insertMany(rates);
          console.log(`Added ${rates.length} sample rates to MongoDB`);
        }
        
        // Sample updates data
        const updates = [
          {
            title: "Interest Rates Expected to Rise in Q3",
            content: "Financial analysts predict interest rates for fixed deposits to increase during the third quarter due to policy changes.",
            category: "Market Analysis",
            imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            date: new Date()
          },
          {
            title: "New Tax Benefits for Fixed Deposit Holders",
            content: "The government has announced new tax incentives for fixed deposit holders to encourage long-term savings.",
            category: "Regulations",
            imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
          },
          {
            title: "How to Choose the Best Fixed Deposit",
            content: "Our guide to selecting the most suitable fixed deposit based on your financial goals and time horizon.",
            category: "Guides",
            imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
          }
        ];
        
        // Insert sample updates
        await db.collection('updates').insertMany(updates);
        console.log(`Added ${updates.length} sample updates to MongoDB`);
      } else {
        console.log(`MongoDB already has ${banksCount} banks - skipping sample data initialization`);
      }
    } catch (error) {
      console.error('Failed to initialize sample data:', error);
    }
  }
}

export const mongoDBService = new MongoDBService();
