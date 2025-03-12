import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="space-y-6">
          <p>
            Have questions or feedback? We'd love to hear from you. Please use
            the information below to get in touch with our team.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">General Inquiries</h2>
              <p className="mb-2">Email: info@dividendtracker.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Technical Support</h2>
              <p className="mb-2">Email: support@dividendtracker.com</p>
              <p>Phone: +1 (555) 987-6543</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Office Location</h2>
            <p>123 Financial District</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
