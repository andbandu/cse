import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatDateToLocal } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Bank, Rate } from "@shared/schema";
import { PayoutOption } from "@/lib/utils/calculator";

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

export default function RatesTable({
  limit = 5,
  title,
  description,
  filters,
  showViewAll = true,
}: RatesTableProps) {
  // Construct the API endpoint with appropriate query parameters
  let apiEndpoint = '';
  
  if (filters?.term && filters?.amount) {
    apiEndpoint = `/api/rates/filter?term=${filters.term}&amount=${filters.amount}`;
  } else if (filters?.term) {
    apiEndpoint = `/api/rates/filter?term=${filters.term}`;
  } else {
    apiEndpoint = `/api/rates/top?limit=${limit}&term=${filters?.term || 12}`;
  }

  const { data: rates, isLoading } = useQuery<RateWithBank[]>({
    queryKey: [apiEndpoint],
  });

  const columns: ColumnDef<RateWithBank>[] = [
    {
      accessorKey: "bank",
      header: "Bank / Institution",
      cell: ({ row }) => {
        const bank = row.original.bank;
        if (!bank) return null;
        
        return (
          <Link href={`/banks/${row.original.bankId}`} className="cursor-pointer">
            <div className="flex items-center">
              <div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{bank.shortName}</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 hover:text-primary transition-colors">{bank.name}</div>
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
      accessorKey: "interestRate",
      header: "Interest Rate",
      cell: ({ row }) => (
        <div className="text-center">
          <span className="text-xl font-bold text-green-600">
            {Number(row.original.interestRate).toFixed(2)}%
          </span>
        </div>
      ),
    },
    {
      accessorKey: "termMonths",
      header: "Term Period",
      cell: ({ row }) => (
        <div className="text-center">{row.original.termMonths} Months</div>
      ),
    },
    {
      accessorKey: "minDeposit",
      header: "Min. Deposit",
      cell: ({ row }) => (
        <div className="text-center">
          Rs. {Number(row.original.minDeposit).toLocaleString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <Link href={`/banks/${row.original.bankId}`}>
              <Button variant="link" className="text-primary hover:text-primary-700">
                Apply Now
              </Button>
            </Link>
          </div>
        );
      },
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
              {rates && <DataTable columns={columns} data={rates} showPagination={false} />}
            </div>
          </div>
        )}

        {showViewAll && (
          <div className="text-center">
            <Link href="/compare-rates">
              <Button variant="link" className="text-primary hover:text-primary-700">
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
