import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our service, you agree to be bound by these
              Terms of Service. If you disagree with any part of the terms, you
              may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use of Service</h2>
            <p>
              Our service provides information about company dividends. This
              information is provided for educational and informational purposes
              only and should not be construed as financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and
              complete information. You are responsible for safeguarding the
              password and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Content</h2>
            <p>
              Our service allows you to access content related to company
              dividends. The content is provided "as is" and we make no
              warranties regarding its accuracy or completeness.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these terms at any time.
              If a revision is material, we will provide at least 30 days'
              notice prior to any new terms taking effect.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
