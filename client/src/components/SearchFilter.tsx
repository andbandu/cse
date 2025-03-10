import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { DividendRecord } from '@shared/types';

interface FilterState {
  search: string;
  sector: string;
  sortBy: string;
  payoutMonth: string;
  minimumYield: number;
}

interface SearchFilterProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  resultCount: number;
  data: DividendRecord[];
}

export default function SearchFilter({ filter, onFilterChange, resultCount, data }: SearchFilterProps) {
  const currentYear = new Date().getFullYear().toString();

  // Get unique sectors from data
  const sectors = Array.from(new Set(data.map(record => record.sector))).sort();

  const handleReset = () => {
    onFilterChange({
      search: '',
      sector: 'All Sectors',
      sortBy: `${currentYear} Yield (High to Low)`,
      payoutMonth: 'All Months',
      minimumYield: 0
    });
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Search & Filter</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search company or ticker..."
            className="pl-9"
            value={filter.search}
            onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          />
        </div>

        <Select
          value={filter.sector}
          onValueChange={(value) => onFilterChange({ ...filter, sector: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Sectors">All Sectors</SelectItem>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filter.sortBy}
          onValueChange={(value) => onFilterChange({ ...filter, sortBy: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={`${currentYear} Yield (High to Low)`}>{currentYear} Yield (High to Low)</SelectItem>
            <SelectItem value={`${currentYear} Yield (Low to High)`}>{currentYear} Yield (Low to High)</SelectItem>
            <SelectItem value="Company (A-Z)">Company (A-Z)</SelectItem>
            <SelectItem value="Company (Z-A)">Company (Z-A)</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filter.payoutMonth}
          onValueChange={(value) => onFilterChange({ ...filter, payoutMonth: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Payout Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Months">All Months</SelectItem>
            <SelectItem value="March">March</SelectItem>
            <SelectItem value="June">June</SelectItem>
            <SelectItem value="September">September</SelectItem>
            <SelectItem value="December">December</SelectItem>
          </SelectContent>
        </Select>

        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Minimum Yield ({currentYear})</span>
              <span className="text-sm text-muted-foreground">{filter.minimumYield}%</span>
            </div>
            <Slider
              value={[filter.minimumYield]}
              onValueChange={([value]) => onFilterChange({ ...filter, minimumYield: value })}
              max={100}
              step={0.5}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {resultCount} results
        </p>
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}