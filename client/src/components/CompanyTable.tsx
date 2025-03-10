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
import type { DividendRecord } from '@shared/types';

interface CompanyTableProps {
  data: DividendRecord[];
  isLoading: boolean;
}

export default function CompanyTable({ data, isLoading }: CompanyTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<DividendRecord | null>(null);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const years = Array.from({ length: 19 }, (_, i) => (new Date().getFullYear() - i).toString());

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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[650px]">Company</TableHead>
              <TableHead className="w-[100px]">Ticker</TableHead>
              <TableHead className="w-[150px]">Sector</TableHead>
              {years.map(year => (
                <TableHead key={year} className="text-right w-[80px]">{year}</TableHead>
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
                <TableCell>{record.sector}</TableCell>
                {years.map(year => (
                  <TableCell key={year} className="text-right">
                    {record.dividends[year] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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