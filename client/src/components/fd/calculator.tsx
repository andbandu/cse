import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculator } from "@/hooks/use-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Calculator() {
  const {
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
  } = useCalculator();

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-16 bg-gray-50 " id="calculator">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Fixed Deposit Calculator
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Calculate potential returns on your fixed deposit investment.
              </p>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="calc-amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Deposit Amount (LKR)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">Rs.</span>
                        </div>
                        <Input
                          type="text"
                          id="calc-amount"
                          className="pl-12"
                          placeholder="100,000"
                          value={amount === 0 ? "" : amount.toLocaleString()}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, "");
                            if (value === "" || !isNaN(Number(value))) {
                              setAmount(value === "" ? 0 : Number(value));
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="calc-interest" className="block text-sm font-medium text-gray-700 mb-1">
                        Interest Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          id="calc-interest"
                          placeholder="7.5"
                          value={interestRate}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || (!isNaN(Number(value)) && Number(value) <= 100)) {
                              setInterestRate(value);
                            }
                          }}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="calc-term" className="block text-sm font-medium text-gray-700 mb-1">
                        Term (Months)
                      </label>
                      <Select
                        value={term.toString()}
                        onValueChange={(val) => setTerm(Number(val))}
                      >
                        <SelectTrigger id="calc-term">
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 Months</SelectItem>
                          <SelectItem value="6">6 Months</SelectItem>
                          <SelectItem value="12">12 Months</SelectItem>
                          <SelectItem value="24">24 Months</SelectItem>
                          <SelectItem value="36">36 Months</SelectItem>
                          <SelectItem value="60">60 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="calc-tax" className="block text-sm font-medium text-gray-700 mb-1">
                        Withholding Tax (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          id="calc-tax"
                          placeholder="5.0"
                          value={tax}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || (!isNaN(Number(value)) && Number(value) <= 100)) {
                              setTax(value);
                            }
                          }}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payout Option
                      </label>
                      <RadioGroup 
                        value={payoutOption} 
                        onValueChange={(value) => setPayoutOption(value as 'maturity' | 'monthly')}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maturity" id="payout-maturity" />
                          <Label htmlFor="payout-maturity">At Maturity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="payout-monthly" />
                          <Label htmlFor="payout-monthly">Monthly</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="pt-2">
                      <Button
                        className="w-full"
                        onClick={calculate}
                      >
                        Calculate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="p-8 h-[-webkit-fill-available] printable-area">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Your Estimated Returns
              </h3>

              <div className="space-y-6">
                <div className="bg-primary-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    Total Interest Earned
                  </div>
                  <div className="text-4xl font-bold text-blue-700">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-1">
                      Initial Deposit
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(amount)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-1">
                      Final Amount
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(finalAmount)}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    After Withholding Tax ({Number(tax)}%)
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatCurrency(afterTaxAmount)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Tax amount: {formatCurrency(taxAmount)}
                  </div>
                </div>
                
                {payoutOption === 'monthly' && (
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-1">
                      Monthly Interest Payout
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {formatCurrency(monthlyInterest)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Before tax: {formatCurrency(monthlyInterest * (1 + (Number(tax) / 100)))}
                    </div>
                  </div>
                )}

                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrint}
                    className="inline-flex items-center font-medium hover:text-primary-700"
                  >
                    <Printer className="mr-2 h-4 w-4" /> Print Results
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
