
import { MongoDBStorage } from './mongodb-storage';
import dotenv from 'dotenv';

dotenv.config();

const sampleBanks = [
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

// Function to generate sample rates for a bank
const generateRatesForBank = async (storage: MongoDBStorage, bankId: string) => {
  const termMonths = [3, 6, 12, 24];
  const baseRates = {
    3: "13.25",
    6: "14.00",
    12: "14.75",
    24: "14.50"
  };
  
  // Add some variation to the rates
  const variationFactor = Math.random() * 1.5 - 0.75; // Between -0.75 and 0.75
  
  for (const term of termMonths) {
    const baseRate = parseFloat(baseRates[term]);
    const adjustedRate = (baseRate + variationFactor).toFixed(2);
    
    await storage.createRate({
      bankId,
      termMonths: term,
      interestRate: adjustedRate,
      minDeposit: sampleBanks.find(b => b._id === bankId)?.minDeposit || "10000",
      updatedAt: new Date()
    });
  }
};

// Sample updates
const sampleUpdates = [
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

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    
    const storage = new MongoDBStorage();
    await storage.connect();
    
    console.log("Connected to MongoDB successfully");
    
    // Add sample banks
    console.log("Adding sample banks...");
    const bankIds = [];
    for (const bank of sampleBanks) {
      const newBank = await storage.createBank(bank);
      bankIds.push(newBank.id);
      console.log(`Added bank: ${newBank.name}`);
    }
    
    // Add sample rates for each bank
    console.log("Adding sample rates...");
    for (const bankId of bankIds) {
      await generateRatesForBank(storage, bankId);
      console.log(`Added rates for bank ID: ${bankId}`);
    }
    
    // Add sample updates
    console.log("Adding sample updates...");
    for (const update of sampleUpdates) {
      await storage.createUpdate(update);
      console.log(`Added update: ${update.title}`);
    }
    
    console.log("Database seeding completed successfully!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
