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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BankDetailsPage() {
  const params = useParams<{ slug: string }>();
  const { data: banks } = useQuery<Bank[]>({
    queryKey: ["/api/banks"],
  });
  const bankId = !isNaN(parseInt(params.slug)) ? 
    parseInt(params.slug) : 
    banks?.find(b => b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === params.slug)?.id;
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
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Banks",
                "item": "/sri-lanka-banks"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": bank.name,
                "item": `/sri-lanka-banks/${bank.id}`
              }
            ]
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
                <Link href="/sri-lanka-banks" className="text-white/70 hover:text-white">
                  Banks
                </Link>
              </li>
              <li className="text-white/50">/</li>
              <li>
                <span className="text-white" aria-current="page">
                  {bank?.name || 'Loading...'}
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
        <Link href="/sri-lanka-banks">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to all banks
          </Button>
        </Link>

        {isLoadingBank ? (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>

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
                <CardTitle>About {bank?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <p className="mb-4">{bank?.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>
                        <strong>Minimum Deposit:</strong> Rs.{" "}
                        {Number(bank?.minDeposit).toLocaleString()}
                      </p>
                      <p>
                        <strong>Last Updated:</strong>{" "}
                        {formatDateToLocal(new Date(bank?.updatedAt || ""))}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-64 flex flex-col gap-2">
                    <Button className="w-full">
                      Apply Online <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download Form
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact Bank
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
