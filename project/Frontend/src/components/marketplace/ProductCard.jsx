import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, AlertCircle, FileText, Droplets, Calendar, Truck, Grid3X3 } from 'lucide-react';
import CategoryIcon from '@/components/ui/CategoryIcon';

export default function ProductCard({ product, onRequestQuote, delay = 0 }) {
  // Defensive checks for product data
  if (!product) {
    return null;
  }

  const statusConfig = {
    available: { icon: CheckCircle2, label: 'In Stock', class: 'bg-emerald-100 text-emerald-700' },
    limited: { icon: AlertCircle, label: 'Limited', class: 'bg-amber-100 text-amber-700' },
    out_of_stock: { icon: Clock, label: 'Out of Stock', class: 'bg-gray-100 text-gray-600' },
    coming_soon: { icon: Clock, label: 'Coming Soon', class: 'bg-blue-100 text-blue-700' },
  };

  const status = statusConfig[product.status] || statusConfig.available;
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="h-full hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
              <CategoryIcon category={product.category || 'flower'} className="w-16 h-16 text-amber-300" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className={status.class}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg text-gray-900">{product.name || 'Unknown Product'}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description || 'No description available'}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {product.moisture_content && (
              <div className="flex items-center gap-2 text-gray-600">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span>Moisture: {product.moisture_content}%</span>
              </div>
            )}
            {product.mesh_size && (
              <div className="flex items-center gap-2 text-gray-600">
                <Grid3X3 className="w-4 h-4 text-amber-400" />
                <span>Mesh: {product.mesh_size}</span>
              </div>
            )}
            {product.monthly_availability_tonnes && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{product.monthly_availability_tonnes}T/month</span>
              </div>
            )}
            {product.lead_time_days && (
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-4 h-4 text-purple-400" />
                <span>{product.lead_time_days} days lead</span>
              </div>
            )}
          </div>

          {/* Flower composition */}
          {product.flower_composition && Object.keys(product.flower_composition).length > 0 && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Flower Composition</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(product.flower_composition).map(([flower, percentage]) => (
                  <Badge key={flower} variant="outline" className="text-xs">
                    {flower}: {percentage}%
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">
                {product.certifications.join(', ')}
              </span>
            </div>
          )}

          {/* Price & CTA */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Price Range</p>
              <p className="font-semibold text-gray-900">
                ₹{product.price_min || 0} - ₹{product.price_max || 0}/kg
              </p>
              {product.moq_kg && (
                <p className="text-xs text-gray-400">MOQ: {product.moq_kg} kg</p>
              )}
            </div>
            <Button
              onClick={() => onRequestQuote && onRequestQuote(product)}
              disabled={product.status === 'coming_soon' || product.status === 'out_of_stock'}
              className="bg-amber-500 hover:bg-amber-600"
            >
              Request Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}