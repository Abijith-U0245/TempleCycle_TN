import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ProductShowcase from '@/components/landing/ProductShowcase';
import ProcessFlow from '@/components/landing/ProcessFlow';
import TrustSection from '@/components/landing/TrustSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProductShowcase />
      <ProcessFlow />
      <TrustSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Circular Economy?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Whether you're a manufacturer, temple trust, or SHG — we have a partnership model for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl('Marketplace')}>
                <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('PartnerOnboard')}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-4">
                <Logo size="md" />
              </div>
              <p className="text-gray-400 text-sm">
                Transforming sacred floral waste into sustainable industrial raw materials across Tamil Nadu.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to={createPageUrl('Marketplace')} className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to={createPageUrl('ImpactDashboard')} className="hover:text-white transition-colors">Impact Dashboard</Link></li>
                <li><Link to={createPageUrl('Traceability')} className="hover:text-white transition-colors">QR Traceability</Link></li>
                <li><Link to={createPageUrl('PartnerOnboard')} className="hover:text-white transition-colors">Partner With Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dashboards</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to={createPageUrl('AdminDashboard')} className="hover:text-white transition-colors">Admin Portal</Link></li>
                <li><Link to={createPageUrl('SHGDashboard')} className="hover:text-white transition-colors">SHG Portal</Link></li>
                <li><Link to={createPageUrl('BuyerDashboard')} className="hover:text-white transition-colors">Buyer Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Chennai, Tamil Nadu
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 44 1234 5678
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@templecycle.tn.gov.in
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2026 TempleCycle TN. A Government of Tamil Nadu Initiative.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}