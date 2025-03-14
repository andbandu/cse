import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Disclaimer from "@/pages/disclaimer";
import FixedDepositPage from "@/pages/home-fd";
import BanksPage from "@/pages/banks";
import BankDetailsPage from "@/pages/bank-details";
import CompareRatesPage from "@/pages/compare-rates";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={FixedDepositPage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/cse-dividend-history" component={Dashboard} />
        <Route
          path="/sri-lanka-fixed-deposit-interest-rates"
          component={FixedDepositPage}
        />
        <Route path="/banks" component={BanksPage} />
        <Route path="/banks/:id" component={BankDetailsPage} />
        <Route path="/compare-rates" component={CompareRatesPage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}
