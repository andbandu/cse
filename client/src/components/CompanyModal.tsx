import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { DividendRecord } from '@shared/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CompanyModalProps {
  company: DividendRecord | null;
  open: boolean;
  onClose: () => void;
}

export default function CompanyModal({ company, open, onClose }: CompanyModalProps) {
  if (!company) return null;

  const chartData = Object.entries(company.dividends)
    .map(([year, dividend]) => ({
      year: parseInt(year),
      dividend
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{company.company} ({company.ticker})</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <p className="text-sm font-medium">Established</p>
            <p className="text-sm text-gray-500">{company.established}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Quoted Date</p>
            <p className="text-sm text-gray-500">{company.quotedDate}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Financial Year End</p>
            <p className="text-sm text-gray-500">{company.fyEnding}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Dividend Frequency</p>
            <p className="text-sm text-gray-500">{company.frequency}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Dividend History</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="dividend" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Annual Dividend Payments</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(company.dividends)
              .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
              .map(([year, dividend]) => (
                <div key={year} className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-sm font-medium">{year}</p>
                  <p className="text-sm">{dividend || '-'}</p>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
