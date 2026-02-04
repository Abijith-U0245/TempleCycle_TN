import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/ui/Logo';
import { Users, ArrowLeft, Phone, Key, Loader2, Globe } from 'lucide-react';

export default function SHGLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({ phone: '', otp: '' });

  const labels = {
    en: {
      title: 'SHG Operator Login',
      subtitle: 'Processing Unit Dashboard Access',
      phone: 'Mobile Number',
      phonePlaceholder: 'Enter your registered mobile',
      sendOtp: 'Send OTP',
      otp: 'Enter OTP',
      otpPlaceholder: 'Enter 6-digit OTP',
      verify: 'Verify & Login',
      help: 'Need help? Call 1800-XXX-XXXX (Toll Free)',
      resend: 'Resend OTP',
    },
    ta: {
      title: 'SHG ஆபரேட்டர் உள்நுழைவு',
      subtitle: 'செயலாக்க அலகு டாஷ்போர்டு அணுகல்',
      phone: 'கைபேசி எண்',
      phonePlaceholder: 'பதிவு செய்த மொபைல் எண்ணை உள்ளிடவும்',
      sendOtp: 'OTP அனுப்பு',
      otp: 'OTP ஐ உள்ளிடவும்',
      otpPlaceholder: '6 இலக்க OTP ஐ உள்ளிடவும்',
      verify: 'சரிபார்த்து உள்நுழைக',
      help: 'உதவி வேண்டுமா? 1800-XXX-XXXX அழைக்கவும் (இலவசம்)',
      resend: 'OTP மீண்டும் அனுப்பு',
    },
  };

  const t = labels[language];

  const handleSendOtp = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setOtpSent(true);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    navigate(createPageUrl('SHGDashboard'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Back Link & Language Toggle */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <Link 
            to={createPageUrl('Login')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 bg-white">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
          <Card className="border-emerald-100 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/25">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{t.title}</CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                        required
                        disabled={otpSent}
                      />
                    </div>
                    {!otpSent && (
                      <Button 
                        type="button" 
                        onClick={handleSendOtp}
                        disabled={loading || !formData.phone}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.sendOtp}
                      </Button>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <Label htmlFor="otp">{t.otp}</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="otp"
                        type="text"
                        maxLength={6}
                        placeholder={t.otpPlaceholder}
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                        className="pl-10 text-center text-2xl tracking-[0.5em] font-mono"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      className="text-emerald-600 p-0 h-auto"
                      onClick={handleSendOtp}
                    >
                      {t.resend}
                    </Button>
                  </motion.div>
                )}

                {otpSent && (
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                    disabled={loading || formData.otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {language === 'en' ? 'Verifying...' : 'சரிபார்க்கிறது...'}
                      </>
                    ) : (
                      t.verify
                    )}
                  </Button>
                )}
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                {t.help}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}