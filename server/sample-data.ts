
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fd_rates';
const DB_NAME = 'fd_rates';

const sampleBanks = [
  {
    name: "Commercial Bank of Ceylon PLC",
    shortName: "ComBank",
    description: "Commercial Bank of Ceylon PLC is one of the leading banks in Sri Lanka with a strong presence across the country.",
    established: 1969,
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
    logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    website: "https://www.boc.lk",
    category: "bank",
    regulatedBy: "CBSL",
    status: "active"
  },
  {
    name: "Central Finance Company PLC",
    shortName: "CF",
    description: "Central Finance Company PLC is a leading finance company in Sri Lanka offering various financial services.",
    established: 1957,
    logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    website: "https://www.centralfinance.lk",
    category: "finance",
    regulatedBy: "CBSL",
    status: "active"
  }
];

const sampleRates = [
  {
    bankId: "1", // Will be replaced with actual bank _id
    bankName: "Commercial Bank of Ceylon PLC",
    termMonths: 3,
    interestRate: 12.5,
    minDeposit: 10000,
    maxDeposit: 10000000,
    specialConditions: "Senior citizens receive an additional 0.5% interest",
    lastUpdated: new Date("2023-05-15")
  },
  {
    bankId: "1", // Will be replaced with actual bank _id
    bankName: "Commercial Bank of Ceylon PLC",
    termMonths: 6,
    interestRate: 13.5,
    minDeposit: 10000,
    lastUpdated: new Date("2023-05-15")
  },
  {
    bankId: "1", // Will be replaced with actual bank _id
    bankName: "Commercial Bank of Ceylon PLC",
    termMonths: 12,
    interestRate: 14.25,
    minDeposit: 10000,
    lastUpdated: new Date("2023-05-15")
  },
  {
    bankId: "2", // Will be replaced with actual bank _id
    bankName: "Hatton National Bank PLC",
    termMonths: 3,
    interestRate: 12.75,
    minDeposit: 25000,
    lastUpdated: new Date("2023-05-16")
  },
  {
    bankId: "2", // Will be replaced with actual bank _id
    bankName: "Hatton National Bank PLC",
    termMonths: 6,
    interestRate: 13.75,
    minDeposit: 25000,
    lastUpdated: new Date("2023-05-16")
  },
  {
    bankId: "2", // Will be replaced with actual bank _id
    bankName: "Hatton National Bank PLC",
    termMonths: 12,
    interestRate: 14.5,
    minDeposit: 25000,
    lastUpdated: new Date("2023-05-16")
  },
  {
    bankId: "3", // Will be replaced with actual bank _id
    bankName: "People's Bank",
    termMonths: 3,
    interestRate: 12.25,
    minDeposit: 5000,
    lastUpdated: new Date("2023-05-14")
  },
  {
    bankId: "3", // Will be replaced with actual bank _id
    bankName: "People's Bank",
    termMonths: 6,
    interestRate: 13.25,
    minDeposit: 5000,
    lastUpdated: new Date("2023-05-14")
  },
  {
    bankId: "3", // Will be replaced with actual bank _id
    bankName: "People's Bank",
    termMonths: 12,
    interestRate: 14.0,
    minDeposit: 5000,
    lastUpdated: new Date("2023-05-14")
  },
  {
    bankId: "4", // Will be replaced with actual bank _id
    bankName: "Bank of Ceylon",
    termMonths: 3,
    interestRate: 12.0,
    minDeposit: 5000,
    lastUpdated: new Date("2023-05-13")
  },
  {
    bankId: "4", // Will be replaced with actual bank _id
    bankName: "Bank of Ceylon",
    termMonths: 6,
    interestRate: 13.0,
    minDeposit: 5000,
    lastUpdated: new Date("2023-05-13")
  },
  {
    bankId: "4", // Will be replaced with actual bank _id
    bankName: "Bank of Ceylon",
    termMonths: 12,
    interestRate: 13.75,
    minDeposit: 5000,
    lastUpdated: new Date("2023-05-13")
  },
  {
    bankId: "5", // Will be replaced with actual bank _id
    bankName: "Central Finance Company PLC",
    termMonths: 3,
    interestRate: 14.0,
    minDeposit: 10000,
    lastUpdated: new Date("2023-05-17")
  },
  {
    bankId: "5", // Will be replaced with actual bank _id
    bankName: "Central Finance Company PLC",
    termMonths: 6,
    interestRate: 15.0,
    minDeposit: 10000,
    lastUpdated: new Date("2023-05-17")
  },
  {
    bankId: "5", // Will be replaced with actual bank _id
    bankName: "Central Finance Company PLC",
    termMonths: 12,
    interestRate: 15.5,
    minDeposit: 10000,
    lastUpdated: new Date("2023-05-17")
  }
];

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
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB for seeding data');
    
    const db = client.db(DB_NAME);
    
    // Clear existing data
    await db.collection('banks').deleteMany({});
    await db.collection('rates').deleteMany({});
    await db.collection('updates').deleteMany({});
    
    // Insert banks
    const banksResult = await db.collection('banks').insertMany(sampleBanks);
    console.log(`${banksResult.insertedCount} banks inserted`);
    
    // Get bank IDs
    const banks = await db.collection('banks').find().toArray();
    
    // Update rates with actual bank IDs
    const rates = sampleRates.map((rate, index) => {
      const bankIndex = Math.floor(index / 3);
      return {
        ...rate,
        bankId: banks[bankIndex]._id.toString()
      };
    });
    
    // Insert rates
    const ratesResult = await db.collection('rates').insertMany(rates);
    console.log(`${ratesResult.insertedCount} rates inserted`);
    
    // Insert updates
    const updatesResult = await db.collection('updates').insertMany(sampleUpdates);
    console.log(`${updatesResult.insertedCount} updates inserted`);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Execute seeding if this file is run directly
if (require.main === module) {
  seedDatabase()
    .then(() => console.log('Seeding completed'))
    .catch(err => console.error('Seeding failed:', err));
}

export { seedDatabase, sampleBanks, sampleRates, sampleUpdates };
