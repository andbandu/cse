import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/fd/hero-section";
import RatesTable from "@/components/fd/rates-table";
import Calculator from "@/components/fd/calculator";
import FeaturedBanks from "@/components/fd/featured-banks";
import { useFilters } from "@/hooks/use-filters";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function FixedDepositPage() {
  const filters = useFilters();

  // Format amount to comma-separated string
  const formattedAmount = new Intl.NumberFormat("en-US").format(filters.amount);

  return (
    <>
      <Helmet>
        <title>Sri Lanka's Best Fixed Deposit Rates </title>
        <meta
          name="description"
          content="Compare the best fixed deposit rates from Sri Lanka's leading banks and financial institutions to maximize your returns."
        />
      </Helmet>
      <Header />
      <HeroSection />
      <RatesTable />
      <Calculator />
      <FeaturedBanks />
      <Footer />
    </>
  );
}
