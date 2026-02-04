import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Leaf } from 'lucide-react';
import { IncenseIcon, CompostIcon, DyeIcon, EssentialOilIcon } from '@/components/ui/CategoryIcon';
import { ProductCardSkeleton } from '@/components/ui/SkeletonCard';
import EmptyState from '@/components/ui/EmptyState';
import ProductCard from '@/components/marketplace/ProductCard';
import RFQModal from '@/components/marketplace/RFQModal';

// Demo products for display
const demoProducts = [
  {
    id: '1',
    name: 'Premium Incense-Grade Marigold Powder',
    category: 'incense_powder',
    description: 'Fine-ground marigold powder ideal for agarbatti manufacturing. Sourced from temple offerings across Thanjavur district.',
    flower_composition: { Marigold: 85, Rose: 10, Jasmine: 5 },
    moisture_content: 8,
    mesh_size: '80-100 mesh',
    monthly_availability_tonnes: 25,
    moq_kg: 500,
    price_min: 45,
    price_max: 65,
    lead_time_days: 7,
    certifications: ['ISO 9001', 'NPOP Organic'],
    status: 'available',
    image_url: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Mixed Floral Incense Powder',
    category: 'incense_powder',
    description: 'Blend of temple flowers including rose, jasmine, and hibiscus. Perfect for premium incense products.',
    flower_composition: { Rose: 40, Jasmine: 30, Hibiscus: 20, Others: 10 },
    moisture_content: 7,
    mesh_size: '100-120 mesh',
    monthly_availability_tonnes: 18,
    moq_kg: 250,
    price_min: 75,
    price_max: 95,
    lead_time_days: 10,
    certifications: ['ISO 9001', 'GreenPro'],
    status: 'available',
    image_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Temple Flower Vermicompost',
    category: 'compost',
    description: 'Nutrient-rich organic vermicompost processed from temple floral waste. NPK balanced for optimal plant growth.',
    flower_composition: { Mixed: 100 },
    moisture_content: 35,
    mesh_size: 'N/A',
    monthly_availability_tonnes: 120,
    moq_kg: 1000,
    price_min: 8,
    price_max: 12,
    lead_time_days: 5,
    certifications: ['NPOP Organic', 'FSSAI'],
    status: 'available',
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Premium Organic Compost',
    category: 'compost',
    description: 'High-quality composted floral waste, perfect for organic farming and horticulture applications.',
    flower_composition: { Mixed: 100 },
    moisture_content: 40,
    mesh_size: 'N/A',
    monthly_availability_tonnes: 80,
    moq_kg: 2000,
    price_min: 5,
    price_max: 8,
    lead_time_days: 3,
    certifications: ['NPOP Organic'],
    status: 'available',
    image_url: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Marigold Yellow Dye Extract',
    category: 'natural_dye',
    description: 'Natural yellow-orange dye extracted from temple marigolds. Ideal for textile and fabric dyeing.',
    flower_composition: { Marigold: 100 },
    moisture_content: 5,
    mesh_size: 'Liquid concentrate',
    monthly_availability_tonnes: 5,
    moq_kg: 50,
    price_min: 450,
    price_max: 600,
    lead_time_days: 14,
    certifications: ['GOTS', 'OEKO-TEX'],
    status: 'limited',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Hibiscus Red Dye Extract',
    category: 'natural_dye',
    description: 'Deep red natural dye from hibiscus flowers. Perfect for eco-friendly textile applications.',
    flower_composition: { Hibiscus: 100 },
    moisture_content: 5,
    mesh_size: 'Powder form',
    monthly_availability_tonnes: 3,
    moq_kg: 25,
    price_min: 550,
    price_max: 750,
    lead_time_days: 14,
    certifications: ['GOTS'],
    status: 'limited',
    image_url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=300&fit=crop',
  },
  {
    id: '7',
    name: 'Rose Essential Oil',
    category: 'essential_oil',
    description: 'Pure rose essential oil extracted from temple rose offerings. Premium grade for cosmetics.',
    flower_composition: { Rose: 100 },
    moisture_content: 0,
    mesh_size: 'N/A',
    monthly_availability_tonnes: 0.5,
    moq_kg: 5,
    price_min: 15000,
    price_max: 22000,
    lead_time_days: 21,
    certifications: ['ISO 9001', 'COSMOS'],
    status: 'coming_soon',
    image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
  },
  {
    id: '8',
    name: 'Jasmine Absolute Oil',
    category: 'essential_oil',
    description: 'Luxurious jasmine absolute from temple offerings. For high-end perfumery and cosmetics.',
    flower_composition: { Jasmine: 100 },
    moisture_content: 0,
    mesh_size: 'N/A',
    monthly_availability_tonnes: 0.3,
    moq_kg: 2,
    price_min: 35000,
    price_max: 50000,
    lead_time_days: 30,
    certifications: ['ISO 9001'],
    status: 'coming_soon',
    image_url: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop',
  },
];

const categories = [
  { id: 'all', label: 'All Products', icon: Leaf },
  { id: 'incense_powder', label: 'Incense Powder', icon: IncenseIcon },
  { id: 'compost', label: 'Compost', icon: CompostIcon },
  { id: 'natural_dye', label: 'Natural Dyes', icon: DyeIcon },
  { id: 'essential_oil', label: 'Essential Oils', icon: EssentialOilIcon },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  const { data: products = demoProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Using local demo data instead of backend
      return demoProducts;
    },
    initialData: demoProducts,
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestQuote = (product) => {
    setSelectedProduct(product);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-bold mb-4">B2B Raw Material Marketplace</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Industrial-grade, sustainably sourced materials from Tamil Nadu's temple floral waste
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="bg-gray-100">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                    <cat.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                {filteredProducts.filter(p => p.status === 'available').length} In Stock
              </Badge>
              <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                {filteredProducts.filter(p => p.status === 'limited').length} Limited
              </Badge>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequestQuote={handleRequestQuote}
              delay={index * 0.05}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="col-span-full">
            <EmptyState
              icon={Leaf}
              title="No products found"
              description="Try adjusting your search or filter criteria to find what you're looking for."
              action={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              actionLabel="Clear Filters"
            />
          </div>
        )}
      </div>

      <RFQModal
        open={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}