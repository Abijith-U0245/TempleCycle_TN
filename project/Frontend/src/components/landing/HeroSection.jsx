import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Factory, Building, BarChart3, ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Logo from '@/components/ui/Logo';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with temple imagery overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/80 to-red-50/60" />
        {/* Temple pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 15H25L30 5ZM25 15H35V20H25V15ZM22 20H38L42 28H18L22 20Z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-300/30 to-orange-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-red-300/20 to-rose-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-emerald-300/10 to-green-400/10 rounded-full blur-3xl" />
      
      {/* Floating flower petals animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 12}%`,
            top: `${15 + (i % 4) * 18}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-400">
            <path d="M12 2C10 4 9 7 9 9C9 11 10.5 12 12 12C13.5 12 15 11 15 9C15 7 14 4 12 2Z" fill="currentColor" opacity="0.6"/>
            <path d="M12 2C10 4 9 7 9 9C9 11 10.5 12 12 12C13.5 12 15 11 15 9C15 7 14 4 12 2Z" fill="currentColor" opacity="0.4" transform="rotate(72 12 12)"/>
            <path d="M12 2C10 4 9 7 9 9C9 11 10.5 12 12 12C13.5 12 15 11 15 9C15 7 14 4 12 2Z" fill="currentColor" opacity="0.5" transform="rotate(144 12 12)"/>
            <path d="M12 2C10 4 9 7 9 9C9 11 10.5 12 12 12C13.5 12 15 11 15 9C15 7 14 4 12 2Z" fill="currentColor" opacity="0.4" transform="rotate(216 12 12)"/>
            <path d="M12 2C10 4 9 7 9 9C9 11 10.5 12 12 12C13.5 12 15 11 15 9C15 7 14 4 12 2Z" fill="currentColor" opacity="0.5" transform="rotate(288 12 12)"/>
          </svg>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-amber-200/50 shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">Tamil Nadu's Circular Economy Initiative</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">38,000</span> Temples.
              <br />
              <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">Zero</span> Waste.
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">One</span> Circular Economy.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              Transforming sacred floral offerings into premium industrial raw materials — 
              incense powder, organic compost, natural dyes & more. <span className="font-semibold text-gray-800">Empowering 10,000+ rural women.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={createPageUrl('Marketplace')}>
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 h-12 px-6">
                  <Factory className="w-5 h-5 mr-2" />
                  I'm a Manufacturer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('PartnerOnboard')}>
                <Button size="lg" variant="outline" className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 h-12 px-6">
                  <Building className="w-5 h-5 mr-2" />
                  Partner as Temple / SHG
                </Button>
              </Link>
              <Link to={createPageUrl('ImpactDashboard')}>
                <Button size="lg" variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-white/50 h-12 px-6">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  CSR / Government View
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right - Live Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl shadow-amber-500/10 p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Live Impact Metrics</span>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-amber-400/20">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={2847650} suffix=" kg" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Floral Waste Diverted</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-emerald-400/20">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={12450} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Women Employed</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-blue-400/20">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={1842} suffix=" T" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">CO₂ Equivalent Avoided</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-red-400/20">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={2847} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Temples Onboarded</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last updated</span>
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Just now
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 top-8 bg-white rounded-xl shadow-lg p-3 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🏆</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Certified</p>
                  <p className="text-sm font-semibold text-gray-900">ISO 9001</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}