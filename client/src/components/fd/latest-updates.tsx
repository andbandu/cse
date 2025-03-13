
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Update } from "@shared/types";
import { formatDistanceToNow } from "date-fns";

export function LatestUpdates() {
  const { data: updates = [], isLoading } = useQuery<Update[]>({
    queryKey: ['updates'],
    queryFn: async () => {
      try {
        console.log("Fetching latest updates");
        const response = await fetch('/api/updates?limit=3');
        if (!response.ok) {
          console.error("Error status:", response.status);
          throw new Error('Failed to fetch updates');
        }
        const data = await response.json();
        console.log("Received updates:", data);
        return data;
      } catch (error) {
        console.error("Error fetching updates:", error);
        return [];
      }
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!updates.length) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No updates available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {updates.map((update) => (
        <Card key={update.id} className="overflow-hidden">
          {update.imageUrl && (
            <div className="h-48 overflow-hidden">
              <img 
                src={update.imageUrl} 
                alt={update.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-lg">{update.title}</CardTitle>
            <CardDescription>
              <Badge className="mr-2">{update.category}</Badge>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(update.date), { addSuffix: true })}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{update.content}</p>
          </CardContent>
          <CardFooter>
            <span className="text-xs text-gray-500">Posted on {new Date(update.date).toLocaleDateString()}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default LatestUpdates;
