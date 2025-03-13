export type PayoutOption = 'maturity' | 'monthly';

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
  
  if (payoutOption === 'maturity') {
    // Simple interest calculation for fixed deposit paid at maturity
    interest = amount * monthlyRate * termMonths;
  } else {
    // Monthly payout calculation
    interest = 0;
    
    // Calculate monthly interest payouts
    for (let month = 1; month <= termMonths; month++) {
      const monthlyInterest = amount * monthlyRate;
      interest += monthlyInterest;
      monthlyPayouts.push(monthlyInterest);
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
    monthlyInterest: payoutOption === 'monthly' ? interest / termMonths : 0,
    monthlyPayouts: monthlyPayouts
  };
}
