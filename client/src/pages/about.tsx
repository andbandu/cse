import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <div className="space-y-4">
          <p>
            Welcome to our dividend tracking platform. We provide comprehensive
            data on company dividends to help investors make informed decisions
            about their investments.
          </p>
          <p>
            Our mission is to make dividend information accessible and easy to
            understand for all investors, from beginners to professionals. We
            aggregate data from reliable sources and present it in a
            user-friendly format.
          </p>
          <p>
            Our team of financial experts and data analysts work tirelessly to
            ensure that the information provided is accurate and up-to-date. We
            believe that transparent and accessible financial data is essential
            for a healthy investment ecosystem.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
