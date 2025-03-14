import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { FiltersProvider } from "@/hooks/use-filters";
import FixedDepositPage from "@/pages/home-fd";
import BanksPage from "@/pages/banks";
import BankDetailsPage from "@/pages/bank-details";
import CompareRatesPage from "@/pages/compare-rates";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FiltersProvider>
        <Switch>
          <Route path="/" component={FixedDepositPage} />
          <Route path="/sri-lanka-banks" component={BanksPage} />
          <Route path="/bank/:id" component={BankDetailsPage} />
          <Route path="/compare-rates" component={CompareRatesPage} />
        </Switch>
        <Toaster />
      </FiltersProvider>
    </QueryClientProvider>
  );
}