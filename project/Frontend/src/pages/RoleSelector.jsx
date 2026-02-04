import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import RoleCard from '@/components/auth/RoleCard';
import { Shield, Users, Factory, Building2 } from 'lucide-react';

const roles = [
  {
    id: 'admin',
    title: 'Super Admin',
    description: 'TempleCycle TN HQ - Full platform access and control',
    icon: Shield,
    color: 'red',
    page: 'AdminLogin',
  },
  {
    id: 'shg',
    title: 'SHG Operator',
    description: 'Processing unit dashboard - Collections, production & earnings',
    icon: Users,
    color: 'emerald',
    page: 'SHGLogin',
  },
  {
    id: 'buyer',
    title: 'B2B Manufacturer',
    description: 'Buyer portal - RFQs, contracts & procurement',
    icon: Factory,
    color: 'blue',
    page: 'BuyerLogin',
  },
  {
    id: 'csr',
    title: 'CSR / Government',
    description: 'Read-only access - Impact metrics & compliance data',
    icon: Building2,
    color: 'purple',
    page: 'CSRLogin',
  },
];

export default function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Logo size="xl" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to TempleCycle TN
          </h1>
          <p className="text-gray-500">
            Select your role to continue
          </p>
        </motion.div>

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl w-full">
          {roles.map((role, index) => (
            <RoleCard
              key={role.id}
              icon={role.icon}
              title={role.title}
              description={role.description}
              color={role.color}
              onClick={() => navigate(createPageUrl(role.page))}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        {/* Public Access Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 mb-2">
            Just browsing? View our public pages
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to={createPageUrl('Home')} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              Landing Page
            </Link>
            <span className="text-gray-300">|</span>
            <Link to={createPageUrl('Marketplace')} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              Marketplace
            </Link>
            <span className="text-gray-300">|</span>
            <Link to={createPageUrl('ImpactDashboard')} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              Impact Data
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6 text-sm text-gray-400">
        <p>© 2026 TempleCycle TN • A Government of Tamil Nadu Initiative</p>
      </div>
    </div>
  );
}