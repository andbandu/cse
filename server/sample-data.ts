// Sample data for the application
// Used for seeding the MongoDB database if it's empty
// Also used as fallback when MongoDB connection fails

import { Bank, Rate, Update } from '@shared/types';

// Sample bank data
export const sampleBanks: Bank[] = [
  {
    id: 1,
    name: 'SBI Bank',
    code: 'SBI',
    logo: '/images/banks/sbi.png',
    description: 'State Bank of India (SBI) is an Indian multinational public sector bank and financial services statutory body.',
    website: 'https://sbi.co.in',
    rating: 4.5,
    popularity: 95
  },
  {
    id: 2,
    name: 'HDFC Bank',
    code: 'HDFC',
    logo: '/images/banks/hdfc.png',
    description: 'HDFC Bank Limited is an Indian banking and financial services company.',
    website: 'https://www.hdfcbank.com',
    rating: 4.7,
    popularity: 90
  },
  {
    id: 3,
    name: 'ICICI Bank',
    code: 'ICICI',
    logo: '/images/banks/icici.png',
    description: 'ICICI Bank is an Indian multinational banking and financial services company.',
    website: 'https://www.icicibank.com',
    rating: 4.3,
    popularity: 85
  },
  {
    id: 4,
    name: 'Axis Bank',
    code: 'AXIS',
    logo: '/images/banks/axis.png',
    description: 'Axis Bank is the third-largest of the private-sector banks in India.',
    website: 'https://www.axisbank.com',
    rating: 4.2,
    popularity: 80
  },
  {
    id: 5,
    name: 'Kotak Mahindra Bank',
    code: 'KOTAK',
    logo: '/images/banks/kotak.png',
    description: 'Kotak Mahindra Bank is an Indian private sector bank.',
    website: 'https://www.kotak.com',
    rating: 4.4,
    popularity: 78
  }
];

// Sample rate data
export const sampleRates: Rate[] = [
  {
    id: 1,
    bankId: 1,
    term: 12,
    rate: 7.5,
    minAmount: 10000,
    maxAmount: 10000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 2,
    bankId: 1,
    term: 24,
    rate: 7.8,
    minAmount: 10000,
    maxAmount: 10000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 3,
    bankId: 2,
    term: 12,
    rate: 7.6,
    minAmount: 25000,
    maxAmount: 20000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 4,
    bankId: 2,
    term: 24,
    rate: 8.0,
    minAmount: 25000,
    maxAmount: 20000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 5,
    bankId: 3,
    term: 12,
    rate: 7.4,
    minAmount: 10000,
    maxAmount: 15000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 6,
    bankId: 3,
    term: 24,
    rate: 7.7,
    minAmount: 10000,
    maxAmount: 15000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 7,
    bankId: 4,
    term: 12,
    rate: 7.55,
    minAmount: 5000,
    maxAmount: 10000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 8,
    bankId: 4,
    term: 24,
    rate: 7.85,
    minAmount: 5000,
    maxAmount: 10000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 9,
    bankId: 5,
    term: 12,
    rate: 7.65,
    minAmount: 10000,
    maxAmount: 10000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  },
  {
    id: 10,
    bankId: 5,
    term: 24,
    rate: 7.95,
    minAmount: 10000,
    maxAmount: 10000000,
    seniorCitizen: false,
    specialRate: false,
    payoutOptions: ['monthly', 'quarterly', 'annually', 'maturity']
  }
];

// Sample update data
export const sampleUpdates: Update[] = [
  {
    id: 1,
    title: 'SBI increases FD rates',
    description: 'State Bank of India has increased fixed deposit rates by 0.25%',
    date: new Date('2023-01-15').toISOString(),
    bankId: 1
  },
  {
    id: 2,
    title: 'HDFC Bank launches new FD scheme',
    description: 'HDFC Bank introduces special FD scheme with 7.8% interest rate',
    date: new Date('2023-02-10').toISOString(),
    bankId: 2
  },
  {
    id: 3,
    title: 'ICICI Bank revises FD rates',
    description: 'ICICI Bank has revised FD rates for different tenure deposits',
    date: new Date('2023-03-05').toISOString(),
    bankId: 3
  },
  {
    id: 4,
    title: 'Axis Bank announces special scheme for senior citizens',
    description: 'Axis Bank offers additional 0.5% interest rate for senior citizens',
    date: new Date('2023-03-20').toISOString(),
    bankId: 4
  },
  {
    id: 5,
    title: 'Kotak Mahindra Bank reduces minimum deposit amount',
    description: 'Kotak Mahindra Bank reduces minimum FD amount to ₹5,000',
    date: new Date('2023-04-15').toISOString(),
    bankId: 5
  }
];