import React from 'react';
import { motion } from 'framer-motion';
import { Building, Truck, Factory, Package, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Building,
    title: 'Temple Collection',
    description: '38,000+ temples across Tamil Nadu',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: Truck,
    title: 'SHG Processing',
    description: '450+ women-led micro-units',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Factory,
    title: 'Quality Control',
    description: 'Lab-tested & certified',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Package,
    title: 'B2B Delivery',
    description: 'Direct to manufacturers',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
];

export default function ProcessFlow() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sacred to Scientific
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our vertically-integrated supply chain ensures quality, traceability, and impact at every step
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-200 via-amber-200 to-blue-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100 relative z-10">
                  <div className={`w-14 h-14 ${step.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-20 w-8 h-8 bg-white rounded-full items-center justify-center shadow-md -translate-y-1/2">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}