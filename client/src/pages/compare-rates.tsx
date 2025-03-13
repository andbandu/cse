
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { RatesTable } from "@/components/fd/rates-table";
import { useToast } from "@/components/ui/use-toast";
import { useFilters } from "@/lib/hooks/use-filters";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { PayoutOption } from "@/lib/utils/calculator";
import { Rate } from "@shared/types"; // Updated import

export default function CompareRatesPage() {
  const filters = useFilters();
  const [amount, setAmount] = useState(filters.amount.toString());
  const [payoutOption, setPayoutOption] = useState<PayoutOption>(filters.payoutOption);
  const { toast } = useToast();

  const formatNumberWithCommas = (number: number): string => {
    return number.toLocaleString();
  };

  // Update filters when payout option changes
  useEffect(() => {
    filters.setFilters({ payoutOption });
  }, [payoutOption]);

  // Handle amount input change
  const handleAmountChange = (value: string) => {
    // Remove commas before processing
    const cleanValue = value.replace(/,/g, '');
    setAmount(cleanValue);
  };

  // Format amount with commas as the user types
  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      const formattedAmount = formatNumberWithCommas(Number(amount));
      setAmount(formattedAmount);
    }
  }, [amount]);

  const { data: rates = [], isLoading, error } = useQuery<Rate[]>({
    queryKey: ['rates', filters.term, filters.amount, filters.payoutOption],
    queryFn: async () => {
      try {
        console.log("Fetching rates with filters:", filters);
        const response = await fetch(`/api/rates?term=${filters.term}&amount=${filters.amount}`);
        
        if (!response.ok) {
          console.error("Error status:", response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received rates data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching rates:", error);
        toast({
          title: "Error fetching rates",
          description: "Could not retrieve rates from the API.",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!filters.term && !!filters.amount
  });

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
      payoutOption: filters.payoutOption
    });
  };

  return (
    <>
      <Helmet>
        <title>Compare Fixed Deposit Rates | Sri Lanka</title>
        <meta name="description" content="Find and compare the best fixed deposit rates from Sri Lankan banks and financial institutions." />
      </Helmet>

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Compare Fixed Deposit Rates</h1>
          <p className="text-white/90">
            Find the best interest rates on fixed deposits from all banks in Sri Lanka
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h2 className="text-xl font-bold mb-6">Filter Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="term" className="block mb-2">Term Period</Label>
              <RadioGroup
                value={filters.term.toString()}
                onValueChange={(value) => filters.setFilters({ term: parseInt(value) })}
                className="flex flex-col space-y-2"
                id="term"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="term-3" />
                  <Label htmlFor="term-3">3 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6" id="term-6" />
                  <Label htmlFor="term-6">6 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12" id="term-12" />
                  <Label htmlFor="term-12">12 Months</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="amount" className="block mb-2">Deposit Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs.</span>
                <Input 
                  id="amount"
                  value={amount} 
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Min. amount: Rs. 5,000</p>
            </div>
            
            <div>
              <Label className="block mb-2">Payout Option</Label>
              <RadioGroup
                value={payoutOption}
                onValueChange={(value) => setPayoutOption(value as PayoutOption)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maturity" id="maturity" />
                  <Label htmlFor="maturity">At Maturity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly Interest</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button 
            onClick={handleSearch}
            className="mt-6 w-full md:w-auto"
          >
            Search Rates
          </Button>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Available Fixed Deposit Rates</h2>
        
        <div className="mb-4 text-sm text-gray-500">
          {filters.term && filters.amount && (
            <p>
              Showing rates for {filters.term} months term with a minimum deposit of Rs.{" "}
              {filters.amount.toLocaleString()}
            </p>
          )}
        </div>
        
        <RatesTable 
          rates={rates} 
          isLoading={isLoading}
          payoutOption={payoutOption}
        />
        
        <div className="mt-10 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold mb-2">About Fixed Deposit Rates</h3>
          <p className="text-gray-600 mb-4">
            Fixed deposit rates vary between banks and financial institutions in Sri Lanka. These rates are typically influenced by the term period, deposit amount, and central bank policies.
          </p>
          <p className="text-gray-600">
            When comparing rates, also consider factors such as the bank's reputation, early withdrawal penalties, and automatic renewal options. The interest rates shown are subject to change and were last updated as indicated.
          </p>
        </div>
      </div>
    </>
  );
}
