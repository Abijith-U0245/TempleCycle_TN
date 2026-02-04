import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/ui/Logo';
import { 
  Package, FileText, TrendingUp, Download, CheckCircle2, 
  ShoppingCart, Leaf, Building, Award, ExternalLink, LogOut
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

// Demo buyer data
const buyerInfo = {
  company: 'Sri Ganesh Agarbatti Industries',
  industry: 'Incense Manufacturing',
  since: 'March 2023',
  totalOrders: 24,
  totalValue: 1245000,
};

const activeContracts = [
  {
    id: 'CON-001',
    product: 'Premium Marigold Powder',
    monthly_qty: 2500,
    price_per_kg: 55,
    start_date: '2024-01-01',
    end_date: '2024-06-30',
    delivered: 7500,
    total_qty: 15000,
    status: 'active',
  },
  {
    id: 'CON-002',
    product: 'Mixed Floral Powder',
    monthly_qty: 1000,
    price_per_kg: 82,
    start_date: '2024-02-01',
    end_date: '2024-07-31',
    delivered: 2000,
    total_qty: 6000,
    status: 'active',
  },
];

const recentOrders = [
  { id: 'ORD-1245', product: 'Marigold Powder', qty: 2500, date: '2024-01-25', status: 'delivered' },
  { id: 'ORD-1244', product: 'Marigold Powder', qty: 2500, date: '2024-01-10', status: 'delivered' },
  { id: 'ORD-1243', product: 'Mixed Floral', qty: 1000, date: '2024-01-05', status: 'delivered' },
  { id: 'ORD-1242', product: 'Marigold Powder', qty: 2500, date: '2023-12-25', status: 'delivered' },
];

const monthlySpend = [
  { month: 'Aug', amount: 85000 },
  { month: 'Sep', amount: 92000 },
  { month: 'Oct', amount: 105000 },
  { month: 'Nov', amount: 125000 },
  { month: 'Dec', amount: 142000 },
  { month: 'Jan', amount: 158000 },
];

const impactMetrics = {
  wasteProcessed: 18500,
  co2Avoided: 12.4,
  womenSupported: 45,
  templesCovered: 28,
};

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo size="sm" showText={false} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{buyerInfo.company}</h1>
                <p className="text-sm text-gray-500">{buyerInfo.industry} • Partner since {buyerInfo.since}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to={createPageUrl('Marketplace')}>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <Button className="bg-amber-500 hover:bg-amber-600" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                New RFQ
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                <Package className="w-8 h-8 text-amber-500 mb-3" />
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{buyerInfo.totalOrders}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-emerald-500 mb-3" />
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">₹{(buyerInfo.totalValue / 100000).toFixed(1)}L</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <FileText className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-sm text-gray-500">Active Contracts</p>
                <p className="text-3xl font-bold text-gray-900">{activeContracts.length}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <Leaf className="w-8 h-8 text-green-500 mb-3" />
                <p className="text-sm text-gray-500">Impact Score</p>
                <p className="text-3xl font-bold text-gray-900">A+</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Spend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Procurement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlySpend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" tickFormatter={(v) => `₹${v/1000}k`} />
                      <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Amount']} />
                      <Bar dataKey="amount" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Active Contracts Summary */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Active Contracts</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeContracts.map((contract) => (
                    <div key={contract.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{contract.product}</p>
                          <p className="text-sm text-gray-500">{contract.monthly_qty} kg/month @ ₹{contract.price_per_kg}/kg</p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Delivered</span>
                          <span className="font-medium">{contract.delivered.toLocaleString()} / {contract.total_qty.toLocaleString()} kg</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${(contract.delivered / contract.total_qty) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Deliveries</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Quantity</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                          <td className="py-3 px-4 text-gray-600">{order.product}</td>
                          <td className="py-3 px-4 text-gray-600">{order.qty.toLocaleString()} kg</td>
                          <td className="py-3 px-4 text-gray-500">{order.date}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-emerald-100 text-emerald-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Delivered
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Invoice
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Award className="w-4 h-4 mr-1" />
                                Certificate
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>Supply Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeContracts.map((contract) => (
                    <div key={contract.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{contract.product}</h3>
                            <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                          </div>
                          <p className="text-sm text-gray-500">Contract ID: {contract.id}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Volume</p>
                          <p className="font-semibold text-gray-900">{contract.monthly_qty.toLocaleString()} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price/kg</p>
                          <p className="font-semibold text-gray-900">₹{contract.price_per_kg}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contract Period</p>
                          <p className="font-semibold text-gray-900">{contract.start_date} to {contract.end_date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Value</p>
                          <p className="font-semibold text-gray-900">₹{(contract.total_qty * contract.price_per_kg).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Delivery Progress</span>
                          <span className="font-medium text-gray-900">
                            {contract.delivered.toLocaleString()} / {contract.total_qty.toLocaleString()} kg
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                            style={{ width: `${(contract.delivered / contract.total_qty) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>{Math.round((contract.delivered / contract.total_qty) * 100)}% Complete</span>
                          <span>{contract.total_qty - contract.delivered} kg remaining</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">Full order history coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <Leaf className="w-10 h-10 mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Waste Processed</p>
                  <p className="text-3xl font-bold">{impactMetrics.wasteProcessed.toLocaleString()} kg</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                <CardContent className="p-6">
                  <svg className="w-10 h-10 mb-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm opacity-80">CO₂ Avoided</p>
                  <p className="text-3xl font-bold">{impactMetrics.co2Avoided} T</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                <CardContent className="p-6">
                  <svg className="w-10 h-10 mb-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm opacity-80">Women Supported</p>
                  <p className="text-3xl font-bold">{impactMetrics.womenSupported}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white">
                <CardContent className="p-6">
                  <Building className="w-10 h-10 mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Temples Covered</p>
                  <p className="text-3xl font-bold">{impactMetrics.templesCovered}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Download Impact Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate and download your sustainability impact certificate for CSR reporting and compliance.
                </p>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}