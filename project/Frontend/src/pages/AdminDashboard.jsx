import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, Legend 
} from 'recharts';
import { 
  Package, TrendingUp, Users, Building, Truck, AlertTriangle, 
  DollarSign, Leaf, Search,
  MoreVertical, Eye, Edit, Bell, LogOut
} from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import ChartCard from '@/components/dashboard/ChartCard';
import Logo from '@/components/ui/Logo';
import { TempleIcon, SHGIcon } from '@/components/ui/CategoryIcon';

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];

// Demo data
const monthlyData = [
  { month: 'Aug', collected: 245, processed: 220, revenue: 185 },
  { month: 'Sep', collected: 280, processed: 265, revenue: 210 },
  { month: 'Oct', collected: 320, processed: 305, revenue: 255 },
  { month: 'Nov', collected: 410, processed: 385, revenue: 320 },
  { month: 'Dec', collected: 485, processed: 460, revenue: 390 },
  { month: 'Jan', collected: 520, processed: 495, revenue: 425 },
];

const categoryData = [
  { name: 'Incense Powder', value: 45, color: '#f59e0b' },
  { name: 'Compost', value: 35, color: '#10b981' },
  { name: 'Natural Dyes', value: 15, color: '#3b82f6' },
  { name: 'Others', value: 5, color: '#8b5cf6' },
];

const recentRFQs = [
  { id: 'RFQ-001', buyer: 'Sri Ganesh Agarbatti', product: 'Marigold Powder', qty: '2,500 kg', status: 'pending', date: '2024-01-28' },
  { id: 'RFQ-002', buyer: 'Tamil Textiles Ltd', product: 'Marigold Dye', qty: '500 kg', status: 'under_review', date: '2024-01-27' },
  { id: 'RFQ-003', buyer: 'Green Farms Co-op', product: 'Vermicompost', qty: '10,000 kg', status: 'quoted', date: '2024-01-26' },
  { id: 'RFQ-004', buyer: 'Aroma Incense Works', product: 'Mixed Floral', qty: '1,800 kg', status: 'accepted', date: '2024-01-25' },
];

