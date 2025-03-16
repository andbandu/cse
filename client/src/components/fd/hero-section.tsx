import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFilters } from "@/hooks/use-filters";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function HeroSection() {
  const filters = useFilters();
  const [depositAmount, setDepositAmount] = useState(filters.amount.toString());
  const [formattedAmount, setFormattedAmount] = useState("");
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Format amount with commas
  useEffect(() => {
    if (depositAmount) {
      const numAmount = parseInt(depositAmount.replace(/,/g, ""));
      if (!isNaN(numAmount)) {
        setFormattedAmount(numAmount.toLocaleString());
      }
    }
  }, [depositAmount]);

  // Initialize formatted amount on first render
  useEffect(() => {
    if (filters.amount) {
      setFormattedAmount(filters.amount.toLocaleString());
    }
  }, []);

  const handleSearch = () => {
    let numAmount = parseInt(depositAmount.replace(/,/g, ""));
    
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid deposit amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }
    
    filters.setFilters({
      term: filters.term,
      amount: numAmount
    });
    
    navigate("/compare-fd-rates");
  };

  return (
    <section className="bg-gradient-to-r  from-slate-700 to-slate-900 text-white ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Find the Best Fixed Deposit Rates in Sri Lanka
            </span>
          </h1>
          <motion.p className="text-lg md:text-xl mb-10 opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          >
            Compare rates from leading banks and financial institutions to maximize your returns
          </motion.p>
          
          <motion.div className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="space-y-2">
                <label htmlFor="deposit-amount" className="block text-sm font-medium text-gray-700">
                  Deposit Amount (LKR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">Rs.</span>
                  </div>
                  <Input
                    type="text"
                    id="deposit-amount"
                    className="pl-12 text-gray-500"
                    value={formattedAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="100,000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="deposit-term" className="block text-sm font-medium text-gray-700">
                  Term Period
                </label>
                <Select
                  value={filters.term.toString()}
                  onValueChange={(value) => 
                    filters.setFilters({ term: parseInt(value) })
                  }
                >
                  <SelectTrigger id="deposit-term" className="text-gray-500">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Months</SelectItem>
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
                  className="w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-primary transition-all shadow-lg hover:shadow-xl" 
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-4 w-4 text-primary" /> Find Best Rates
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
