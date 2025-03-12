import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Building,
  Calculator,
  InfoIcon,
  MessageCircle,
  Menu,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white text-primary-800 p-1.5 rounded-lg mr-2 shadow-sm">
                <Building className="h-5 w-5 fill-primary-800 text-black" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                ColomboStockExchange
              </h1>
              <span className="ml-2 text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                .info
              </span>
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <nav
            className={`${isMenuOpen ? "block" : "hidden"} md:flex flex-col sm:flex-row gap-4 md:items-center text-sm md:gap-8`}
          >
            <Link
              href="/"
              className="font-medium hover:text-amber-400 transition-colors border-b-2 border-amber-500 flex items-center gap-1.5"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span>Home</span>
              {location === "/" && (
                <span className="block h-0.5 w-full bg-yellow-500 rounded-full mt-0.5"></span>
              )}
            </Link>
            <Link
              href="/cse-dividend-history"
              className="font-medium hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M3 9h18" />
                <path d="M3 15h8" />
                <path d="M15 21V9" />
              </svg>
              <span>Dividend History</span>
              {location === "/cse-dividend-history" && (
                <span className="block h-0.5 w-full bg-yellow-500 rounded-full mt-0.5"></span>
              )}
            </Link>
            <Link
              href="/sri-lanka-fd-rates"
              className="font-medium hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 17V9h16v8H4zm2-2h12v-4H6v4zM3 7h18V5H3v2zm3 10h12v-1H6v1zm0 2h6v-1H6v1z" />
              </svg>
              <span>FD Rates</span>
              {location === "/sri-lanka-fd-rates" && (
                <span className="block h-0.5 w-full bg-yellow-500 rounded-full mt-0.5"></span>
              )}
            </Link>
            <Link
              href="#calculator"
              className="font-medium hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculator</span>
              {location === "#calculator" && (
                <span className="block h-0.5 w-full bg-yellow-500 rounded-full mt-0.5"></span>
              )}
            </Link>
            <Link
              href="/about"
              className="font-medium hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <InfoIcon className="h-4 w-4" />
              <span>About Us</span>
              {location === "/about" && (
                <span className="block h-0.5 w-full bg-yellow-500 rounded-full mt-0.5"></span>
              )}
            </Link>
            <Link
              href="/contact"
              className="font-medium hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact</span>
              {location === "/contact" && (
                <span className="block h-0.5 w-full bg-yellow-500 rounded-full mt-0.5"></span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}