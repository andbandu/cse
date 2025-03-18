import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import Calculator from "@/components/fd/Calculator";
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
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Fixed Deposit Calculator</DialogTitle>
          </DialogHeader>
  
          {/* Pass the rate, term, amount, and payout option to the Calculator component */}
          <Calculator
            rate={rate}
            term={term}
            amount={amount}
            payoutOption={payoutOption}
          />
        </DialogContent>
      </Dialog>
    );
  }