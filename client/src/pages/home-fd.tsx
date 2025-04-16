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

  useEffect(() => {
    // Load the script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.dataset.cfasync = 'false';
    script.src = '//pl26345529.profitableratecpm.com/f7240b5403c30b43f62242912e1688b4/invoke.js';
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sri Lanka's Best Fixed Deposit Rates</title>
        <meta
          name="description"
          content="Compare the best fixed deposit rates from Sri Lanka's leading banks and financial institutions to maximize your returns."
        />
        <meta
          name="keywords"
          content="Sri Lanka fixed deposit rates, best fixed deposit rates Sri Lanka, fixed deposit interest rates, Sri Lanka banks, financial institutions Sri Lanka"
        />
        <link rel="canonical" href="/sri-lanka-fixed-deposit-interest-rates" />
      </Helmet>
     
      <HeroSection />
      <RatesTable
        title="Top Maturity Interest Banks"
        description="Compare the highest maturity interest rates from leading banks and financial institutions"
        limit={5}
        filters={{
          term: 12,
          payoutOption: "maturity"
        }}
      />
      <Calculator />
      <div id="container-f7240b5403c30b43f62242912e1688b4"></div>
      <FeaturedBanks />
    </>
  );
}