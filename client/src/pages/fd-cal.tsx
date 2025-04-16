

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Calculator from "@/components/fd/calculator";

export default function FdCal() {

  return (
    <>
      <Helmet>
      <title>Sri Lanka FD Financial Calculator | Colombostockexchange.info</title>
      <meta
        name="description"
        content="Calculate fixed deposit (FD) interest earnings and compare rates from top banks in Sri Lanka. Use our free FD financial calculator to plan your investments and maximize returns."
      />
      <link rel="canonical" href="https://colombostockexchange.info/fd-calculator" />
      <meta name="keywords" content="Sri Lanka FD calculator, fixed deposit calculator Sri Lanka, FD interest rates Sri Lanka, compare FD rates Sri Lanka, financial calculator Sri Lanka" />
    </Helmet>
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <motion.div className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
          Sri Lanka FD Financial Calculator
          </h1>
          <motion.p 
            className="text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Calculate fixed deposit (FD) interest earnings and compare rates from top banks in Sri Lanka.
          </motion.p>
        </motion.div>
      </div>
      <script async="async" data-cfasync="false" src="//pl26345529.profitableratecpm.com/f7240b5403c30b43f62242912e1688b4/invoke.js"></script>
      <div id="container-f7240b5403c30b43f62242912e1688b4"></div>
      <Calculator />
    </>
  );
}
