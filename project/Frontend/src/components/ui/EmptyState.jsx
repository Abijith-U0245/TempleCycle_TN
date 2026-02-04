import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  actionLabel,
  illustration = 'default'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center">
          {Icon && <Icon className="w-16 h-16 text-amber-300" />}
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-200 rounded-full opacity-60" />
        <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-emerald-200 rounded-full opacity-60" />
        <div className="absolute top-1/2 -right-4 w-3 h-3 bg-red-200 rounded-full opacity-60" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>

      {action && actionLabel && (
        <Button onClick={action} className="bg-amber-500 hover:bg-amber-600">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}