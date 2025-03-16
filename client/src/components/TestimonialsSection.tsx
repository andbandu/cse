import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    rating: 5,
    text: "This platform has transformed how I track dividend stocks in Sri Lanka. The historical data is comprehensive and the interface is intuitive.",
    name: "Rajith Kumara",
    role: "Individual Investor",
    initials: "RK"
  },
  {
    rating: 5,
    text: "The FD rate comparison tool has saved me hours of research. I was able to find the best rates and maximize my returns easily.",
    name: "Samantha Perera",
    role: "Retail Banking Customer",
    initials: "SP"
  },
  {
    rating: 5,
    text: "As a financial advisor, I rely on accurate data for my clients. This platform provides reliable information that I can trust for my recommendations.",
    name: "Malith Fernando",
    role: "Financial Advisor",
    initials: "MF"
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

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from investors and financial professionals who use our platform
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm"
              variants={item}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-700 font-semibold">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