const alerts = [
  { type: 'warning', message: 'Inventory buffer low for Marigold Powder (3 days)', time: '2h ago' },
  { type: 'info', message: 'Festival surge expected - Pongal orders incoming', time: '5h ago' },
  { type: 'success', message: 'New SHG approved: Thiruvannamalai Women\'s Collective', time: '1d ago' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Logo size="sm" showText={false} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Control Center</h1>
                <p className="text-sm text-gray-500">TempleCycle TN Operations Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Live</span>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Waste Collected Today"
            value={12450}
            unit="kg"
            trend="up"
            trendValue="+12%"
            icon={Leaf}
            color="emerald"
            delay={0}
          />
          <KPICard
            title="Inventory Buffer"
            value={8}
            unit="days"
            trend="down"
            trendValue="-2"
            icon={Package}
            color="amber"
            delay={0.1}
          />
          <KPICard
            title="Revenue This Month"
            value={2845000}
            unit="₹"
            trend="up"
            trendValue="+18%"
            icon={DollarSign}
            color="blue"
            delay={0.2}
          />
          <KPICard
            title="Operating Margin"
            value={24}
            unit="%"
            trend="up"
            trendValue="+3%"
            icon={TrendingUp}
            color="purple"
            delay={0.3}
          />
        </div>

        {/* Alerts Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-amber-800">Attention Required</p>
              <p className="text-sm text-amber-600 mt-1">
                {alerts[0].message}
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-amber-300 text-amber-700">
              Review
            </Button>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rfqs">RFQs & Contracts</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Collection & Processing Trends */}
              <ChartCard title="Collection & Processing Trends" description="Last 6 months (in tonnes)">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="collected" name="Collected" stroke="#f59e0b" fill="#fef3c7" />
                    <Area type="monotone" dataKey="processed" name="Processed" stroke="#10b981" fill="#d1fae5" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Revenue Trend */}
              <ChartCard title="Revenue Trend" description="Monthly revenue (₹ Lakhs)">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Product Mix */}
              <ChartCard title="Product Mix" description="By category">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Recent RFQs */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Recent RFQs</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentRFQs.map((rfq) => (
                      <div key={rfq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium text-gray-900">{rfq.buyer}</p>
                            <p className="text-sm text-gray-500">{rfq.product} • {rfq.qty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            rfq.status === 'pending' ? 'secondary' :
                            rfq.status === 'under_review' ? 'outline' :
                            rfq.status === 'quoted' ? 'default' : 'default'
                          } className={
                            rfq.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : ''
                          }>
                            {rfq.status.replace('_', ' ')}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rfqs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>RFQ Management</CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search RFQs..." className="pl-9 w-64" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">RFQ ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Buyer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Quantity</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRFQs.map((rfq) => (
                        <tr key={rfq.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{rfq.id}</td>
                          <td className="py-3 px-4 text-gray-600">{rfq.buyer}</td>
                          <td className="py-3 px-4 text-gray-600">{rfq.product}</td>
                          <td className="py-3 px-4 text-gray-600">{rfq.qty}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={
                              rfq.status === 'accepted' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' :
                              rfq.status === 'pending' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                              'border-gray-200 text-gray-600'
                            }>
                              {rfq.status.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-500 text-sm">{rfq.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
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

          <TabsContent value="inventory">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Marigold Powder', stock: 8500, capacity: 12000, unit: 'kg' },
                      { name: 'Mixed Floral Powder', stock: 4200, capacity: 8000, unit: 'kg' },
                      { name: 'Vermicompost', stock: 45000, capacity: 60000, unit: 'kg' },
                      { name: 'Marigold Dye Extract', stock: 320, capacity: 500, unit: 'kg' },
                    ].map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">{item.name}</span>
                          <span className="text-gray-500">{item.stock.toLocaleString()} / {item.capacity.toLocaleString()} {item.unit}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              (item.stock / item.capacity) > 0.6 ? 'bg-emerald-500' :
                              (item.stock / item.capacity) > 0.3 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(item.stock / item.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Incense Powder', min: 45, max: 65, current: 55 },
                      { name: 'Vermicompost', min: 5, max: 12, current: 8 },
                      { name: 'Natural Dye', min: 450, max: 600, current: 520 },
                    ].map((item) => (
                      <div key={item.name} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-700">{item.name}</span>
                          <span className="text-lg font-semibold text-gray-900">₹{item.current}/kg</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Floor: ₹{item.min}</span>
                          <span>•</span>
                          <span>Ceiling: ₹{item.max}</span>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full mt-4" variant="outline">
                      Update Price Controls
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TempleIcon className="w-5 h-5 text-red-500" />
                    Temples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900 mb-2">2,847</div>
                  <p className="text-sm text-gray-500 mb-4">Active temples across Tamil Nadu</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Thanjavur</span>
                      <span className="font-medium">485</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Madurai</span>
                      <span className="font-medium">412</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tirunelveli</span>
                      <span className="font-medium">328</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SHGIcon className="w-5 h-5 text-amber-500" />
                    SHG Units
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900 mb-2">456</div>
                  <p className="text-sm text-gray-500 mb-4">Women-led processing units</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Active</span>
                      <span className="font-medium text-emerald-600">412</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pending Approval</span>
                      <span className="font-medium text-amber-600">28</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Suspended</span>
                      <span className="font-medium text-red-600">16</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-500" />
                    B2B Buyers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900 mb-2">89</div>
                  <p className="text-sm text-gray-500 mb-4">Registered manufacturers</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Incense Mfg.</span>
                      <span className="font-medium">52</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Textile</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Agriculture</span>
                      <span className="font-medium">19</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}