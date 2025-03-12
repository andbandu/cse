
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Financial Information Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only. It should not be
              considered as financial advice or a recommendation to buy or sell any security or financial product.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">No Investment Advice</h2>
            <p>
              The content on this website is not intended to be investment advice. We do not provide personalized
              investment advice. The information is provided as an educational resource only.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and up-to-date information, we make no representations or warranties
              of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability
              of the information contained on the website.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Investment Risks</h2>
            <p>
              All investments involve risk, including the possible loss of principal. Past performance does not guarantee
              future results. You should always conduct your own research and consult with a qualified financial advisor
              before making any investment decisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">External Links</h2>
            <p>
              Our website may contain links to external websites that are not provided or maintained by us. We do not
              guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
