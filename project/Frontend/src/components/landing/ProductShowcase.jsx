import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IncenseIcon, CompostIcon, DyeIcon, EssentialOilIcon } from '@/components/ui/CategoryIcon';

const products = [
  {
    name: 'Incense-Grade Flower Powder',
    image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop',
    description: 'Premium quality dried flower powder for agarbatti manufacturing',
    availability: '45 tonnes/month',
    color: 'amber',
    status: 'available',
    icon: IncenseIcon,
  },
  {
    name: 'Organic Vermicompost',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    description: 'Nutrient-rich organic fertilizer from floral waste',
    availability: '120 tonnes/month',
    color: 'emerald',
    status: 'available',
    icon: CompostIcon,
  },
  {
    name: 'Natural Dye Extracts',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Marigold & hibiscus-based textile dyes',
    availability: '8 tonnes/month',
    color: 'orange',
    status: 'limited',
    icon: DyeIcon,
  },
  {
    name: 'Essential Oils',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
    description: 'Rose & jasmine essential oils for cosmetics',
    availability: 'Phase 2',
    color: 'rose',
    status: 'coming_soon',
    icon: EssentialOilIcon,
  },
];

export default function ProductShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Industrial-Grade Raw Materials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Traceable, certified, and sustainably produced from temple floral waste
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Icon overlay */}
                <div className="absolute bottom-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                  <product.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="absolute top-3 right-3">
                  {product.status === 'available' && (
                    <Badge className="bg-emerald-500 text-white">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Available
                    </Badge>
                  )}
                  {product.status === 'limited' && (
                    <Badge className="bg-amber-500 text-white">Limited Stock</Badge>
                  )}
                  {product.status === 'coming_soon' && (
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Coming Soon
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-600">{product.availability}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Marketplace')}>
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
              View Full Catalog
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}