import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatDateToLocal } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Bank, Rate } from "@shared/schema";
import { PayoutOption } from "@/lib/utils/calculator";
import { formatTerm } from "@/lib/utils/format-term";

interface RateWithBank extends Rate {
  bank?: Bank;
}

interface RatesTableProps {
  limit?: number;
  title: string;
  description: string;
  filters?: {
    term?: number;
    amount?: number;
    payoutOption?: PayoutOption;
  };
  showViewAll?: boolean;
}

const getRate = (
  maturityRate: number,
  monthlyRate: number,
  isMonthly: boolean,
) => {
  return isMonthly ? monthlyRate : maturityRate;
};

const getRatingValue = (rating: string | null): number => {
  if (!rating) return -1;

  if (rating.startsWith("AAA")) return 22;
  if (rating.startsWith("AA+")) return 21;
  if (rating.startsWith("AA")) return 20;
  if (rating.startsWith("AA-")) return 19;
  if (rating.startsWith("A+")) return 18;
  if (rating.startsWith("A")) return 17;
  if (rating.startsWith("A-")) return 16;
  if (rating.startsWith("BBB+")) return 15;
  if (rating.startsWith("BBB")) return 14;
  if (rating.startsWith("BBB-")) return 13;
  if (rating.startsWith("BB+")) return 12;
  if (rating.startsWith("BB")) return 11;
  if (rating.startsWith("BB-")) return 10;
  if (rating.startsWith("B+")) return 9;
  if (rating.startsWith("B")) return 8;
  if (rating.startsWith("B-")) return 7;
  if (rating.startsWith("CCC+")) return 6;
  if (rating.startsWith("CCC")) return 5;
  if (rating.startsWith("CCC-")) return 4;
  if (rating.startsWith("CC")) return 3;
  if (rating.startsWith("C")) return 2;
  if (rating.startsWith("D")) return 1;

  return -1; // Default for unknown ratings
};

const getRatingColor = (rating: string): string => {
  if (rating.startsWith("AAA")) return "text-emerald-600";
  if (rating.startsWith("AA+")) return "text-green-600";
  if (rating.startsWith("AA")) return "text-green-500";
  if (rating.startsWith("AA-")) return "text-green-400";
  if (rating.startsWith("A+")) return "text-yellow-700";
  if (rating.startsWith("A")) return "text-yellow-600";
  if (rating.startsWith("A-")) return "text-yellow-500";
  if (rating.startsWith("BBB+")) return "text-yellow-400";
  if (rating.startsWith("BBB")) return "text-yellow-300";
  if (rating.startsWith("BBB-")) return "text-yellow-200";
  if (rating.startsWith("BB+")) return "text-orange-600";
  if (rating.startsWith("BB")) return "text-orange-500";
  if (rating.startsWith("BB-")) return "text-orange-400";
  if (rating.startsWith("B+")) return "text-red-600";
  if (rating.startsWith("B")) return "text-red-500";
  if (rating.startsWith("B-")) return "text-red-400";
  if (rating.startsWith("CCC+")) return "text-red-300";
  if (rating.startsWith("CCC")) return "text-red-200";
  if (rating.startsWith("CCC-")) return "text-red-100";
  if (rating.startsWith("CC")) return "text-red-100";
  if (rating.startsWith("C")) return "text-red-100";
  if (rating.startsWith("D")) return "text-red-100";
  return "text-gray-500"; // Default color for unknown ratings
};

