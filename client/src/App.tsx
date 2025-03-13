import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import  Footer  from "@/components/layout/Footer";

import About from "@/pages/about";
import Contact from "@/pages/contact";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Disclaimer from "@/pages/disclaimer";
import FixedDepositPage from "@/pages/home-fd";
import CompareRatesPage from "@/pages/compare-rates";
import BanksPage from "@/pages/banks";
import CalculatorsPage from "@/pages/calculators";
import BankDetailsPage from "@/pages/bank-details";
import Header from "./components/layout/Header";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header/>
    <div className="min-h-screen flex flex-col">
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/cse-dividend-history" component={Dashboard} />
      <Route path="/sri-lanka-fixed-deposit-interest-rates" component={FixedDepositPage} />
      <Route path="/compare-rates" component={CompareRatesPage} />
      <Route path="/sri-lanka-banks" component={BanksPage} />
      <Route path="/banks/:id" component={BankDetailsPage} />
      <Route path="/finance-calculator" component={CalculatorsPage} />
      <Route component={NotFound} />
    </Switch>
    <Footer/>
    </div>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
        </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;