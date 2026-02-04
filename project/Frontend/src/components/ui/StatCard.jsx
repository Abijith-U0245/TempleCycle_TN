import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function StatCard({ icon: Icon, label, value, suffix = '', prefix = '', color = 'amber', delay = 0 }) {
  const colorClasses = {
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`p-6 rounded-2xl border ${colorClasses[color]} backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6" />
        <span className="text-sm font-medium opacity-80">{label}</span>
      </div>
      <div className="text-3xl font-bold">
        <AnimatedCounter end={value} prefix={prefix} suffix={suffix} />
      </div>
    </motion.div>
  );
}