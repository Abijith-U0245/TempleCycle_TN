import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KPICard({ title, value, unit, trend, trendValue, icon: Icon, color = 'amber', delay = 0 }) {
  const colorClasses = {
    amber: 'from-amber-500 to-orange-500 shadow-amber-500/25',
    emerald: 'from-emerald-500 to-green-500 shadow-emerald-500/25',
    blue: 'from-blue-500 to-cyan-500 shadow-blue-500/25',
    red: 'from-red-500 to-rose-500 shadow-red-500/25',
    purple: 'from-purple-500 to-violet-500 shadow-purple-500/25',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{value.toLocaleString('en-IN')}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
    </motion.div>
  );
}