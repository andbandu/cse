import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/dividend/Hero";
import CompanyTable from "@/components/CompanyTable";
import SearchFilter from "@/components/SearchFilter";
import Analytics from "@/components/Analytics";
import type { DividendRecord } from "@shared/types";
import { setPageTitle } from "@/lib/seo";
import { Helmet } from "react-helmet";


// Custom SEO component (needs to be defined elsewhere)
const SEOHead = ({ title, description, canonical, keywords }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta name="keywords" content={keywords} />
  </Helmet>
);

//Custom Structured Data components (needs to be defined elsewhere)
const FinancialToolStructuredData = ({name, description, providerName, providerUrl, category}) => (
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "${name}",
        "description": "${description}",
        "provider": {
          "@type": "Organization",
          "name": "${providerName}",
          "url": "${providerUrl}"
        },
        "applicationCategory": "${category}"
      }
    `}
  </script>
)

const BreadcrumbStructuredData = ({items}) => (
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": ${JSON.stringify(items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.item
        })))}
      }
    `}
  </script>
)


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
    <>
      <SEOHead 
        title="Dividend History & Yield Tracker" 
        description="Track and analyze dividend history, yields and payouts of companies listed on the Colombo Stock Exchange (CSE)."
        canonical="/"
        keywords="CSE dividends, Colombo Stock Exchange dividends, Sri Lanka stock dividends, CSE dividend history, dividend yield, Sri Lanka investments"
      />
      <FinancialToolStructuredData
        name="Colombo Stock Exchange Dividend Tracker"
        description="Track and analyze dividend history of companies listed on the Colombo Stock Exchange (CSE)."
        providerName="ColomboStockExchange.info"
        providerUrl="https://colombostockexchange.info"
        category="Financial Analysis Tool"
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', item: '/' }
        ]}
      />

      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
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
    </>
  );
}