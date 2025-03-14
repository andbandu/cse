
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">Disclaimer</h1>
            <p className="text-slate-300 mt-2 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
            </p>
          </div>
          
          <div className="p-6 sm:p-8 space-y-8">
            <p className="text-slate-600 mb-8 text-sm border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 italic">
              The information provided on this website is for general informational purposes only. Please read this disclaimer carefully.
            </p>
            
            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Financial Information Disclaimer
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  The information provided on this website is for general informational purposes only. It should not be considered as financial advice or a recommendation to buy or sell any security or financial product.
                </p>
                <p className="text-slate-600">
                  All content is presented without any warranty, express or implied, regarding its accuracy, completeness, or timeliness.
                </p>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                No Investment Advice
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  The content on this website is not intended to be investment advice. We do not provide personalized investment advice. The information is provided as an educational resource only.
                </p>
                <p className="text-slate-600">
                  Before making any investment decisions, you should consult with a qualified financial advisor to determine what may be appropriate for your individual needs.
                </p>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Data Accuracy
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  While we strive to provide accurate and up-to-date information, there may be inadvertent technical or factual inaccuracies and typographical errors. We reserve the right to make changes and corrections at any time, without notice.
                </p>
                <p className="text-slate-600">
                  We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk.
                </p>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                Third-Party Links
              </h2>
              <div className="pl-11">
                <p className="text-slate-600">
                  This website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                Limitation of Liability
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  In no event shall ColomboStockExchange.info, its operators, or any related parties be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of, or inability to use, this website.
                </p>
                <p className="text-slate-600">
                  Your use of this website and its content is entirely at your own risk.
                </p>
              </div>
            </section>
          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm">
              If you have any questions about this Disclaimer, please contact us at <a href="mailto:hello@colombostockexchange.info" className="text-primary-600 hover:underline">hello@colombostockexchange.info</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
