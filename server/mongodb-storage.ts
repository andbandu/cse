import { 
  Bank, InsertBank,
  Rate, InsertRate,
  Update, InsertUpdate,
  User, InsertUser
} from "@shared/fd-schema";
import { IStorage } from "./fd-storage";
import { mongoDBService } from "./services/mongodb";
import { MongoClient, ObjectId } from 'mongodb';

export class MongoDBStorage implements IStorage {
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
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    // Implementation would be added when user functionality is required
    throw new Error("Method not implemented");
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Implementation would be added when user functionality is required
    throw new Error("Method not implemented");
  }

  async createUser(user: InsertUser): Promise<User> {
    // Implementation would be added when user functionality is required
    throw new Error("Method not implemented");
  }

  async getAllBanks(): Promise<Bank[]> {
    return await mongoDBService.getBanks();
  }

  async getBank(id: number): Promise<Bank | undefined> {
    const bank = await mongoDBService.getBank(id);
    return bank || undefined;
  }

  async createBank(bank: InsertBank): Promise<Bank> {
    try {
      const collection = this.db.collection('banks');
      // Generate a new ID since MongoDB uses ObjectId
      const maxIdResult = await collection.find({}).sort({ id: -1 }).limit(1).toArray();
      const nextId = maxIdResult.length > 0 ? maxIdResult[0].id + 1 : 1;
      
      const newBank = {
        ...bank,
        id: nextId
      };
      
      const result = await collection.insertOne(newBank);
      if (!result.acknowledged) {
        throw new Error("Failed to insert bank");
      }
      
      return {
        ...newBank,
        id: nextId
      } as Bank;
    } catch (error) {
      console.error('Error creating bank:', error);
      throw error;
    }
  }

  async getAllRates(): Promise<Rate[]> {
    return await mongoDBService.getAllRates();
  }

  async getRatesByBank(bankId: number): Promise<Rate[]> {
    return await mongoDBService.getRatesByBank(bankId);
  }

  async getRatesByTerm(termMonths: number): Promise<Rate[]> {
    return await mongoDBService.getRatesByTerm(termMonths);
  }

  async getRatesByTermAndMinAmount(termMonths: number, minAmount: number): Promise<Rate[]> {
    return await mongoDBService.getRatesByTermAndMinAmount(termMonths, minAmount);
  }

  async getTopRates(limit: number, termMonths?: number): Promise<Rate[]> {
    return await mongoDBService.getTopRates(limit, termMonths);
  }

  async createRate(rate: InsertRate): Promise<Rate> {
    try {
      const collection = this.db.collection('rates');
      // Generate a new ID
      const maxIdResult = await collection.find({}).sort({ id: -1 }).limit(1).toArray();
      const nextId = maxIdResult.length > 0 ? maxIdResult[0].id + 1 : 1;
      
      const newRate = {
        ...rate,
        id: nextId
      };
      
      const result = await collection.insertOne(newRate);
      if (!result.acknowledged) {
        throw new Error("Failed to insert rate");
      }
      
      return {
        ...newRate,
        id: nextId
      } as Rate;
    } catch (error) {
      console.error('Error creating rate:', error);
      throw error;
    }
  }

  async getAllUpdates(): Promise<Update[]> {
    const updates = await mongoDBService.getUpdates(100); // Get all updates with a high limit
    return updates;
  }

  async getLatestUpdates(limit: number): Promise<Update[]> {
    return await mongoDBService.getUpdates(limit);
  }

  async createUpdate(update: InsertUpdate): Promise<Update> {
    try {
      const collection = this.db.collection('updates');
      // Generate a new ID
      const maxIdResult = await collection.find({}).sort({ id: -1 }).limit(1).toArray();
      const nextId = maxIdResult.length > 0 ? maxIdResult[0].id + 1 : 1;
      
      const newUpdate = {
        ...update,
        id: nextId
      };
      
      const result = await collection.insertOne(newUpdate);
      if (!result.acknowledged) {
        throw new Error("Failed to insert update");
      }
      
      return {
        ...newUpdate,
        id: nextId
      } as Update;
    } catch (error) {
      console.error('Error creating update:', error);
      throw error;
    }
  }
}

// Export an instance of the MongoDB storage
export const mongoStorage = new MongoDBStorage();

// Initialize the connection when the module is loaded
(async () => {
  try {
    await mongoStorage.connect();
    console.log('MongoDB storage initialized and connected');
  } catch (error) {
    console.error('Failed to connect MongoDB storage:', error);
  }
})();