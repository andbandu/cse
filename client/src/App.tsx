import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import DividendPage from "@/pages/dividend";
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
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/homepage";
import FdCal from "./pages/fd-cal";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header /> {/* Add Header here */}
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/cse-dividend-history" component={DividendPage} />
        <Route
          path="/sri-lanka-fixed-deposit-interest-rates"
          component={FixedDepositPage}
        />
        <Route path="/sri-lanka-banks" component={BanksPage} />
        <Route path="/sri-lanka-banks/:id" component={BankDetailsPage} />
        <Route path="/compare-rates" component={CompareRatesPage} />
        <Route path="/fd-calculator" component={FdCal} />
        <Route component={NotFound} />
      </Switch>
      <Footer /> {/* Add Footer here */}
      <Toaster />
    </QueryClientProvider>
  );
}