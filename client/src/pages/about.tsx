

import SEOHead from "@/components/SEOHead";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Sri Lanka Stock Dividend & FD Rate Tracker | ColomboStockexchange.info"
        description="Explore comprehensive dividend history for companies listed on the Colombo Stock Exchange (CSE) and compare fixed deposit (FD) rates in Sri Lanka. Get accurate, data-driven insights to make informed investment decisions."
        canonical="/"
        keywords="Sri Lanka stock dividend history, Colombo Stock Exchange data, CSE dividend tracker, Sri Lanka FD rates, fixed deposit rates Sri Lanka, Sri Lanka investment tools, Colombo Stock Exchange dividend analysis, Sri Lanka stock market trends"
      />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">About Us</h1>
            <p className="text-slate-300 mt-2 text-sm">
              Providing accurate dividend data since {new Date().getFullYear()}
            </p>
          </div>
          
          <div className="p-6 sm:p-8 space-y-8">
            <p className="text-slate-600 mb-8 text-sm border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 italic">
              Our mission is to provide investors with comprehensive data on company dividends to make informed investment decisions.
            </p>
            
            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Our Vision
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  Welcome to ColomboStockExchange.info, your premier source for comprehensive dividend data on companies listed on the Colombo Stock Exchange. We are dedicated to making financial information accessible and easy to understand for all investors, from beginners to seasoned professionals.
                </p>
                <p className="text-slate-600">
                  Our vision is to empower investors with accurate, timely, and relevant information, fostering a more transparent and efficient investment ecosystem in Sri Lanka.
                </p>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                What We Offer
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  Our platform provides detailed dividend histories, yield analytics, and payout trends for companies listed on the Colombo Stock Exchange. We aggregate data from reliable sources and present it in a user-friendly format to help you make informed investment decisions.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Comprehensive dividend history data</li>
                  <li>Dividend yield analytics</li>
                  <li>Sector-wise dividend performance</li>
                  <li>Regular updates and market insights</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Our Team
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  Our team consists of financial experts, data analysts, and technology professionals dedicated to delivering accurate and valuable information. We work diligently to ensure that the data presented is reliable, up-to-date, and relevant to your investment needs.
                </p>
                <p className="text-slate-600">
                  With decades of combined experience in finance and technology, our team brings unparalleled expertise to help you navigate the complex world of dividends and investments.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                Our Commitment
              </h2>
              <div className="pl-11">
                <p className="text-slate-600">
                  We are committed to providing a platform that is accessible, reliable, and valuable to all stakeholders in the Colombo Stock Exchange. We believe that transparent and accessible financial data is essential for a healthy investment ecosystem and are dedicated to contributing to this goal.
                </p>
              </div>
            </section>
          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm">
              Have questions? We're here to help. Contact us at <a href="mailto:hello@colombostockexchange.info" className="text-primary-600 hover:underline">hello@colombostockexchange.info</a>
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
}
