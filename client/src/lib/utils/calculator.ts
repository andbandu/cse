export type PayoutOption = 'maturity' | 'monthly' | 'yearly';

export function calculateFixedDeposit(
  amount: number,
  interestRate: number,
  termMonths: number,
  taxRate: number,
  payoutOption: PayoutOption = 'maturity'
) {
  // Convert annual interest rate to monthly
  const monthlyRate = interestRate / 100 / 12;

  let interest: number;
  let monthlyPayouts: number[] = [];
  let yearlyPayouts: number[] = [];

  if (payoutOption === 'maturity') {
    // Simple interest calculation for fixed deposit paid at maturity
    interest = amount * monthlyRate * termMonths;
  } else if (payoutOption === 'monthly') {
    // Monthly payout calculation
    interest = 0;

    // Calculate monthly interest payouts
    for (let month = 1; month <= termMonths; month++) {
      const monthlyInterest = amount * monthlyRate;
      interest += monthlyInterest;
      monthlyPayouts.push(monthlyInterest);
    }
  } else if (payoutOption === 'yearly') {
    interest = 0;
    const fullYears = Math.floor(termMonths / 12);
    const remainingMonths = termMonths % 12;
    
    // Calculate for full years
    const yearlyInterest = amount * monthlyRate * 12;
    for (let year = 1; year <= fullYears; year++) {
      interest += yearlyInterest;
      yearlyPayouts.push(yearlyInterest);
    }
    
    // Add remaining months if any
    if (remainingMonths > 0) {
      const remainingInterest = amount * monthlyRate * remainingMonths;
      interest += remainingInterest;
      if (fullYears === 0) {
        yearlyPayouts.push(remainingInterest);
      }
    }
  }


  // Calculate final amount
  const finalAmount = amount + interest;

  // Calculate tax amount
  const taxAmount = interest * (taxRate / 100);

  // Calculate after-tax amount
  const afterTaxAmount = finalAmount - taxAmount;

  return {
    initialAmount: amount,
    totalInterest: interest,
    finalAmount: finalAmount,
    taxAmount: taxAmount,
    afterTaxAmount: afterTaxAmount,
    monthlyInterest: monthlyPayouts.length > 0 ? monthlyPayouts[0] : 0,
    yearlyInterest: yearlyPayouts.length > 0 ? yearlyPayouts[0] : 0,
    monthlyPayouts: monthlyPayouts,
    yearlyPayouts: yearlyPayouts
  };
}