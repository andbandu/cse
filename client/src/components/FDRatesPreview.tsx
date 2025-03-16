import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FDRatesPreview() {
  const benefits = [
    "Compare rates from all major Sri Lankan banks",
    "Filter by term length, minimum deposit, and more",
    "Calculate potential returns with our FD calculator"
  ];

  return (
    <section id="fdrates" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80" 
              alt="Fixed deposit comparisons" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Compare Fixed Deposit Rates
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Find the best fixed deposit rates offered by banks in Sri Lanka to maximize your returns on investments.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary-600 mt-1 mr-2" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white shadow-md">
              <a href="#" className="px-6 py-1.5">
                Check Current FD Rates
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
