import { 
    Bank, InsertBank, 
    Rate, InsertRate, 
    Update, InsertUpdate,
    User, InsertUser
  } from "@shared/fd-schema";
  
  export interface IStorage {
    getUser(id: number): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    createUser(user: InsertUser): Promise<User>;
  
    // Bank methods
    getAllBanks(): Promise<Bank[]>;
    getBank(id: number): Promise<Bank | undefined>;
    createBank(bank: InsertBank): Promise<Bank>;
  
    // Rate methods
    getAllRates(): Promise<Rate[]>;
    getRatesByBank(bankId: number): Promise<Rate[]>;
    getRatesByTerm(termMonths: number): Promise<Rate[]>;
    getRatesByTermAndMinAmount(termMonths: number, minAmount: number): Promise<Rate[]>;
    getTopRates(limit: number, termMonths?: number): Promise<Rate[]>;
    createRate(rate: InsertRate): Promise<Rate>;
  
    // Update methods
    getAllUpdates(): Promise<Update[]>;
    getLatestUpdates(limit: number): Promise<Update[]>;
    createUpdate(update: InsertUpdate): Promise<Update>;
  }
  
  export class MemStorage implements IStorage {
    private users: Map<number, User>;
    private banks: Map<number, Bank>;
    private rates: Map<number, Rate>;
    private updates: Map<number, Update>;
    
    userCurrentId: number;
    bankCurrentId: number;
    rateCurrentId: number;
    updateCurrentId: number;
  
    constructor() {
      this.users = new Map();
      this.banks = new Map();
      this.rates = new Map();
      this.updates = new Map();
      
      this.userCurrentId = 1;
      this.bankCurrentId = 1;
      this.rateCurrentId = 1;
      this.updateCurrentId = 1;
      
      // Initialize with sample data
      this.initializeSampleData();
    }
  
    // User methods
    async getUser(id: number): Promise<User | undefined> {
      return this.users.get(id);
    }
  
    async getUserByUsername(username: string): Promise<User | undefined> {
      return Array.from(this.users.values()).find(
        (user) => user.username === username,
      );
    }
  
    async createUser(insertUser: InsertUser): Promise<User> {
      const id = this.userCurrentId++;
      const user: User = { ...insertUser, id };
      this.users.set(id, user);
      return user;
    }
  
    // Bank methods
    async getAllBanks(): Promise<Bank[]> {
      return Array.from(this.banks.values());
    }
  
    async getBank(id: number): Promise<Bank | undefined> {
      return this.banks.get(id);
    }
  
    async createBank(insertBank: InsertBank): Promise<Bank> {
      const id = this.bankCurrentId++;
      const bank: Bank = { ...insertBank, id };
      this.banks.set(id, bank);
      return bank;
    }
  
    // Rate methods
    async getAllRates(): Promise<Rate[]> {
      return Array.from(this.rates.values());
    }
  
    async getRatesByBank(bankId: number): Promise<Rate[]> {
      return Array.from(this.rates.values()).filter(
        (rate) => rate.bankId === bankId,
      );
    }
  
    async getRatesByTerm(termMonths: number): Promise<Rate[]> {
      return Array.from(this.rates.values()).filter(
        (rate) => rate.termMonths === termMonths,
      );
    }
  
    async getRatesByTermAndMinAmount(termMonths: number, minAmount: number): Promise<Rate[]> {
      return Array.from(this.rates.values()).filter(
        (rate) => rate.termMonths === termMonths && Number(rate.minDeposit) <= minAmount,
      );
    }
  
    async getTopRates(limit: number, termMonths?: number): Promise<Rate[]> {
      let filteredRates = Array.from(this.rates.values());
      
      if (termMonths) {
        filteredRates = filteredRates.filter(rate => rate.termMonths === termMonths);
      }
      
      // Sort by interest rate in descending order
      filteredRates.sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
      
      return filteredRates.slice(0, limit);
    }
  
    async createRate(insertRate: InsertRate): Promise<Rate> {
      const id = this.rateCurrentId++;
      const rate: Rate = { ...insertRate, id };
      this.rates.set(id, rate);
      return rate;
    }
  
    // Update methods
    async getAllUpdates(): Promise<Update[]> {
      return Array.from(this.updates.values());
    }
  
    async getLatestUpdates(limit: number): Promise<Update[]> {
      const updates = Array.from(this.updates.values());
      updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return updates.slice(0, limit);
    }
  
    async createUpdate(insertUpdate: InsertUpdate): Promise<Update> {
      const id = this.updateCurrentId++;
      const update: Update = { ...insertUpdate, id };
      this.updates.set(id, update);
      return update;
    }
  
    // Initialize sample data for development
    private initializeSampleData() {
      // Sample banks
      const banks: InsertBank[] = [
        {
          name: "Commercial Bank of Ceylon",
          shortName: "CBC",
          description: "Commercial Bank of Ceylon offers competitive fixed deposit rates for various term periods with a minimum deposit of Rs. 25,000.",
          minDeposit: "25000",
          updatedAt: new Date("2023-05-08")
        },
        {
          name: "Citizens Development Business Finance",
          shortName: "CDB",
          description: "CDB Finance offers some of the highest fixed deposit rates in Sri Lanka with a minimum deposit of Rs. 10,000.",
          minDeposit: "10000",
          updatedAt: new Date("2023-05-10")
        },
        {
          name: "Hatton National Bank",
          shortName: "HNB",
          description: "Hatton National Bank provides attractive fixed deposit rates with a minimum deposit of Rs. 50,000.",
          minDeposit: "50000",
          updatedAt: new Date("2023-05-12")
        },
        {
          name: "Bank of Ceylon",
          shortName: "BOC",
          description: "Bank of Ceylon offers competitive fixed deposit rates for various term periods with a minimum deposit of Rs. 10,000.",
          minDeposit: "10000",
          updatedAt: new Date("2023-05-05")
        },
        {
          name: "Pan Asia Banking Corporation",
          shortName: "PABC",
          description: "Pan Asia Banking Corporation provides attractive fixed deposit rates for various term periods.",
          minDeposit: "25000",
          updatedAt: new Date("2023-05-11")
        }
      ];
  
      // Insert banks
      banks.forEach(bank => {
        this.createBank(bank);
      });
  
      // Sample rates
      const rateData = [
        // CDB (id: 2) rates
        { bankId: 2, termMonths: 3, interestRate: "14.00", minDeposit: "10000", updatedAt: new Date("2023-05-10") },
        { bankId: 2, termMonths: 6, interestRate: "14.75", minDeposit: "10000", updatedAt: new Date("2023-05-10") },
        { bankId: 2, termMonths: 12, interestRate: "15.50", minDeposit: "10000", updatedAt: new Date("2023-05-10") },
        { bankId: 2, termMonths: 24, interestRate: "15.25", minDeposit: "10000", updatedAt: new Date("2023-05-10") },
        
        // CBC (id: 1) rates
        { bankId: 1, termMonths: 3, interestRate: "13.25", minDeposit: "25000", updatedAt: new Date("2023-05-08") },
        { bankId: 1, termMonths: 6, interestRate: "14.00", minDeposit: "25000", updatedAt: new Date("2023-05-08") },
        { bankId: 1, termMonths: 12, interestRate: "14.75", minDeposit: "25000", updatedAt: new Date("2023-05-08") },
        { bankId: 1, termMonths: 24, interestRate: "14.50", minDeposit: "25000", updatedAt: new Date("2023-05-08") },
        
        // HNB (id: 3) rates
        { bankId: 3, termMonths: 3, interestRate: "13.25", minDeposit: "50000", updatedAt: new Date("2023-05-12") },
        { bankId: 3, termMonths: 6, interestRate: "14.00", minDeposit: "50000", updatedAt: new Date("2023-05-12") },
        { bankId: 3, termMonths: 12, interestRate: "14.50", minDeposit: "50000", updatedAt: new Date("2023-05-12") },
        { bankId: 3, termMonths: 24, interestRate: "14.25", minDeposit: "50000", updatedAt: new Date("2023-05-12") },
        
        // BOC (id: 4) rates
        { bankId: 4, termMonths: 3, interestRate: "13.00", minDeposit: "10000", updatedAt: new Date("2023-05-05") },
        { bankId: 4, termMonths: 6, interestRate: "13.75", minDeposit: "10000", updatedAt: new Date("2023-05-05") },
        { bankId: 4, termMonths: 12, interestRate: "14.25", minDeposit: "10000", updatedAt: new Date("2023-05-05") },
        { bankId: 4, termMonths: 24, interestRate: "14.00", minDeposit: "10000", updatedAt: new Date("2023-05-05") },
        
        // PABC (id: 5) rates
        { bankId: 5, termMonths: 3, interestRate: "13.50", minDeposit: "25000", updatedAt: new Date("2023-05-11") },
        { bankId: 5, termMonths: 6, interestRate: "13.75", minDeposit: "25000", updatedAt: new Date("2023-05-11") },
        { bankId: 5, termMonths: 12, interestRate: "14.00", minDeposit: "25000", updatedAt: new Date("2023-05-11") },
        { bankId: 5, termMonths: 24, interestRate: "13.75", minDeposit: "25000", updatedAt: new Date("2023-05-11") }
      ];
  
      // Insert rates
      rateData.forEach(rate => {
        this.createRate(rate as InsertRate);
      });
  
      // Sample updates
      const updateData: InsertUpdate[] = [
        {
          title: "CDB Finance Increases Fixed Deposit Rates to 15.5%",
          content: "Citizens Development Business Finance has increased its 12-month fixed deposit rate to 15.5%, offering one of the highest returns in the market.",
          category: "Bank Rates",
          imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          date: new Date("2023-05-12")
        },
        {
          title: "Central Bank Holds Policy Rates Steady in May",
          content: "The Central Bank of Sri Lanka has decided to maintain its policy interest rates, signaling stability in the financial markets.",
          category: "Market Analysis",
          imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          date: new Date("2023-05-10")
        },
        {
          title: "How to Choose the Best Fixed Deposit for Your Needs",
          content: "Our comprehensive guide helps you navigate through the various fixed deposit options to find the one that best suits your financial goals.",
          category: "Guides",
          imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          date: new Date("2023-05-08")
        }
      ];
  
      // Insert updates
      updateData.forEach(update => {
        this.createUpdate(update);
      });
    }
  }
  
  export const fdstorage = new MemStorage();
  