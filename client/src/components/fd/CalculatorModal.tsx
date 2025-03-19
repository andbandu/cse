import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import Calculator from "./calculator";
  import { RateWithBank } from "@shared/fd-schema";
  
  interface CalculatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    rate?: RateWithBank | null;
    term?: number;
    amount?: number;
    payoutOption?: PayoutOption;
  }
  
  export default function CalculatorModal({
    isOpen,
    onClose,
    rate,
    term,
    amount,
    payoutOption,
  }: CalculatorModalProps) {


    const getRelevantRate = () => {
      if (!rate) return null;
      switch (payoutOption) {
        case "maturity":
          return rate.maturityRate;
        case "monthly":
          return rate.monthlyRate;
        case "yearly":
          return rate.yearlyRate;
        default:
          return rate.maturityRate; // Fallback to maturity if payoutOption is undefined
      }
    };

    const relevantRate = getRelevantRate();
  
    

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Fixed Deposit Calculator</DialogTitle>
          </DialogHeader>
  
          {/* Pass the rate, term, amount, and payout option to the Calculator component */}
          <Calculator
          rate={relevantRate}
          term={term}
          amount={amount}
          payoutOption={payoutOption}
        />
        </DialogContent>
      </Dialog>
    );
  }