
import { useState } from "react";
import { PayoutOption, calculateFixedDeposit } from "@/lib/utils/calculator";

export function useCalculator() {
  const [amount, setAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [term, setTerm] = useState(12);
  const [tax, setTax] = useState(15);
  const [payoutOption, setPayoutOption] = useState<PayoutOption>("maturity");

  const result = calculateFixedDeposit(amount, interestRate, term, tax, payoutOption);

  const formatCurrency = (value: number): string => {
    return `Rs. ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return {
    amount,
    interestRate,
    term,
    tax,
    payoutOption,
    totalInterest: result.totalInterest,
    finalAmount: result.finalAmount,
    afterTaxAmount: result.afterTaxAmount,
    taxAmount: result.taxAmount,
    monthlyInterest: result.monthlyInterest,
    yearlyInterest: result.yearlyInterest,
    setAmount,
    setInterestRate,
    setTerm,
    setTax,
    setPayoutOption,
    formatCurrency
  };
}
