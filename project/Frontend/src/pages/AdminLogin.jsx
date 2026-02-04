import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from '@/components/ui/Logo';
import { Shield, ArrowLeft, Lock, Mail, AlertTriangle, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    navigate(createPageUrl('AdminDashboard'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Back Link */}
        <Link 
          to={createPageUrl('Login')}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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
          <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-500/25">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Super Admin Login</CardTitle>
              <CardDescription className="text-gray-400">
                TempleCycle TN Headquarters Access
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {/* Security Warning */}
              <Alert className="mb-6 bg-red-500/10 border-red-500/30 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Admin access only. All activities are logged and monitored.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@templecycle.tn.gov.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* 2FA Placeholder */}
                <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600 border-dashed">
                  <p className="text-xs text-gray-500 text-center">
                    🔐 Two-factor authentication (2FA) coming soon
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Sign In to Admin Panel'
                  )}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                Having trouble? Contact IT Support at support@templecycle.tn.gov.in
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}