import { Link } from "wouter";
import { ChevronRight, LineChart, Search } from "lucide-react";


export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoMTJWMThIMzZ2MTJ6TTYgMThoMTJ2LTZINnY2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Compare Sri Lanka's Stock Dividend History
            </span>
          </h1>
          <p className="text-xl opacity-90 mb-10 max-w-2xl">
          Track and analyze Sri Lanka Stock dividend payments from various companies across different sectors
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <a 
              href="/cse-dividend-history/#com-dividend" 
              className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium px-7 py-3.5 rounded-lg text-center transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              <span>Compare Dividends</span>
              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -mr-1  transition-all" />
            </a>
            
            <a 
              href="#calculator" 
              className="group bg-white hover:bg-slate-50 text-black font-medium px-7 py-3.5 rounded-lg text-center transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <LineChart className="h-5 w-5" />
              <span>Calculate Returns</span>
              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -mr-1  transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}