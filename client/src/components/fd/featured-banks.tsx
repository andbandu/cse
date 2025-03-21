import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateToLocal } from "@/lib/utils";
import { Bank, Rate } from "@shared/schema";
import { formatTerm } from "@/lib/utils/format-term";

interface BankWithRates extends Bank {
  rates?: Rate[];
}

export default function FeaturedBanks() {
  const { data: banks, isLoading } = useQuery<Bank[]>({
    queryKey: ["/api/banks"],
  });

  const { data: rates } = useQuery<Rate[]>({
    queryKey: ["/api/rates"],
  });

  // Combine banks with their rates and calculate highest rate
  const banksWithRates: BankWithRates[] = banks
    ? banks.map((bank) => ({
        ...bank,
        rates: rates ? rates.filter((rate) => rate.bankId === bank.id).sort((a, b) => a.termMonths - b.termMonths) : [],
        highestRate: rates ? Math.max(...rates.filter((rate) => rate.bankId === bank.id).map((rate) => parseFloat(rate.maturityRate))) : 0,
      }))
    : [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Banks & Financial Institutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted partners offering competitive fixed deposit rates
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="h-3 w-full" />
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Skeleton className="h-12 w-12 rounded-md mr-4" />
                        <Skeleton className="h-6 w-48" />
                      </div>
                      <div className="space-y-2 mb-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <Skeleton className="h-20 w-full mb-6" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {banksWithRates
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((bank) => (
                <Card
                  key={bank.id}
                  className="overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="h-3 bg-slate-700"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                          <span className="text-amber-500 font-bold">
                            {bank.shortName.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {bank.name}
                        </h3>
                      </div>
                      {bank.highestRate > 0 && (
                        <div className="flex flex-col items-end">
                          <span className="text-sm text-gray-600">Highest Rate</span>
                          <span className="text-xl font-bold text-green-600">
                            {bank.highestRate.toFixed(2)}%
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      {bank.rates
                        ?.filter((rate) => [12, 6, 3].includes(rate.termMonths))
                        .sort((a, b) => b.termMonths - a.termMonths)
                        .map((rate) => (
                          <div
                            key={rate.id}
                            className="flex justify-between mb-1"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              {formatTerm(rate.termMonths)} (P.A.%):
                            </span>
                            <span className="text-sm font-bold text-green-600">
                              {Number(rate.maturityRate).toFixed(2)}%
                            </span>
                          </div>
                        ))}
                    </div>

                    <div className="text-sm text-gray-600 mb-6">
                      {bank.description || "No description available."}
                    </div>

                    <div className="flex justify-between items-center">
                      <Link href={`/sri-lanka-banks/${bank.id}`}>
                        <Button
                          variant="link"
                          className="text-slate-700 px-0 hover:text-slate-900"
                        >
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/sri-lanka-banks/${bank.id}`}>
                        <Button>Apply Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/sri-lanka-banks">
            <Button
              variant="link"
              className="text-gray-700 hover:text-primary-700"
            >
              View all banks and financial institutions
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
      </div>
    </section>
  );
}