import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import CompanyModal from "./CompanyModal";
import type { DividendRecord } from "@shared/types";

interface CompanyTableProps {
  data: DividendRecord[];
  isLoading: boolean;
  selectedSector: string;
}

export default function CompanyTable({
  data,
  isLoading,
  selectedSector,
}: CompanyTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<DividendRecord | null>(
    null,
  );
  const itemsPerPage = 15;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const years = Array.from({ length: 19 }, (_, i) =>
    (new Date().getFullYear() - i).toString(),
  );

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[650px] min-w-[200px]">Company</TableHead>
              <TableHead className="w-[100px]">Ticker</TableHead>
              {selectedSector === "All Sectors" && (
                <TableHead className="w-[150px]">Sector</TableHead>
              )}
              {years.map((year) => (
                <TableHead key={year} className="text-right w-[80px]">
                  {year}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((record) => (
              <TableRow
                key={record.ticker}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedCompany(record)}
              >
                <TableCell className="font-medium">{record.company}</TableCell>
                <TableCell>{record.ticker}</TableCell>
                {selectedSector === "All Sectors" && (
                  <TableCell>{record.sector}</TableCell>
                )}
                {years.map((year, index) => {
                  // Only for the first year (latest year)
                  if (index === 0 && years.length > 1) {
                    const currentYearValue = record.dividends[year] || 0;
                    const previousYearValue = record.dividends[years[1]] || 0;
                    const isHigher = currentYearValue > previousYearValue;
                    const hasChanged = currentYearValue !== previousYearValue;

                    return (
                      <TableCell key={year} className="text-right">
                        {currentYearValue ? (
                          <div className="flex items-center justify-start gap-1">
                            <span>{currentYearValue.toFixed(2)}</span>
                            {hasChanged && previousYearValue > 0 && (
                              <svg
                                className={`h-3 w-3 ${isHigher ? "text-green-500" : "text-red-500"}`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d={
                                    isHigher
                                      ? "M12 3l8 10H4l8-10zm0 18V11"
                                      : "M12 21l-8-10h16l-8 10zm0-18v10"
                                  }
                                />
                              </svg>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    );
                  }

                  // For all other years, just show the value
                  return (
                    <TableCell key={year} className="text-right">
                      {record.dividends[year]
                        ? record.dividends[year].toFixed(2)
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
          {data.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CompanyModal
        company={selectedCompany}
        open={selectedCompany !== null}
        onClose={() => setSelectedCompany(null)}
      />
    </>
  );
}
