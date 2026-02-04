import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/Logo';
import { TempleIcon, SHGIcon } from '@/components/ui/CategoryIcon';
import { 
  Leaf, Users, Building, TrendingUp, Download, Globe, 
  Award, FileText, CheckCircle2 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const impactData = {
  wasteProcessed: 2847650,
  co2Avoided: 1842,
  womenEmployed: 12450,
  templesOnboarded: 2847,
  shgUnits: 456,
  districtsActive: 32,
};

const monthlyTrend = [
  { month: 'Jul', waste: 185, jobs: 8200 },
  { month: 'Aug', waste: 210, jobs: 9100 },
  { month: 'Sep', waste: 245, jobs: 9800 },
  { month: 'Oct', waste: 285, jobs: 10500 },
  { month: 'Nov', waste: 320, jobs: 11200 },
  { month: 'Dec', waste: 365, jobs: 11800 },
  { month: 'Jan', waste: 420, jobs: 12450 },
];

const districtData = [
  { name: 'Thanjavur', value: 485, temples: 485 },
  { name: 'Madurai', value: 412, temples: 412 },
  { name: 'Tirunelveli', value: 328, temples: 328 },
  { name: 'Salem', value: 296, temples: 296 },
  { name: 'Trichy', value: 275, temples: 275 },
  { name: 'Others', value: 1051, temples: 1051 },
];

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#6b7280'];

const sdgAlignment = [
  { goal: 'SDG 5', title: 'Gender Equality', description: '12,450+ rural women employed', icon: '👩‍🌾' },
  { goal: 'SDG 8', title: 'Decent Work', description: 'Fair wages & safe working conditions', icon: '💼' },
  { goal: 'SDG 11', title: 'Sustainable Cities', description: 'Urban waste reduction', icon: '🏙️' },
  { goal: 'SDG 12', title: 'Responsible Production', description: 'Circular economy model', icon: '♻️' },
  { goal: 'SDG 13', title: 'Climate Action', description: '1,842 T CO₂ avoided', icon: '🌍' },
];

export default function ImpactDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <Badge className="bg-white/20 text-white mb-4">Live Impact Dashboard</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transforming Sacred Waste into
              <br />Sustainable Livelihoods
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Real-time environmental and social impact metrics from TempleCycle TN operations
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Impact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 -mt-20 mb-12">
          {[
            { label: 'Floral Waste Diverted', value: impactData.wasteProcessed, suffix: ' kg', icon: Leaf, color: 'emerald' },
            { label: 'CO₂ Equivalent Avoided', value: impactData.co2Avoided, suffix: ' T', icon: Globe, color: 'blue' },
            { label: 'Women Employed', value: impactData.womenEmployed, icon: Users, color: 'purple' },
            { label: 'Temples Onboarded', value: impactData.templesOnboarded, icon: Building, color: 'red' },
            { label: 'SHG Processing Units', value: impactData.shgUnits, icon: Award, color: 'amber' },
            { label: 'Districts Active', value: impactData.districtsActive, suffix: '/38', icon: TrendingUp, color: 'cyan' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-xl border-0">
                <CardContent className="p-6">
                  <item.icon className={`w-8 h-8 text-${item.color}-500 mb-3`} />
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    <AnimatedCounter end={item.value} suffix={item.suffix || ''} />
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Trajectory</CardTitle>
              <p className="text-sm text-gray-500">Monthly waste processed (tonnes) & employment</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#10b981" />
                  <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="waste" 
                    name="Waste (T)" 
                    stroke="#10b981" 
                    fill="#d1fae5" 
                  />
                  <Area 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="jobs" 
                    name="Jobs" 
                    stroke="#8b5cf6" 
                    fill="#ede9fe" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* District Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Temple Distribution by District</CardTitle>
              <p className="text-sm text-gray-500">Coverage across Tamil Nadu</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={districtData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {districtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} temples`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* SDG Alignment */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              UN Sustainable Development Goals Alignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {sdgAlignment.map((sdg, index) => (
                <motion.div
                  key={sdg.goal}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 text-center"
                >
                  <div className="text-4xl mb-2">{sdg.icon}</div>
                  <Badge variant="outline" className="mb-2">{sdg.goal}</Badge>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{sdg.title}</h4>
                  <p className="text-xs text-gray-500">{sdg.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Downloads Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
            <CardContent className="p-6">
              <FileText className="w-10 h-10 mb-4 opacity-80" />
              <h3 className="text-lg font-semibold mb-2">Impact Report 2024</h3>
              <p className="text-sm text-white/80 mb-4">
                Comprehensive annual report with detailed metrics and case studies.
              </p>
              <Button variant="secondary" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <Award className="w-10 h-10 mb-4 opacity-80" />
              <h3 className="text-lg font-semibold mb-2">CSR Certificate</h3>
              <p className="text-sm text-white/80 mb-4">
                Official impact certificate for corporate sustainability reporting.
              </p>
              <Button variant="secondary" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardContent className="p-6">
              <TrendingUp className="w-10 h-10 mb-4 opacity-80" />
              <h3 className="text-lg font-semibold mb-2">Raw Data Export</h3>
              <p className="text-sm text-white/80 mb-4">
                Access raw impact data for research and analysis purposes.
              </p>
              <Button variant="secondary" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Government Partnership Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gray-900 rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Badge className="bg-amber-500 text-white mb-3">Government Initiative</Badge>
              <h3 className="text-2xl font-bold mb-2">
                A Tamil Nadu State Government Partnership
              </h3>
              <p className="text-gray-400">
                Operating under HR&CE Department with support from TNSRLM and Tamil Nadu Pollution Control Board
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <div>
                <p className="text-sm text-gray-400">Verified & Audited</p>
                <p className="font-semibold">ISO 9001:2015 Certified</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}