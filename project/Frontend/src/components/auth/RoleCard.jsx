import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

export default function RoleCard({ 
  icon: Icon, 
  title, 
  description, 
  color = 'amber',
  onClick,
  delay = 0 
}) {
  const colorClasses = {
    amber: {
      bg: 'bg-gradient-to-br from-amber-500 to-orange-500',
      hover: 'hover:from-amber-600 hover:to-orange-600',
      light: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500 to-green-500',
      hover: 'hover:from-emerald-600 hover:to-green-600',
      light: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-600',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      hover: 'hover:from-blue-600 hover:to-cyan-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-500 to-rose-500',
      hover: 'hover:from-red-600 hover:to-rose-600',
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-violet-500',
      hover: 'hover:from-purple-600 hover:to-violet-600',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`cursor-pointer overflow-hidden border-2 ${colors.border} hover:shadow-xl transition-all duration-300 group`}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className={`p-4 rounded-2xl ${colors.bg} shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <ChevronRight className={`w-6 h-6 ${colors.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          
          <div className={`mt-4 pt-4 border-t ${colors.border}`}>
            <span className={`text-sm font-medium ${colors.text}`}>
              Sign in →
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}