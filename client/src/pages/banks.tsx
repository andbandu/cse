import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Bank } from "@shared/fd-schema";
import { Helmet } from "react-helmet";
import { formatTerm } from "@/lib/utils/format-term";
import { Rate } from "@shared/schema";

// Assuming Bank type now includes highestInterestRate
interface BankWithRates extends Bank {
  highestRate: number | null;
}

export default function BanksPage() {
  const { data: banks, isLoading } = useQuery<Bank[]>({
    queryKey: ["/api/banks"],
  });

  const { data: rates } = useQuery<Rate[]>({
    queryKey: ["/api/rates"],
  });

  const banksWithRates = banks?.map((bank) => ({
    ...bank,
    highestRate: rates
      ? Math.max(
          ...rates
            .filter((rate) => rate.bankId === bank.id)
            .map((rate) => rate.maturityRate),
        )
      : null,
  }));

  return (
    <>
      <Helmet>
        <title>
          Banks & Financial Institutions of Sri Lanka |
          Colombostockexchange.info
        </title>
        <meta
          name="description"
          content="List of banks and financial institutions in Sri Lanka offering fixed deposit products."
        />
        <link rel="canonical" href="/sri-lanka-banks" />
      </Helmet>
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Banks & Financial Institutions
          </h1>
          <p className="text-white/90">
            Find information about banks and financial institutions offering
            fixed deposits in Sri Lanka
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }, (_, i) => i).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))
            : banksWithRates?.map((bank) => (
                <Card
                  key={bank.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-slate-500 to-slate-700"></div>
                  <CardHeader className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-sm flex items-center justify-center border border-slate-100">
                        <span className="text-amber-600 font-bold text-lg">
                          {bank.shortName}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-slate-800">
                          {bank.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-500 mt-1">
                          Banking & Financial Services
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium text-slate-600">
                            Highest Interest Rate
                          </h4>
                          {bank.highestRate !== null ? (
                            <div className="flex items-baseline mt-1">
                              <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                {bank.highestRate.toFixed(2)}
                              </span>
                              <span className="text-sm text-slate-600 ml-1 font-medium">
                                P.A%
                              </span>
                            </div>
                          ) : (
                            <p className="text-slate-500">No rate data</p>
                          )}
                        </div>
                        <div className="w-px h-12 bg-slate-200"></div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-600">
                            Min. Deposit
                          </h4>
                          <p className="text-lg font-semibold text-slate-700 mt-1">
                            Rs. {Number(bank.minDeposit).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {bank.description}
                      </p>
                      <div className="flex items-center text-xs text-slate-500 mt-2">
                        <span>Last Updated: {bank.updatedAt}</span>
                      </div>
                    </div>
                    <Link
                      href={`/sri-lanka-banks/${bank.id}`}
                      className="block mt-6"
                    >
                      <Button
                        variant="outline"
                        className="w-full  shadow-sm group"
                      >
                        View Details & Rates
                        <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </>
  );
}
