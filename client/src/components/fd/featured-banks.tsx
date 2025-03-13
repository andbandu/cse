import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Bank } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedBanks() {
  // Fetch featured banks from the API
  const { data: banks = [], isLoading } = useQuery<Bank[]>({
    queryKey: ["featuredBanks"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/banks?limit=4"); // Assuming an API endpoint that returns featured banks
        if (!response.ok) {
          throw new Error("Failed to fetch banks");
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching featured banks:", error);
        return [];
      }
    },
  });

  // Loading skeletons for banks
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-full bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // If no banks are available
  if (banks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No banks available at the moment.</p>
      </div>
    );
  }

  // Featured banks displayed in a grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {banks.slice(0, 4).map((bank) => (
        <Card key={bank.id} className="h-full bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              {bank.logo ? (
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  {bank.name.charAt(0)}
                </div>
              )}
            </div>
            <h3 className="font-semibold text-center mb-2">{bank.name}</h3>
            <p className="text-sm text-gray-500 text-center mb-4 line-clamp-2">
              {bank.description || "Competitive fixed deposit rates available"}
            </p>
            <Link href={`/bank/${bank.id}`}>
              <Button className="w-full mt-auto">View Rates</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default FeaturedBanks;