import { motion } from "framer-motion";
import { 
  BarChart, 
  Calculator, 
  Sliders, 
  LineChart, 
  Zap, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: <BarChart className="h-6 w-6 text-primary-600" />,
    title: "Accurate Historical Data",
    description: "Access reliable historical stock dividend data that's verified and regularly updated to ensure accuracy."
  },
  {
    icon: <Calculator className="h-6 w-6 text-primary-600" />,
    title: "Easy Comparisons",
    description: "Compare fixed deposit rates across multiple banks in Sri Lanka with our intuitive comparison tools."
  },
  {
    icon: <Sliders className="h-6 w-6 text-primary-600" />,
    title: "Customizable Filters",
    description: "Filter data based on various parameters like date range, dividend yield, or bank offerings to find exactly what you need."
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary-600" />,
    title: "Interactive Visualizations",
    description: "Visualize trends and patterns with interactive charts and graphs that make complex data easy to understand."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary-600" />,
    title: "Real-Time Updates",
    description: "Stay informed with the latest updates on fixed deposit rates and dividend announcements from Sri Lankan companies."
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary-600" />,
    title: "Mobile Friendly",
    description: "Access our platform on any device with our responsive design that works seamlessly on desktop, tablet, and mobile."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Why Choose Our Platform
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We provide comprehensive financial data with a focus on usability and accuracy
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              variants={item}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
