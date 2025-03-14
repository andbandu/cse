
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
  const params = useParams<{ id: string }>();
  const bankId = parseInt(params.id);
  const [payoutOption, setPayoutOption] = useState<PayoutOption>("maturity");

  const { data: bank, isLoading: isLoadingBank } = useQuery<Bank>({
    queryKey: [`/api/banks/${bankId}`],
  });

  const { data: rates, isLoading: isLoadingRates } = useQuery<Rate[]>({
    queryKey: [`/api/banks/${bankId}/rates`],
  });

  return (
    <>
      <Helmet>
        <title>
          {bank
            ? `${bank.name} Fixed Deposits Rates | Sri Lanka`
            : "Fixed Deposits Rates | Sri Lanka"}
        </title>
        <meta
          name="description"
          content={
            bank
              ? `View fixed deposit rates and details for ${bank.name} in Sri Lanka.`
              : "Bank fixed deposit details"
          }
        />
      </Helmet>

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <div className="container mx-auto px-4">
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
          </div>
        )}
      </div>
    </>
  );
}
