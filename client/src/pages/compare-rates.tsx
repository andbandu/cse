import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import RatesTable from "@/components/fd/rates-table";
import { useFilters } from "@/hooks/use-filters";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { PayoutOption } from "@/lib/utils/calculator";

export default function CompareRatesPage() {
  const filters = useFilters();
  const [amount, setAmount] = useState(filters.amount.toString());
  const [formattedAmount, setFormattedAmount] = useState("");
  const { toast } = useToast();

  // Format amount with commas
  useEffect(() => {
    if (amount) {
      const numAmount = parseInt(amount.replace(/,/g, ""));
      if (!isNaN(numAmount)) {
        setFormattedAmount(numAmount.toLocaleString());
      }
    }
  }, [amount]);

  const handleSearch = () => {
    let depositAmount = parseInt(amount.replace(/,/g, ""));

    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast({
        title: "Invalid deposit amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    filters.setFilters({
      term: filters.term,
      amount: depositAmount,
      payoutOption: filters.payoutOption,
    });
  };

  return (
    <>
      <Helmet>
        <title>Compare Rates | DepositCompare.lk</title>
        <meta
          name="description"
          content="Find and compare the best fixed deposit rates from Sri Lankan banks and financial institutions."
        />
      </Helmet>

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Compare Fixed Deposit Rates
          </h1>
          <p className="text-white/90">
            Find the best rates for your savings from Sri Lankan banks and
            financial institutions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Filter Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="deposit-amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deposit Amount (LKR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">Rs.</span>
                  </div>
                  <Input
                    type="text"
                    id="deposit-amount"
                    className="pl-12"
                    value={formattedAmount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100,000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="deposit-term"
                  className="block text-sm font-medium text-gray-700"
                >
                  Term Period
                </label>
                <Select
                  value={filters.term.toString()}
                  onValueChange={(value) =>
                    filters.setFilters({
                      term: parseInt(value),
                      amount: filters.amount,
                    })
                  }
                >
                  <SelectTrigger id="deposit-term">
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

              <div className="flex items-end">
                <Button
                  className="w-full flex items-center justify-center"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-4 w-4" /> Find Best Rates
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payout Option
              </label>
              <RadioGroup
                value={filters.payoutOption}
                onValueChange={(value) =>
                  filters.setFilters({ payoutOption: value as PayoutOption })
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="maturity"
                    id="compare-payout-maturity"
                  />
                  <Label htmlFor="compare-payout-maturity">At Maturity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="compare-payout-monthly" />
                  <Label htmlFor="compare-payout-monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <RatesTable
          title="Fixed Deposit Rates Comparison"
          description={`Showing rates for ${filters.term}-month fixed deposits of Rs. ${filters.amount.toLocaleString()} (${filters.payoutOption === "maturity" ? "At Maturity" : "Monthly Payout"})`}
          filters={{
            term: filters.term,
            amount: filters.amount,
            payoutOption: filters.payoutOption,
          }}
          showViewAll={false}
        />
      </div>
    </>
  );
}
