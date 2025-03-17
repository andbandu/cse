import { Link } from "wouter";
import { ChevronRight, LineChart, Search } from "lucide-react";
import { motion } from "framer-motion";
import GoogleAdsComponent from "./GoogleAdsComponent";

interface HeroProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
}

export default function Hero({
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoMTJWMThIMzZ2MTJ6TTYgMThoMTJ2LTZINnY2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="max-w-4xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              {title}
            </span>
          </h1>
          <motion.p
            className="text-xl opacity-90 mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={primaryButton.link}
              className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium px-7 py-3.5 rounded-lg text-center transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              <span>{primaryButton.text}</span>
              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -mr-1 transition-all" />
            </a>

            <a
              href={secondaryButton.link}
              className="group bg-white hover:bg-slate-50 text-black font-medium px-7 py-3.5 rounded-lg text-center transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <LineChart className="h-5 w-5" />
              <span>{secondaryButton.text}</span>
              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -mr-1 transition-all" />
            </a>
          </motion.div>
        </motion.div>
        {/* <div className="md:absolute bottom-0 right-0 md:right-10 w-full md:w-1/3 xl:w-1/4 p-4">
          <GoogleAdsComponent 
            className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
            style={{ minHeight: '250px' }} 
          />
        </div> */}
      </div>
    </section>
  );
}