export default function RatesTable({
  limit,
  title,
  description,
  filters,
  showViewAll = true,
}: RatesTableProps) {
  // Construct the API endpoint with appropriate query parameters
  let apiEndpoint = "/api/rates";

  if (limit && filters?.term) {
    apiEndpoint = `/api/rates/top?limit=${limit}&term=${filters.term}`;
  } else if (filters?.term && filters?.amount) {
    apiEndpoint = `/api/rates/filter?term=${filters.term}&amount=${filters.amount}`;
  } else if (filters?.term) {
    apiEndpoint = `/api/rates/filter?term=${filters.term}`;
  }

  const { data: rates, isLoading: ratesLoading } = useQuery<Rate[]>({
    queryKey: [apiEndpoint],
  });

  const { data: banks, isLoading: banksLoading } = useQuery<Bank[]>({
    queryKey: ["/api/banks"],
  });

  const isLoading = ratesLoading || banksLoading;

  // Combine rates with bank data
  const ratesWithBanks =
    rates?.map((rate) => ({
      ...rate,
      bank: banks?.find((bank) => bank.id === rate.bankId),
    })) || [];

  // Filter rates based on payout option and remove 0% rates
  const filteredRates = ratesWithBanks
    .sort((a, b) =>
      filters?.payoutOption === "maturity"
        ? b.maturityRate - a.maturityRate
        : b.monthlyRate - a.monthlyRate,
    )
    .filter(
      (rate) =>
        (filters?.payoutOption === "monthly"
          ? rate.monthlyRate
          : rate.maturityRate) > 0,
    );

  const columns: ColumnDef<RateWithBank>[] = [
    {
      accessorKey: "bank",
      header: "Bank / Institution",
      cell: ({ row }) => {
        const bank = row.original.bank;
        if (!bank) return null;

        return (
          <Link
            href={`/sri-lanka-banks/${row.original.bankId}`}
            className="cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-amber-500 font-bold text-sm">
                  {bank.shortName}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900 hover:text-slate-700 transition-colors">
                  {bank.name}
                </div>
                <div className="text-xs text-gray-500">
                  Updated: {formatDateToLocal(new Date(bank.updatedAt))}
                </div>
              </div>
            </div>
          </Link>
        );
      },
    },
    {
      id: "interestRate",
      header: `Interest Rate (${filters?.payoutOption === "monthly" ? "Monthly" : "At Maturity"})`,
      accessorFn: (row) =>
        getRate(
          row.maturityRate,
          row.monthlyRate,
          filters?.payoutOption === "monthly",
        ),
      cell: ({ row }) => (
        <div className="text-start flex flex-col">
          <span className="text-lg font-bold text-blue-500">
            {Number(
              filters?.payoutOption === "monthly"
                ? row.original.monthlyRate
                : row.original.maturityRate,
            ).toFixed(2)}
            %
          </span>
        </div>
      ),
    },
    {
      id: "aer",
      header: "AER %",
      cell: ({ row }) => {
        const aer = filters?.payoutOption === "monthly" 
          ? row.original.monthlyAer 
          : row.original.maturityAer;
        return (
          <div className="text-start">
            <span className="text-lg font-medium text-slate-700">
              {aer ? `${aer.toFixed(2)}%` : "-"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "termMonths",
      header: "Term Period",
      cell: ({ row }) => (
        <div className="text-start">{formatTerm(row.original.termMonths)}</div>
      ),
    },
    {
      accessorKey: "minDeposit",
      header: "Min. Deposit",
      cell: ({ row }) => (
        <div className="text-start">
          Rs. {Number(row.original.minDeposit).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "bank.fitchRatings",
      header: "Fitch Rating",
      sortingFn: (rowA, rowB) => {
        const ratingA = rowA.original.bank?.fitchRatings;
        const ratingB = rowB.original.bank?.fitchRatings;
        return getRatingValue(ratingB) - getRatingValue(ratingA);
      },
      cell: ({ row }) => {
        const bank = row.original.bank;
        return (
          <span
            className={`font-medium ${bank?.fitchRatings ? getRatingColor(bank.fitchRatings) : "text-slate-400"}`}
          >
            {bank?.fitchRatings || "-"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            to={`/fd-calculator?rate=${getRate(row.original.maturityRate, row.original.monthlyRate, filters?.payoutOption === "monthly")}&term=${row.original.termMonths}&amount=${filters?.amount || ""}&payout=${filters?.payoutOption || "maturity"}`}
          >
            <Button variant="outline" size="sm">
              Calculate
            </Button>
          </Link>
          <Link href={`/banks/${row.original.bankId}`}>
            <Button
              className="text-blue-700 hover:text-blue-700"
              variant="ghost"
              size="sm"
            >
              Apply Now
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="overflow-x-auto">
              {filteredRates && (
                <DataTable
                  columns={columns}
                  data={filteredRates}
                  showPagination={false}
                />
              )}
            </div>
          </div>
        )}

        {showViewAll && (
          <div className="text-center">
            <Link href="/compare-fd-rates">
              <Button
                variant="link"
                className="text-gray-700 hover:text-primary-700"
              >
                View all fixed deposit rates
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}