
import { MongoClient } from 'mongodb';
import { Bank, Rate, Update } from '@shared/types';

const DB_NAME = 'fd-rates';
// Cache MongoDB connection to prevent multiple connections
let client: MongoClient | null = null;

class MongoDBService {
  private client: MongoClient | null = null;

  async connect(): Promise<MongoClient> {
    if (client) {
      return client;
    }

    try {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
      client = new MongoClient(uri);
      await client.connect();
      console.log('Connected to MongoDB successfully');
      this.client = client;
      return client;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }

  async getBanks(): Promise<Bank[]> {
    try {
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('banks');
      return await collection.find({}).toArray() as unknown as Bank[];
    } catch (error) {
      console.error('Failed to fetch banks from MongoDB:', error);
      throw new Error('Failed to fetch banks data');
    }
  }

  async getBank(id: string | number): Promise<Bank | null> {
    try {
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('banks');
      // Handle both string IDs and numeric IDs
      const query = typeof id === 'string' ? { _id: id } : { id: Number(id) };
      return await collection.findOne(query) as unknown as Bank;
    } catch (error) {
      console.error('Failed to fetch bank from MongoDB:', error);
      throw new Error('Failed to fetch bank data');
    }
  }

  async getAllRates(): Promise<Rate[]> {
    try {
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('rates');
      return await collection.find({}).toArray() as unknown as Rate[];
    } catch (error) {
      console.error('Failed to fetch rates from MongoDB:', error);
      throw new Error('Failed to fetch rates data');
    }
  }

  async getRatesByBank(bankId: string | number): Promise<Rate[]> {
    try {
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('rates');
      // Handle both string IDs and numeric IDs
      const query = typeof bankId === 'string' ? { bankId } : { bankId: Number(bankId) };
      return await collection.find(query).toArray() as unknown as Rate[];
    } catch (error) {
      console.error('Failed to fetch rates from MongoDB:', error);
      throw new Error('Failed to fetch rates data');
    }
  }

  async getRatesByTerm(termMonths: number): Promise<Rate[]> {
    try {
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('rates');
      return await collection.find({ termMonths }).toArray() as unknown as Rate[];
    } catch (error) {
      console.error('Failed to fetch rates from MongoDB:', error);
      throw new Error('Failed to fetch rates data');
    }
  }

  async getRatesByTermAndMinAmount(termMonths: number, minAmount: number): Promise<Rate[]> {
    try {
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('rates');
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
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('rates');
      
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
      const client = await this.connect();
      const collection = client.db(DB_NAME).collection('updates');
      return await collection
        .find({})
        .sort({ date: -1 })
        .limit(limit)
        .toArray() as unknown as Update[];
    } catch (error) {
      console.error('Failed to fetch updates from MongoDB:', error);
      throw new Error('Failed to fetch updates data');
    }
  }

  // Helper method to seed data if needed
  async seedData(collection: string, data: any[]) {
    try {
      const client = await this.connect();
      const db = client.db(DB_NAME);
      // Check if data exists first
      const count = await db.collection(collection).countDocuments({});
      if (count === 0) {
        console.log(`Seeding ${collection} collection...`);
        await db.collection(collection).insertMany(data);
        console.log(`Successfully seeded ${collection} collection with ${data.length} documents`);
      } else {
        console.log(`Collection ${collection} already has data, skipping seed.`);
      }
    } catch (error) {
      console.error(`Failed to seed ${collection} collection:`, error);
    }
  }
}

export const mongoDBService = new MongoDBService();
