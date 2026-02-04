import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/ui/Logo';
import { TempleIcon, SHGIcon } from '@/components/ui/CategoryIcon';
import { 
  CheckCircle2, ArrowRight, Phone, Mail, FileText, TrendingUp
} from 'lucide-react';

const benefits = {
  temple: [
    'Zero waste disposal costs',
    'Reverent handling of sacred offerings',
    'Free pickup service',
    'Impact certificate for devotees',
    'CSR compliance documentation',
  ],
  shg: [
    'Guaranteed income from day one',
    'Free equipment & training',
    'Raw material supply guaranteed',
    'Health insurance coverage',
    'Flexible working hours',
  ],
};

const requirements = {
  temple: [
    'Registered temple trust',
    'Minimum 25 kg daily floral waste',
    'Designated collection point',
    'Cooperation with collection schedule',
  ],
  shg: [
    'Registered SHG with 10+ members',
    'Available workspace (200 sq ft min)',
    'Basic literacy for record-keeping',
    'Commitment to quality standards',
  ],
};

export default function PartnerOnboard() {
  const [partnerType, setPartnerType] = useState('temple');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in partnering with TempleCycle TN. Our team will review your application and contact you within 3-5 business days.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Application Reference: <span className="font-mono font-medium">TCTN-{Date.now().toString(36).toUpperCase()}</span>
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Submit Another Application
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Partner With Us</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join Tamil Nadu's largest temple floral waste upcycling network. Whether you're a temple trust or a women's SHG, we have a partnership model for you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Partner Type Selection */}
        <Card className="-mt-12 mb-8 shadow-xl border-0">
          <CardContent className="p-2">
            <Tabs value={partnerType} onValueChange={setPartnerType}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="temple" className="flex items-center gap-2 py-4">
                  <TempleIcon className="w-5 h-5" />
                  Temple / Trust
                </TabsTrigger>
                <TabsTrigger value="shg" className="flex items-center gap-2 py-4">
                  <SHGIcon className="w-5 h-5" />
                  SHG / Processing Unit
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits & Requirements */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits[partnerType].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <FileText className="w-5 h-5" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements[partnerType].map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>+91 44 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>partners@templecycle.tn.gov.in</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {partnerType === 'temple' ? 'Temple Registration Form' : 'SHG Registration Form'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {partnerType === 'temple' ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="templeName">Temple Name *</Label>
                          <Input id="templeName" placeholder="e.g., Sri Meenakshi Temple" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="trustName">Trust / Management Name</Label>
                          <Input id="trustName" placeholder="Registered trust name" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>District *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select district" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chennai">Chennai</SelectItem>
                              <SelectItem value="madurai">Madurai</SelectItem>
                              <SelectItem value="coimbatore">Coimbatore</SelectItem>
                              <SelectItem value="thanjavur">Thanjavur</SelectItem>
                              <SelectItem value="tirunelveli">Tirunelveli</SelectItem>
                              <SelectItem value="salem">Salem</SelectItem>
                              <SelectItem value="trichy">Tiruchirappalli</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dailyWaste">Estimated Daily Floral Waste (kg) *</Label>
                          <Input id="dailyWaste" type="number" min="25" placeholder="Minimum 25 kg" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Temple Address *</Label>
                        <Textarea id="address" placeholder="Full address with pincode" required />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Person Name *</Label>
                          <Input id="contactName" placeholder="Full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Contact Phone *</Label>
                          <Input id="contactPhone" type="tel" placeholder="+91 98765 43210" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="flowerTypes">Primary Flower Types</Label>
                        <Input id="flowerTypes" placeholder="e.g., Marigold, Rose, Jasmine" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shgName">SHG Name *</Label>
                          <Input id="shgName" placeholder="e.g., Madurai Women's SHG" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="regNumber">Registration Number</Label>
                          <Input id="regNumber" placeholder="TNSRLM / DRDA registration" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>District *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select district" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chennai">Chennai</SelectItem>
                              <SelectItem value="madurai">Madurai</SelectItem>
                              <SelectItem value="coimbatore">Coimbatore</SelectItem>
                              <SelectItem value="thanjavur">Thanjavur</SelectItem>
                              <SelectItem value="tirunelveli">Tirunelveli</SelectItem>
                              <SelectItem value="salem">Salem</SelectItem>
                              <SelectItem value="trichy">Tiruchirappalli</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="members">Number of Members *</Label>
                          <Input id="members" type="number" min="10" placeholder="Minimum 10" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="leaderName">Group Leader Name *</Label>
                          <Input id="leaderName" placeholder="Full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leaderPhone">Leader Phone *</Label>
                          <Input id="leaderPhone" type="tel" placeholder="+91 98765 43210" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workspace">Workspace Details</Label>
                        <Textarea id="workspace" placeholder="Describe available workspace (size, location, facilities)" />
                      </div>

                      <div className="space-y-2">
                        <Label>Previous Experience</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Any related experience?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No prior experience</SelectItem>
                            <SelectItem value="handicraft">Handicraft / Artisan work</SelectItem>
                            <SelectItem value="food">Food processing</SelectItem>
                            <SelectItem value="agri">Agricultural processing</SelectItem>
                            <SelectItem value="other">Other manufacturing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea id="additionalInfo" placeholder="Any other details you'd like to share..." rows={3} />
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                    Submit Application
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to be contacted by TempleCycle TN representatives.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}