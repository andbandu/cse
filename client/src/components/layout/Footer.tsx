import { Link } from "wouter";
import { Building } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-primary-600 text-white p-1.5 rounded-lg mr-2 shadow-sm">
                <Building className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">ColomboStockExchange</h2>
              <span className="ml-2 text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-0.5 rounded-full shadow-sm">.info</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">Track CSE dividend history, yields, and payout trends. The
            information provided is for informational purposes only and not
            financial advice.</p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-primary-400 transition-colors bg-slate-700/50 p-2 rounded-full hover:bg-slate-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-300 hover:text-primary-400 transition-colors bg-slate-700/50 p-2 rounded-full hover:bg-slate-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.01 10.01 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-300 hover:text-primary-400 transition-colors bg-slate-700/50 p-2 rounded-full hover:bg-slate-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>about</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Privacy</span>
                </Link>
              </li>
              <li>
                <Link href="#calculator" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Terms</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Divident History</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Fixed Deposits Rates</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Disclaimer</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-slate-700/50 p-1.5 rounded text-primary-400 mt-0.5 mr-3">
                  <svg className="h-4 w-4" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">hello@colombostockexchange.info</span>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-700/50 p-1.5 rounded text-primary-400 mt-0.5 mr-3">
                  <svg className="h-4 w-4" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">+94 11 234 5678</span>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-700/50 p-1.5 rounded text-primary-400 mt-0.5 mr-3">
                  <svg className="h-4 w-4" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">123 Financial Street, Colombo 03, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} ColomboStockExchange.info. All rights reserved. Data is for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
