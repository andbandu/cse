
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
    <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-lg">
      <div className="flex-1">
        <div className="flex items-baseline gap-3">
          <span className={`text-3xl font-bold tracking-tight ${getRatingColor(rating)}`}>
            {rating}
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-600">FITCH RATING</span>
            <span className="text-xs text-slate-500">National Long-Term</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Credit rating assigned by Fitch Ratings, reflecting the bank's creditworthiness
        </p>
      </div>
    </div>
  );
}
