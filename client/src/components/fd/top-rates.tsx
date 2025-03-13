
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Rate } from "@shared/types";
import { Link } from "wouter";

export function TopRates({ term = '6' }: { term?: string }) {
  const { data: rates = [], isLoading } = useQuery<Rate[]>({
    queryKey: ['topRates', term],
    queryFn: async () => {
      try {
        console.log("Fetching top rates for term:", term);
        const response = await fetch(`/api/rates/top?limit=3&term=${term}`);
        if (!response.ok) {
          console.error("Error status:", response.status);
          throw new Error('Failed to fetch top rates');
        }
        const data = await response.json();
        console.log("Received top rates:", data);
        return data;
      } catch (error) {
        console.error("Error fetching top rates:", error);
        return [];
      }
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!rates.length) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No rates available for this term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rates.map((rate) => (
        <Link key={rate.id} href={`/bank/${rate.bankId}`}>
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">{rate.bankName}</CardTitle>
                <Badge className="ml-2">{rate.termMonths} Months</Badge>
              </div>
              <CardDescription>Minimum deposit: Rs. {parseInt(rate.minDeposit).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-green-600">
                  {parseFloat(rate.interestRate).toFixed(2)}%
                </span>
                <span className="ml-2 text-sm text-gray-600">p.a.</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default TopRates;
