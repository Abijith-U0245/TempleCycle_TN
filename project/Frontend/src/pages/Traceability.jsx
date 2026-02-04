import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/Logo';
import { TempleIcon, SHGIcon, FlowerIcon } from '@/components/ui/CategoryIcon';
import { 
  QrCode, Search, Calendar, Leaf, Users, 
  CheckCircle2, MapPin, Package, Award, Truck
} from 'lucide-react';

// Demo batch data
const demoBatch = {
  batchId: 'TCTC-2024-01-2847',
  productName: 'Premium Marigold Incense Powder',
  productionDate: '2024-01-25',
  expiryDate: '2025-01-25',
  quantity: '500 kg',
  grade: 'A+',
  status: 'verified',
  sourceTemples: [
    { name: 'Sri Meenakshi Temple', district: 'Madurai', contribution: '35%' },
    { name: 'Thiruparankundram Temple', district: 'Madurai', contribution: '25%' },
    { name: 'Alagar Kovil', district: 'Madurai', contribution: '20%' },
    { name: 'Koodal Azhagar Temple', district: 'Madurai', contribution: '20%' },
  ],
  shgUnit: {
    name: 'Madurai Women\'s Self Help Group',
    leader: 'Mrs. Lakshmi Devi',
    members: 24,
    district: 'Madurai',
    photo: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop',
  },
  flowerComposition: {
    Marigold: 85,
    Rose: 10,
    Jasmine: 5,
  },
  qualityMetrics: {
    moisture: { value: 7.5, standard: '< 8%' },
    purity: { value: 98.5, standard: '> 95%' },
    meshSize: { value: '100 mesh', standard: '80-120 mesh' },
  },
  impact: {
    wasteProcessed: 650,
    co2Avoided: 0.42,
    womenBenefited: 24,
  },
  certifications: ['ISO 9001:2015', 'NPOP Organic', 'GreenPro'],
  journey: [
    { step: 'Collection', date: '2024-01-20', location: 'Madurai Temples', status: 'complete' },
    { step: 'Segregation', date: '2024-01-21', location: 'SHG Unit', status: 'complete' },
    { step: 'Drying', date: '2024-01-22', location: 'SHG Unit', status: 'complete' },
    { step: 'Grinding', date: '2024-01-24', location: 'SHG Unit', status: 'complete' },
    { step: 'Quality Check', date: '2024-01-25', location: 'QC Lab', status: 'complete' },
    { step: 'Packaging', date: '2024-01-25', location: 'SHG Unit', status: 'complete' },
  ],
};

export default function Traceability() {
  const [batchCode, setBatchCode] = useState('');
  const [showResult, setShowResult] = useState(true);
  const batch = demoBatch;

  const handleSearch = () => {
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <QrCode className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Product Traceability</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Scan QR code or enter batch ID to trace your product from temple to delivery
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <Card className="-mt-12 mb-8 shadow-xl border-0">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Enter Batch ID (e.g., TCTC-2024-01-2847)"
                  value={batchCode}
                  onChange={(e) => setBatchCode(e.target.value)}
                  className="pl-10 text-lg h-12"
                />
              </div>
              <Button onClick={handleSearch} className="bg-amber-500 hover:bg-amber-600 h-12 px-8">
                Trace Product
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Product Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Badge className="bg-emerald-100 text-emerald-700 mb-2">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified Product
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-900">{batch.productName}</h2>
                    <p className="text-gray-500">Batch ID: {batch.batchId}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-amber-100 text-amber-700 text-lg px-3 py-1">
                      Grade: {batch.grade}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Production Date</p>
                    <p className="font-semibold text-gray-900">{batch.productionDate}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Package className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-semibold text-gray-900">{batch.quantity}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Origin</p>
                    <p className="font-semibold text-gray-900">Madurai District</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Certifications</p>
                    <p className="font-semibold text-gray-900">{batch.certifications.length} Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Source Temples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TempleIcon className="w-5 h-5 text-red-500" />
                  Source Temples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {batch.sourceTemples.map((temple, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <TempleIcon className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{temple.name}</p>
                        <p className="text-sm text-gray-500">{temple.district}</p>
                      </div>
                      <Badge variant="outline">{temple.contribution}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SHG Unit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SHGIcon className="w-5 h-5 text-amber-500" />
                  Processing Unit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={batch.shgUnit.photo}
                    alt={batch.shgUnit.name}
                    className="w-full md:w-48 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{batch.shgUnit.name}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Group Leader</p>
                        <p className="font-medium text-gray-900">{batch.shgUnit.leader}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Members</p>
                        <p className="font-medium text-gray-900">{batch.shgUnit.members} women</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{batch.shgUnit.district} District</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <Badge className="bg-emerald-100 text-emerald-700">Verified Partner</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flower Composition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlowerIcon className="w-5 h-5 text-emerald-500" />
                  Flower Composition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(batch.flowerComposition).map(([flower, percentage]) => (
                    <div key={flower}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{flower}</span>
                        <span className="text-gray-500">{percentage}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            flower === 'Marigold' ? 'bg-amber-400' :
                            flower === 'Rose' ? 'bg-rose-400' : 'bg-purple-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(batch.qualityMetrics).map(([metric, data]) => (
                    <div key={metric} className="p-4 bg-blue-50 rounded-xl text-center">
                      <p className="text-sm text-gray-500 capitalize mb-1">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">{data.value}</p>
                      <p className="text-xs text-blue-600">Standard: {data.standard}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Journey Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-purple-500" />
                  Product Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {batch.journey.map((step, index) => (
                    <div key={index} className="flex gap-4 pb-6 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === 'complete' ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}>
                          <CheckCircle2 className={`w-4 h-4 ${
                            step.status === 'complete' ? 'text-white' : 'text-gray-400'
                          }`} />
                        </div>
                        {index < batch.journey.length - 1 && (
                          <div className={`w-0.5 flex-1 mt-2 ${
                            step.status === 'complete' ? 'bg-emerald-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{step.step}</h4>
                          <span className="text-sm text-gray-500">{step.date}</span>
                        </div>
                        <p className="text-sm text-gray-500">{step.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Card */}
            <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Environmental Impact of This Batch</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-3xl font-bold">{batch.impact.wasteProcessed} kg</p>
                    <p className="text-sm text-white/80">Floral Waste Processed</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-3xl font-bold">{batch.impact.co2Avoided} T</p>
                    <p className="text-sm text-white/80">CO₂ Avoided</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-3xl font-bold">{batch.impact.womenBenefited}</p>
                    <p className="text-sm text-white/80">Women Benefited</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3 justify-center">
              {batch.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="px-4 py-2 text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  {cert}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}