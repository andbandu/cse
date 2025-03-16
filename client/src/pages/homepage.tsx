

import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import DividendsPreview from "@/components/DividendsPreview";
import FDRatesPreview from "@/components/FDRatesPreview";
import { Helmet } from "react-helmet";

export default function HomePage() {
    const heroData = {
        title: "Your Gateway to Sri Lanka’s Stock Dividend History and FD Rates",
        description: "Explore historical stock dividend data and compare fixed deposit rates in Sri Lanka",
        primaryButton: {
          text: "Explore Stock Dividends",
          link: "/cse-dividend-history",
        },
        secondaryButton: {
          text: "Check FD Rates",
          link: "/sri-lanka-fixed-deposit-interest-rates",
        },
      };
  return (
    <>

    <Helmet>
        <title>Your Gateway to Sri Lanka’s Stock Dividend History and FD Rates | Colombostockexchange.info</title>
        <meta
          name="description"
          content="Explore historical stock dividend data and compare fixed deposit rates in Sri Lanka"
        />
        <link rel="canonical" href="/" />
    </Helmet>
    <div className="min-h-screen flex flex-col">
      

    <Hero
        title={heroData.title}
        description={heroData.description}
        primaryButton={heroData.primaryButton}
        secondaryButton={heroData.secondaryButton}
      />
      <main>
        <FeaturesSection />
        <DividendsPreview />
        <FDRatesPreview />
        <TestimonialsSection /> 
        <CTASection />
      </main>
      
    </div>
    </>
  );
}
