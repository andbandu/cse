
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead 
        title="Terms of Service" 
        description="Terms and conditions for using the Colombo Stock Exchange dividend data and information services."
        canonical="/terms"
      />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
            <p className="text-slate-300 mt-2 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
            </p>
          </div>
          
          <div className="p-6 sm:p-8 space-y-8">
            <p className="text-slate-600 mb-8 text-sm border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 italic">
              Please read these Terms of Service carefully before using our service. By accessing or using our service, you agree to be bound by these terms.
            </p>
            
            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Acceptance of Terms
              </h2>
              <div className="pl-11">
                <p className="text-slate-600">
                  By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                </p>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Use of Service
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  Our service provides information about company dividends. This information is provided for educational and informational purposes only and should not be construed as financial advice.
                </p>
                <p className="text-slate-600">
                  Users agree to use the service in compliance with all applicable laws and regulations.
                </p>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                User Accounts
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                  <li>We reserve the right to terminate accounts at our discretion.</li>
                  <li>One account is permitted per individual or entity.</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                Content
              </h2>
              <div className="pl-11">
                <p className="text-slate-600">
                  Our service allows you to access content related to company dividends. The content is provided "as is" and we make no warranties regarding its accuracy or completeness.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                Changes to Terms
              </h2>
              <div className="pl-11">
                <p className="text-slate-600">
                  We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                </p>
              </div>
            </section>
          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm">
              If you have any questions about these Terms, please contact us at <a href="mailto:hello@colombostockexchange.info" className="text-primary-600 hover:underline">hello@colombostockexchange.info</a>
            </p>
          </div>
        </div>
      </main>

    </>
  );
}
