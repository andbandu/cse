import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateToLocal } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Bank, Rate } from "@shared/fd-schema";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Helmet } from "react-helmet";
import { PayoutOption } from "@/lib/utils/calculator";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatTerm } from "@/lib/utils/format-term";
import { BankRating } from "@/components/bank/BankRating"; // Import BankRating component
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getRatingColor = (rating: string): string => {
  // Implement logic to determine color based on rating value.  Example:
  if (rating.startsWith("AAA")) return "text-green-500";
  if (rating.startsWith("AA")) return "text-green-600";
  if (rating.startsWith("A")) return "text-blue-600";
  if (rating.startsWith("BBB")) return "text-yellow-600";
  // Add more conditions as needed
  return "text-red-600"; // Default to red for lower ratings
};

export default function BankDetailsPage() {
  const params = useParams<{ id: string }>();
  const bankId = parseInt(params.id);
  const [payoutOption, setPayoutOption] = useState<PayoutOption>("maturity");

  const {
    data: bank,
    isLoading: isLoadingBank,
    error: bankError,
  } = useQuery<Bank>({
    queryKey: [`/api/banks/${bankId}`],
  });

  const { data: rates, isLoading: isLoadingRates } = useQuery<Rate[]>({
    queryKey: [`/api/banks/${bankId}/rates`],
    enabled: !!bankId,
    select: (data) =>
      data.filter(
        (rate) =>
          (payoutOption === "monthly" ? rate.monthlyRate : rate.maturityRate) >
          0,
      ),
  });

  // Prepare chart data
  const chartData =
    rates?.map((rate) => ({
      term: `${rate.termMonths} Months`,
      maturityRate: Number(rate.maturityRate),
      monthlyRate: Number(rate.monthlyRate),
    })) || [];

  const getRate = (
    baseRate: string,
    monthlyRate: string,
    isMonthly: boolean,
  ): number => {
    return isMonthly ? Number(monthlyRate) : Number(baseRate);
  };

  // Generate columns based on selected payout option
  const getColumns = (): ColumnDef<Rate>[] => [
    {
      accessorKey: "termMonths",
      header: "Term Period",
      cell: ({ row }) => <div>{formatTerm(row.original.termMonths)}</div>,
    },
    {
      accessorKey: "interestRate",
      header:
        payoutOption === "maturity"
          ? "At Maturity Rate"
          : "Monthly Interest Rate",
      cell: ({ row }) => (
        <div
          className={`font-bold ${payoutOption === "maturity" ? "text-green-600" : "text-blue-600"}`}
        >
          {getRate(
            row.original.maturityRate,
            row.original.monthlyRate,
            payoutOption === "monthly",
          ).toFixed(2)}
          %
        </div>
      ),
    },
    {
      accessorKey: "minDeposit",
      header: "Minimum Deposit",
      cell: ({ row }) => (
        <div>Rs. {Number(row.original.minDeposit).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => (
        <div>{formatDateToLocal(new Date(row.original.updatedAt))}</div>
      ),
    },
  ];

  const columns = getColumns();

  return (
    <>
      <Helmet>
        <title>
          {bank
            ? `${bank.name} Fixed Deposit Rates & Interest Rates ${new Date().getFullYear()} | ${bank.shortName} Fd Rates ${new Date().getFullYear()}`
            : "Fixed Deposit Rates | Sri Lanka"}
        </title>
        <meta
          name="description"
          content={
            bank
              ? `Compare ${bank.name} ${bank.shortName} fixed deposit rates and interest rates. Find the best FD rates up to ${Math.max(...(rates || []).map((r) => Number(r.maturityRate))).toFixed(2)}% p.a. Updated ${formatDateToLocal(new Date(bank.updatedAt))}.`
              : "Compare fixed deposit rates and investment options from Sri Lankan banks"
          }
        />
        <meta
          name="keywords"
          content={
            bank
              ? `${bank.name} fixed deposit, ${bank.name} FD rates,${bank.shortName} FD rates,  fixed deposit Sri Lanka, ${bank.name} interest rates, best FD rates Sri Lanka`
              : "fixed deposit rates, Sri Lanka FD rates"
          }
        />
        <meta
          property="og:title"
          content={
            bank
              ? `${bank.name} Fixed Deposit Rates ${new Date().getFullYear()} | Sri Lanka`
              : "Fixed Deposit Rates | Sri Lanka"
          }
        />
        <meta
          property="og:description"
          content={
            bank
              ? `Compare ${bank.name} fixed deposit rates and terms. Best FD rates up to ${Math.max(...(rates || []).map((r) => Number(r.maturityRate))).toFixed(2)}% p.a.`
              : "Compare fixed deposit rates in Sri Lanka"
          }
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href={
            bank
              ? `/sri-lanka-banks/${bank.name.toLowerCase().replace(/ /g, "-")}-fixed-deposit-rates`
              : "/sri-lanka-banks-fd-rates"
          }
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Add structured data for SEO */}
      {bank && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Banks",
                item: "/sri-lanka-banks",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: bank.name,
                item: `/sri-lanka-banks/${bank.id}`,
              },
            ],
          })}
        </script>
      )}

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          {/* Visual breadcrumbs */}
          <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-white/50">/</li>
              <li>
                <Link
                  href="/sri-lanka-banks"
                  className="text-white/70 hover:text-white"
                >
                  Banks
                </Link>
              </li>
              <li className="text-white/50">/</li>
              <li>
                <span className="text-white" aria-current="page">
                  {bank?.name || "Loading..."}
                </span>
              </li>
            </ol>
          </nav>

          {isLoadingBank ? (
            <div>
              <Skeleton className="h-8 w-64 bg-white/20 mb-2" />
              <Skeleton className="h-4 w-96 bg-white/20" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">
                {bank?.name}
              </h1>
              <p className="text-white/90">Fixed deposit rates and details</p>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/sri-lanka-banks" className="inline-flex  items-center">
            <buttton className="flex items-center justify-center  bg-gray-400">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Banks
            </buttton>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-md bg-white/50 backdrop-blur">
              <CardHeader>
                <CardTitle>About {bank?.name}</CardTitle>
                <CardDescription>
                  Bank overview and key information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">{bank?.description}</p>
                {bank?.fitchRatings && (
                  <BankRating rating={bank.fitchRatings} />
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border-none shadow-md bg-white/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
                <CardDescription>Key financial indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">
                      Minimum Deposit
                    </span>
                    <span className="font-medium">
                      Rs. {Number(bank?.minDeposit).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Last Updated</span>
                    <span className="font-medium">
                      {formatDateToLocal(bank?.updatedAt)}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                    onClick={() => window.open(bank?.website || "", "_blank")}
                  >
                    Apply Online
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {isLoadingBank ? (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{bank?.name} Fixed Deposit Rates</CardTitle>
                <CardDescription>
                  Current fixed deposit rates offered by {bank?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="table">
                  <TabsList className="mb-4">
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="chart">Chart View</TabsTrigger>
                  </TabsList>

                  <TabsContent value="table">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">
                        Payout Option
                      </h3>
                      <RadioGroup
                        value={payoutOption}
                        onValueChange={(value) =>
                          setPayoutOption(value as PayoutOption)
                        }
                        className="flex items-center space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="maturity"
                            id="maturity-table"
                          />
                          <Label htmlFor="maturity-table">At Maturity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly-table" />
                          <Label htmlFor="monthly-table">
                            Monthly Interest
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {isLoadingRates ? (
                      <Skeleton className="h-64 w-full" />
                    ) : (
                      <DataTable
                        columns={columns}
                        data={rates || []}
                        showPagination={false}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="chart">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">
                        Payout Option
                      </h3>
                      <RadioGroup
                        value={payoutOption}
                        onValueChange={(value) =>
                          setPayoutOption(value as PayoutOption)
                        }
                        className="flex items-center space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maturity" id="maturity" />
                          <Label htmlFor="maturity">At Maturity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly Interest</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="h-72">
                      {isLoadingRates ? (
                        <Skeleton className="h-full w-full" />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={chartData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 30,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="term" />
                            <YAxis domain={[0, "dataMax + 2"]} />
                            <Tooltip
                              formatter={(value: number) => [
                                `${value.toFixed(2)}%`,
                                payoutOption === "maturity"
                                  ? "At Maturity"
                                  : "Monthly Interest",
                              ]}
                            />
                            {payoutOption === "maturity" ? (
                              <Bar
                                dataKey="maturityRate"
                                fill="#10B981"
                                name="At Maturity"
                                radius={[4, 4, 0, 0]}
                              />
                            ) : (
                              <Bar
                                dataKey="monthlyRate"
                                fill="#3B82F6"
                                name="Monthly Interest"
                                radius={[4, 4, 0, 0]}
                              />
                            )}
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
