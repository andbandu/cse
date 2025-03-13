import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { formatDateToLocal } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Bank } from "@shared/fd-schema";
import { Helmet } from "react-helmet";


export default function BanksPage() {
  const { data: banks, isLoading } = useQuery<Bank[]>({
    queryKey: ["/api/banks"],
  });

  return (
    <>
      <Helmet>
        <title>Banks & Financial Institutions | DepositCompare.lk</title>
        <meta name="description" content="List of banks and financial institutions in Sri Lanka offering fixed deposit products." />
      </Helmet>
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Banks & Financial Institutions
          </h1>
          <p className="text-white/90">
            Find information about banks and financial institutions offering fixed deposits in Sri Lanka
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
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
            : banks?.map((bank) => (
                <Card key={bank.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-amber-500 font-bold">{bank.shortName}</span>
                      </div>
                      <CardTitle>{bank.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {bank.description}
                    </CardDescription>
                    <p className="text-sm text-gray-500 mb-4">
                      Minimum Deposit: Rs. {Number(bank.minDeposit).toLocaleString()}
                      <br />
                      Last Updated: {formatDateToLocal(new Date(bank.updatedAt))}
                    </p>
                    <Link href={`/banks/${bank.id}`}>
                      <Button variant={"outline"} className="w-full group-hover:bg-primary-600">
                        View Details{" "}
                        <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
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
