import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, FileCheck, Leaf } from 'lucide-react';

const certifications = [
  { icon: Shield, label: 'ISO 9001:2015', desc: 'Quality Management' },
  { icon: Award, label: 'NPOP Certified', desc: 'Organic Production' },
  { icon: FileCheck, label: 'FSSAI License', desc: 'Food Safety Standards' },
  { icon: Leaf, label: 'GreenPro Certified', desc: 'Environmental Standards' },
];

const partners = [
  'Tamil Nadu Pollution Control Board',
  'Hindu Religious & Charitable Endowments',
  'TNSRLM - Women SHG Network',
  'IIT Madras Research Park',
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted & Certified
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Backed by government partnerships and industry certifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center"
            >
              <cert.icon className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-1">{cert.label}</h3>
              <p className="text-sm text-gray-400">{cert.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12"
        >
          <p className="text-center text-gray-500 mb-8 text-sm font-medium uppercase tracking-wider">
            Government & Research Partners
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner) => (
              <span key={partner} className="text-gray-400 font-medium">
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}