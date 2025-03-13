import { MongoClient, ObjectId } from 'mongodb';
import type { Bank, Rate, Update } from '../shared/types';

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

  async getBank(id: string): Promise<Bank | null> {
    try {
      const collection = this.db.collection('banks');
      const _id = new ObjectId(id);
      return await collection.findOne({ _id });
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

  async getRatesByBank(bankId: string): Promise<Rate[]> {
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