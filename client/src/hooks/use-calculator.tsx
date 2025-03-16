import { useState } from "react";
import { PayoutOption, calculateFixedDeposit } from "@/lib/utils/calculator";

export function useCalculator() {
  const params = new URLSearchParams(window.location.search);
  const [amount, setAmount] = useState<number>(Number(params.get('amount')) || 100000);
  const [interestRate, setInterestRate] = useState<string>(params.get('rate') || "7.5");
  const [term, setTerm] = useState<number>(Number(params.get('term')) || 12);
  const [tax, setTax] = useState<string>("15.0");
  const [payoutOption, setPayoutOption] = useState<PayoutOption>((params.get('payout') as PayoutOption) || "maturity");
  
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [afterTaxAmount, setAfterTaxAmount] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [monthlyInterest, setMonthlyInterest] = useState<number>(0);

  const calculate = () => {
    // Parse input values as numbers
    const rateValue = parseFloat(interestRate) || 0;
    const taxValue = parseFloat(tax) || 0;
    
    // Perform calculation with payout option
    const result = calculateFixedDeposit(amount, rateValue, term, taxValue, payoutOption);
    
    // Update state with results
    setTotalInterest(result.totalInterest);
    setFinalAmount(result.finalAmount);
    setAfterTaxAmount(result.afterTaxAmount);
    setTaxAmount(result.taxAmount);
    setMonthlyInterest(result.monthlyInterest);
  };

  // Format currency values
  const formatCurrency = (value: number): string => {
    return `Rs. ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return {
    amount,
    interestRate,
    term,
    tax,
    payoutOption,
    totalInterest,
    finalAmount,
    afterTaxAmount,
    taxAmount,
    monthlyInterest,
    setAmount,
    setInterestRate,
    setTerm,
    setTax,
    setPayoutOption,
    calculate,
    formatCurrency
  };
}
