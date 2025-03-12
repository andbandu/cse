import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as your
              name, email address, and any other information you choose to
              provide. We also collect information automatically when you use
              our service, including log data and device information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Use of Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our service, to communicate with you, and to comply with
              legal obligations. We may also use the information for research
              and analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Sharing of Information
            </h2>
            <p>
              We do not share your personal information with third parties
              except as described in this privacy policy. We may share
              information with service providers who perform services on our
              behalf, or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Security</h2>
            <p>
              We take reasonable measures to help protect your personal
              information from loss, theft, misuse, unauthorized access,
              disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Your Choices</h2>
            <p>
              You may update, correct, or delete your account information at any
              time by logging into your account or contacting us. You may also
              opt out of receiving promotional communications from us by
              following the instructions in those communications.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
