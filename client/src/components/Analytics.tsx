import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart, Grid2X2 } from "lucide-react";
import type { AnalyticsData } from "@shared/types";

interface AnalyticsProps {
  data: AnalyticsData;
  totalCompanies: number;
}

export default function Analytics({ data, totalCompanies }: AnalyticsProps) {
  const totalSectors = Object.keys(data.sectorDistribution).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
          <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCompanies}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sectors</CardTitle>
          <Grid2X2 className="h-4 w-4 text-purple-500 dark:text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSectors}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Divident
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.averageYield.toFixed(2)} LKR
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Highest Divident
          </CardTitle>
          <BarChart className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.highestYield.yield.toFixed(2)} LKR
          </div>
          <p className="text-xs text-muted-foreground">
            {data.highestYield.company}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
