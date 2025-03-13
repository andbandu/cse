import React, { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Rate } from "@shared/types";
import { Bank } from "@shared/types";
import { PayoutOption } from "@/lib/utils/calculator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateToLocal } from "@/lib/utils";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

interface RateWithBank extends Rate {
  bank?: Bank;
}

interface RatesTableProps {
  rates: Rate[] | undefined;
  isLoading: boolean;
  payoutOption: PayoutOption;
}

export function RatesTable({ rates, isLoading, payoutOption }: RatesTableProps) {
  const getRate = (baseRate: string, isMonthly: boolean): number => {
    const rate = Number(baseRate);
    return isMonthly ? rate * 0.95 : rate; // Simplified calculation for monthly payout
  };

  const columns: ColumnDef<RateWithBank>[] = useMemo(() => [
    {
      accessorKey: "bankName",
      header: "Bank",
      cell: ({ row }) => (
        <Link 
          href={`/bank/${row.original.bankId}`} 
          className="flex items-center text-blue-600 hover:underline"
        >
          {row.original.bankName}
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </Link>
      ),
    },
    {
      accessorKey: "termMonths",
      header: "Term Period",
      cell: ({ row }) => <div>{row.original.termMonths} Months</div>,
    },
    {
      accessorKey: "interestRate",
      header: payoutOption === 'maturity' ? "At Maturity Rate" : "Monthly Interest Rate",
      cell: ({ row }) => (
        <div className={`font-bold ${payoutOption === 'maturity' ? 'text-green-600' : 'text-blue-600'}`}>
          {getRate(row.original.interestRate, payoutOption === 'monthly').toFixed(2)}%
        </div>
      ),
    },
    {
      accessorKey: "minDeposit",
      header: "Minimum Deposit",
      cell: ({ row }) => (
        <div>Rs. {parseInt(row.original.minDeposit).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => (
        <div>{formatDateToLocal(new Date(row.original.updatedAt))}</div>
      ),
    },
  ], [payoutOption]);

  const table = useReactTable({
    data: (rates || []) as RateWithBank[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {columns.map((column, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!rates || rates.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No rates available for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}