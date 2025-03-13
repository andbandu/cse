import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Calculator from "@/components/fd/calculator";
import { Helmet } from "react-helmet";

export default function CalculatorsPage() {
  return (
    <>
      <Helmet>
        <title>Fixed Deposit Calculator | colombostockexchange.info</title>
        <meta name="description" content="Use our financial calculators to plan your fixed deposits and investments." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Financial Calculators
          </h1>
          <p className="text-white/90">
            Plan your investments and calculate potential returns
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Choose a Calculator</CardTitle>
            <CardDescription>
              Select from our range of financial calculators to help you make informed decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="fixed-deposit">
              <TabsList className="mb-8">
                <TabsTrigger value="fixed-deposit">Fixed Deposit</TabsTrigger>
                <TabsTrigger value="compound-interest">Compound Interest</TabsTrigger>
                <TabsTrigger value="loan">Loan</TabsTrigger>
                <TabsTrigger value="retirement">Retirement</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fixed-deposit">
                <Calculator />
              </TabsContent>
              
              <TabsContent value="compound-interest">
                <div className="text-center py-20">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Compound Interest Calculator
                  </h3>
                  <p className="text-gray-500 max-w-lg mx-auto">
                    This calculator will be available soon. Please check back later to calculate compound interest on your investments.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="loan">
                <div className="text-center py-20">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Loan Repayment Calculator
                  </h3>
                  <p className="text-gray-500 max-w-lg mx-auto">
                    This calculator will be available soon. Please check back later to calculate your loan repayments.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="retirement">
                <div className="text-center py-20">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Retirement Planner
                  </h3>
                  <p className="text-gray-500 max-w-lg mx-auto">
                    This calculator will be available soon. Please check back later to plan for your retirement.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Our Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Enter the initial deposit amount</li>
                  <li>Set the interest rate offered by the bank</li>
                  <li>Select the fixed deposit term period</li>
                  <li>Add withholding tax rate if applicable</li>
                  <li>Click calculate to see projected returns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Disclaimer</h3>
                <p className="text-gray-600">
                  These calculators are for informational purposes only. The actual returns may vary based on the bank's terms and conditions, as well as changes in interest rates and tax regulations. Always consult with a financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
