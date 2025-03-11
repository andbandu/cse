import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import CompanyTable from "@/components/CompanyTable";
import SearchFilter from "@/components/SearchFilter";
import Analytics from "@/components/Analytics";
import type { DividendRecord } from "@shared/types";
import { setPageTitle } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

interface FilterState {
  search: string;
  sector: string;
  sortBy: string;
  payoutMonth: string;
  minimumYield: number;
}

export default function Dashboard() {
  const currentYear = new Date().getFullYear().toString();

  const [filter, setFilter] = useState<FilterState>({
    search: "",
    sector: "All Sectors",
    sortBy: `${currentYear} Yield (High to Low)`,
    payoutMonth: "All Months",
    minimumYield: 0,
  });

  const { data: dividendData, isLoading: isDividendsLoading } = useQuery({
    queryKey: ["/api/dividends"],
  });

  const { data: analyticsData, isLoading: isAnalyticsLoading } = useQuery({
    queryKey: ["/api/analytics"],
  });

  const filteredData = ((dividendData as DividendRecord[]) || []).filter(
    (record) => {
      // Search filter
      const matchesSearch =
        record.company.toLowerCase().includes(filter.search.toLowerCase()) ||
        record.ticker.toLowerCase().includes(filter.search.toLowerCase());

      // Sector filter
      const matchesSector =
        filter.sector === "All Sectors" || record.sector === filter.sector;

      // Payout month filter
      const matchesMonth =
        filter.payoutMonth === "All Months" ||
        record.fyEnding === filter.payoutMonth;

      // Minimum yield filter
      const currentYield = record.dividends[currentYear] || 0;
      const matchesYield = currentYield >= filter.minimumYield;

      return matchesSearch && matchesSector && matchesMonth && matchesYield;
    },
  );

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (filter.sortBy === `${currentYear} Yield (High to Low)`) {
      return (b.dividends[currentYear] || 0) - (a.dividends[currentYear] || 0);
    } else if (filter.sortBy === `${currentYear} Yield (Low to High)`) {
      return (a.dividends[currentYear] || 0) - (b.dividends[currentYear] || 0);
    } else if (filter.sortBy === "Company (A-Z)") {
      return a.company.localeCompare(b.company);
    } else if (filter.sortBy === "Company (Z-A)") {
      return b.company.localeCompare(a.company);
    }
    return 0;
  });

  // Set the page title for SEO
  const pageTitle = setPageTitle("Dividend Dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Track and analyze dividend history, yields and payout trends of companies listed on the Colombo Stock Exchange (CSE)."
        />
      </Helmet>

      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <h1 className="text-2xl font-bold">CSE Dividend Data</h1>
            <p className="text-sm text-gray-500">
              Track and analyze Sri Lanka Stock dividend payments from various
              companies across different sectors
            </p>
          </div>

          {!isAnalyticsLoading && analyticsData && (
            <Analytics
              data={analyticsData}
              totalCompanies={dividendData?.length || 0}
            />
          )}

          <SearchFilter
            filter={filter}
            onFilterChange={setFilter}
            resultCount={sortedData.length}
            data={dividendData || []}
          />

          <CompanyTable
            data={sortedData}
            isLoading={isDividendsLoading}
            selectedSector={filter.sector}
          />
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
