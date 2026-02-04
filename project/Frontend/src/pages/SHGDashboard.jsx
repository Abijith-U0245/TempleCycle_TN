import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/ui/Logo';
import { TempleIcon } from '@/components/ui/CategoryIcon';
import { 
  Leaf, Package, IndianRupee, CheckCircle2, Clock,
  TrendingUp, FileText, BookOpen, Phone, ChevronRight,
  Sun, Droplets, Scale, LogOut, Globe
} from 'lucide-react';

// Demo data for SHG
const todayStats = {
  collected: 245,
  dried: 180,
  ground: 165,
  earnings: 4125,
};

const weeklyData = [
  { day: 'Mon', collected: 220, processed: 195 },
  { day: 'Tue', collected: 245, processed: 218 },
  { day: 'Wed', collected: 198, processed: 185 },
  { day: 'Thu', collected: 275, processed: 250 },
  { day: 'Fri', collected: 260, processed: 240 },
  { day: 'Sat', collected: 310, processed: 285 },
  { day: 'Sun', collected: 180, processed: 165 },
];

const templates = [
  { temple: 'Sri Meenakshi Temple', kg: 85, time: '6:30 AM' },
  { temple: 'Thiruparankundram Temple', kg: 65, time: '7:15 AM' },
  { temple: 'Alagar Kovil', kg: 45, time: '8:00 AM' },
  { temple: 'Koodal Azhagar Temple', kg: 50, time: '8:45 AM' },
];

const qcStatus = {
  moisture: { value: 7.5, target: 8, status: 'pass' },
  purity: { value: 98, target: 95, status: 'pass' },
  meshSize: { value: 100, target: 80, status: 'pass' },
};

const trainingModules = [
  { title: 'Proper Drying Techniques', duration: '15 min', completed: true },
  { title: 'Quality Check Procedures', duration: '20 min', completed: true },
  { title: 'Packaging Standards', duration: '10 min', completed: false },
  { title: 'Safety Guidelines', duration: '12 min', completed: false },
];

export default function SHGDashboard() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('today');

  const labels = {
    en: {
      title: 'SHG Dashboard',
      subtitle: 'Madurai Women\'s Self Help Group',
      today: 'Today',
      history: 'History',
      training: 'Training',
      collected: 'Flowers Collected',
      dried: 'After Drying',
      ground: 'Ground Powder',
      earnings: 'Today\'s Earnings',
      qcStatus: 'Quality Check Status',
      templeCollection: 'Temple Collection',
      weeklyProgress: 'Weekly Progress',
      trainingCenter: 'Training & SOPs',
    },
    ta: {
      title: 'SHG டாஷ்போர்டு',
      subtitle: 'மதுரை பெண்கள் சுய உதவிக் குழு',
      today: 'இன்று',
      history: 'வரலாறு',
      training: 'பயிற்சி',
      collected: 'சேகரிக்கப்பட்ட பூக்கள்',
      dried: 'உலர்ந்த பிறகு',
      ground: 'அரைத்த பொடி',
      earnings: 'இன்றைய வருமானம்',
      qcStatus: 'தர சோதனை நிலை',
      templeCollection: 'கோயில் சேகரிப்பு',
      weeklyProgress: 'வாராந்திர முன்னேற்றம்',
      trainingCenter: 'பயிற்சி மையம்',
    },
  };

  const t = labels[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-amber-100 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-24 h-8 text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-lg font-bold text-gray-900">{t.title}</h1>
            <p className="text-xs text-gray-500">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Today's Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
            <CardContent className="p-4">
              <Leaf className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-80">{t.collected}</p>
              <p className="text-2xl font-bold">{todayStats.collected} kg</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <Sun className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-80">{t.dried}</p>
              <p className="text-2xl font-bold">{todayStats.dried} kg</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardContent className="p-4">
              <Package className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-80">{t.ground}</p>
              <p className="text-2xl font-bold">{todayStats.ground} kg</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <IndianRupee className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-80">{t.earnings}</p>
              <p className="text-2xl font-bold">₹{todayStats.earnings.toLocaleString()}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* QC Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {t.qcStatus}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(qcStatus).map(([key, data]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {key === 'moisture' && <Droplets className="w-5 h-5 text-blue-400" />}
                  {key === 'purity' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {key === 'meshSize' && <Scale className="w-5 h-5 text-purple-400" />}
                  <div>
                    <p className="text-sm font-medium text-gray-700 capitalize">
                      {key === 'meshSize' ? 'Mesh Size' : key}
                    </p>
                    <p className="text-xs text-gray-400">Target: {data.target}{key === 'moisture' ? '%' : key === 'purity' ? '%' : ' mesh'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {data.value}{key === 'moisture' ? '%' : key === 'purity' ? '%' : ' mesh'}
                  </span>
                  <Badge className={data.status === 'pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}>
                    {data.status === 'pass' ? '✓ Pass' : '✗ Fail'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Temple Collections */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.templeCollection}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templates.map((temple, index) => (
                <motion.div
                  key={temple.temple}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <TempleIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{temple.temple}</p>
                      <p className="text-xs text-gray-500">{temple.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{temple.kg} kg</p>
                    <Badge variant="outline" className="text-xs">Collected</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.weeklyProgress}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center gap-3">
                  <span className="w-8 text-sm text-gray-500">{day.day}</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-400 rounded-l-full"
                      style={{ width: `${(day.collected / 350) * 100}%` }}
                    />
                    <div
                      className="h-full bg-amber-400"
                      style={{ width: `${((day.processed - day.collected * 0.3) / 350) * 100}%`, marginLeft: '-8px' }}
                    />
                  </div>
                  <span className="w-16 text-sm text-gray-600 text-right">{day.collected} kg</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <span className="text-xs text-gray-500">Collected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full" />
                <span className="text-xs text-gray-500">Processed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Modules */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              {t.trainingCenter}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trainingModules.map((module, index) => (
                <div
                  key={module.title}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    module.completed ? 'bg-emerald-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {module.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{module.title}</p>
                      <p className="text-xs text-gray-500">{module.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Earnings Summary */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400 mb-1">This Month's Earnings</p>
            <p className="text-4xl font-bold mb-4">₹42,850</p>
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+15% from last month</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Total Processed</p>
                <p className="text-xl font-semibold">4,250 kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg Rate</p>
                <p className="text-xl font-semibold">₹10.08/kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Call Support
          </Button>
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            View SOPs
          </Button>
        </div>
      </div>
    </div>
  );
}