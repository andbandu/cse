
// Sample data for the application
// Used for seeding the MongoDB database if it's empty

// Sample banks
export const sampleBanks = [
  {
    id: 1,
    name: "Commercial Bank of Ceylon PLC",
    code: "COMB",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/73/Commercial_Bank_of_Ceylon_logo.png",
    description: "Commercial Bank of Ceylon PLC is one of the leading commercial banks in Sri Lanka. The bank offers various fixed deposit options with competitive interest rates.",
    minDeposit: 10000,
    establishedYear: 1969,
    branches: 268,
    headquarters: "Colombo",
    website: "https://www.combank.lk",
    phone: "+94 11 2353535",
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Hatton National Bank PLC",
    code: "HNB",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9a/Hatton_National_Bank_logo.png",
    description: "Hatton National Bank PLC is one of the largest private sector commercial banks in Sri Lanka, with a nationwide network of branches and ATMs.",
    minDeposit: 25000,
    establishedYear: 1888,
    branches: 252,
    headquarters: "Colombo",
    website: "https://www.hnb.net",
    phone: "+94 11 2462462",
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "People's Bank",
    code: "PBSL",
    logo: "https://www.peoplesbank.lk/wp-content/themes/peoples/images/logo.png",
    description: "People's Bank is a state-owned commercial bank in Sri Lanka offering a wide range of services to retail and corporate customers.",
    minDeposit: 5000,
    establishedYear: 1961,
    branches: 737,
    headquarters: "Colombo",
    website: "https://www.peoplesbank.lk",
    phone: "+94 11 2481481",
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Sampath Bank PLC",
    code: "SAMP",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5d/Sampath_Bank_logo.png",
    description: "Sampath Bank PLC is a private sector bank in Sri Lanka known for its innovative banking solutions and customer-focused approach.",
    minDeposit: 10000,
    establishedYear: 1987,
    branches: 228,
    headquarters: "Colombo",
    website: "https://www.sampathbank.lk",
    phone: "+94 11 2303030",
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Bank of Ceylon",
    code: "BOC",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/64/Bank_of_Ceylon_logo.png",
    description: "Bank of Ceylon is a state-owned commercial bank with the largest branch network in Sri Lanka, offering a variety of financial services.",
    minDeposit: 5000,
    establishedYear: 1939,
    branches: 628,
    headquarters: "Colombo",
    website: "https://www.boc.lk",
    phone: "+94 11 2446790",
    updatedAt: new Date().toISOString()
  }
];

// Sample rates
export const sampleRates = [
  {
    id: 1,
    bankId: 1,
    bankName: "Commercial Bank of Ceylon PLC",
    termMonths: 3,
    interestRate: "12.5",
    minDeposit: "10000",
    maxDeposit: "10000000",
    specialConditions: "Senior citizens receive an additional 0.5% interest",
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    bankId: 1,
    bankName: "Commercial Bank of Ceylon PLC",
    termMonths: 6,
    interestRate: "13.5",
    minDeposit: "10000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    bankId: 1,
    bankName: "Commercial Bank of Ceylon PLC",
    termMonths: 12,
    interestRate: "14.25",
    minDeposit: "10000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    bankId: 2,
    bankName: "Hatton National Bank PLC",
    termMonths: 3,
    interestRate: "12.75",
    minDeposit: "25000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    bankId: 2,
    bankName: "Hatton National Bank PLC",
    termMonths: 6,
    interestRate: "13.75",
    minDeposit: "25000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    bankId: 2,
    bankName: "Hatton National Bank PLC",
    termMonths: 12,
    interestRate: "14.5",
    minDeposit: "25000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 7,
    bankId: 3,
    bankName: "People's Bank",
    termMonths: 3,
    interestRate: "12.0",
    minDeposit: "5000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 8,
    bankId: 3,
    bankName: "People's Bank",
    termMonths: 6,
    interestRate: "13.0",
    minDeposit: "5000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 9,
    bankId: 3,
    bankName: "People's Bank",
    termMonths: 12,
    interestRate: "14.0",
    minDeposit: "5000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 10,
    bankId: 4,
    bankName: "Sampath Bank PLC",
    termMonths: 3,
    interestRate: "12.6",
    minDeposit: "10000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 11,
    bankId: 4,
    bankName: "Sampath Bank PLC",
    termMonths: 6,
    interestRate: "13.6",
    minDeposit: "10000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 12,
    bankId: 4,
    bankName: "Sampath Bank PLC",
    termMonths: 12,
    interestRate: "14.85",
    minDeposit: "10000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 13,
    bankId: 5,
    bankName: "Bank of Ceylon",
    termMonths: 3,
    interestRate: "12.25",
    minDeposit: "5000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 14,
    bankId: 5,
    bankName: "Bank of Ceylon",
    termMonths: 6,
    interestRate: "13.25",
    minDeposit: "5000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  },
  {
    id: 15,
    bankId: 5,
    bankName: "Bank of Ceylon",
    termMonths: 12,
    interestRate: "14.75",
    minDeposit: "5000",
    maxDeposit: "10000000",
    updatedAt: new Date().toISOString()
  }
];

// Sample updates
export const sampleUpdates = [
  {
    id: 1,
    title: "Sampath Bank Increases Fixed Deposit Rates to 14.85%",
    content: "Sampath Bank has increased its 12-month fixed deposit rate to 14.85%, offering one of the highest returns in the market.",
    category: "Bank Rates",
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: new Date("2023-05-12").toISOString()
  },
  {
    id: 2,
    title: "Central Bank Holds Policy Rates Steady in May",
    content: "The Central Bank of Sri Lanka has decided to maintain its policy interest rates, signaling stability in the financial markets.",
    category: "Market Analysis",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: new Date("2023-05-10").toISOString()
  },
  {
    id: 3,
    title: "How to Choose the Best Fixed Deposit for Your Needs",
    content: "Our comprehensive guide helps you navigate through the various fixed deposit options to find the one that best suits your financial goals.",
    category: "Guides",
    imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: new Date("2023-05-08").toISOString()
  }
];
