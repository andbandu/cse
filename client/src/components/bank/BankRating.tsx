
import { Card } from "@/components/ui/card";

const getRatingColor = (rating: string): string => {
  if (rating.startsWith("AAA")) return "text-emerald-600";
  if (rating.startsWith("AA")) return "text-green-600";
  if (rating.startsWith("A")) return "text-blue-600";
  if (rating.startsWith("BBB")) return "text-yellow-600";
  return "text-red-600";
};

interface BankRatingProps {
  rating: string;
}

export function BankRating({ rating }: BankRatingProps) {
  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white shadow-md border-none">
      <div className="p-6">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`text-4xl font-bold ${getRatingColor(rating)}`}>
              {rating}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">FITCH</span>
              <span className="text-xs text-slate-400">RATING</span>
            </div>
          </div>
          <span className="text-sm text-slate-600 mt-2">National Long-Term Rating</span>
        </div>
      </div>
    </Card>
  );
}
