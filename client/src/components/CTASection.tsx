import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-blue-800 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ready to Make Informed Financial Decisions?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Start exploring comprehensive dividend data and FD rates today to maximize your investment potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-800 hover:bg-gray-300 shadow-lg font-medium"
            >
              <a href="/cse-dividend-history">
                Explore Stock Dividends
              </a>
            </Button>
            
            <Button 
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border border-amber-400 shadow-lg font-medium"
            >
              <a href="/sri-lanka-fixed-deposit-interest-rates">
                Check FD Rates
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
