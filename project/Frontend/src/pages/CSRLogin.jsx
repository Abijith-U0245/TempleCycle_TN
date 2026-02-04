import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/Logo';
import { Building2, ArrowLeft, Mail, Lock, Eye, Loader2 } from 'lucide-react';

export default function CSRLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    navigate(createPageUrl('ImpactDashboard'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Back Link */}
        <Link 
          to={createPageUrl('Login')}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to roles</span>
        </Link>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Logo size="lg" />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md"
        >
          <Card className="border-purple-100 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">CSR / Government Login</CardTitle>
              <CardDescription>Impact Metrics & Compliance Access</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {/* Read-Only Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-purple-100 text-purple-700 border border-purple-200 px-4 py-2">
                  <Eye className="w-4 h-4 mr-2" />
                  Read-Only Access
                </Badge>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Government / Corporate Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="official@tn.gov.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Access Impact Dashboard'
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-900 text-sm mb-2">What you can access:</h4>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>• Live environmental impact metrics</li>
                  <li>• Social impact & employment data</li>
                  <li>• SDG alignment reports</li>
                  <li>• Downloadable impact certificates</li>
                </ul>
              </div>

              <p className="text-xs text-gray-500 text-center mt-6">
                For data queries: data@templecycle.tn.gov.in
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}