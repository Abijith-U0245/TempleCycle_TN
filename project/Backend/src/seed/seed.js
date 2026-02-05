const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const RFQ = require('../models/RFQ');
const Order = require('../models/Order');
const ImpactMetric = require('../models/ImpactMetric');
const Traceability = require('../models/Traceability');

// Seed data
const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@templecycle.com',
    password: 'admin123',
    role: 'admin',
    phone: '9876543210',
    organization: 'TempleCycle TN',
    address: {
      street: '123 Admin Street',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001'
    }
  },
  {
    name: 'SHG Meenakshi',
    email: 'shg@templecycle.com',
    password: 'shg123',
    role: 'shg',
    phone: '9876543211',
    organization: 'Meenakshi SHG',
    address: {
      street: '45 SHG Road',
      city: 'Madurai',
      district: 'Madurai',
      state: 'Tamil Nadu',
      pincode: '625001'
    }
  },
  {
    name: 'Buyer Company',
    email: 'buyer@templecycle.com',
    password: 'buyer123',
    role: 'buyer',
    phone: '9876543212',
    organization: 'Sri Ganesh Agarbatti',
    address: {
      street: '78 Industrial Estate',
      city: 'Salem',
      district: 'Salem',
      state: 'Tamil Nadu',
      pincode: '636001'
    }
  },
  {
    name: 'CSR Representative',
    email: 'csr@templecycle.com',
    password: 'csr123',
    role: 'csr',
    phone: '9876543213',
    organization: 'CSR Foundation',
    address: {
      street: 'CSR Office',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600002'
    }
  }
];

const seedProducts = [
  {
    name: 'Premium Incense-Grade Marigold Powder',
    category: 'incense_powder',
    description: 'Fine-ground marigold powder ideal for agarbatti manufacturing. Sourced from temple offerings across Thanjavur district.',
    flower_composition: { Marigold: 85, Rose: 10, Jasmine: 5 },
    specifications: {
      moisture_content: 8,
      mesh_size: '80-100 mesh',
      purity: 98,
      shelf_life: '12 months',
      storage_conditions: 'Cool, dry place away from sunlight'
    },
    availability: {
      monthly_availability_tonnes: 25,
      moq_kg: 500,
      lead_time_days: 7
    },
    pricing: {
      price_min: 45,
      price_max: 65
    },
    certifications: ['ISO 9001', 'NPOP Organic'],
    status: 'available',
    images: ['https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop'],
    temple: {
      name: 'Sri Meenakshi Temple',
      location: 'Madurai',
      district: 'Madurai'
    },
    quality_metrics: {
      lab_tested: true,
      test_date: new Date('2024-01-15'),
      test_results: new Map([['purity', '98%'], ['moisture', '8%']])
    },
    sustainability: {
      waste_diverted_kg: 25000,
      co2_saved_kg: 1250,
      water_saved_liters: 5000
    }
  },
  {
    name: 'Temple Flower Vermicompost',
    category: 'compost',
    description: 'Nutrient-rich organic vermicompost processed from temple floral waste. NPK balanced for optimal plant growth.',
    flower_composition: { Mixed: 100 },
    specifications: {
      moisture_content: 35,
      mesh_size: 'N/A',
      purity: 95,
      shelf_life: '24 months',
      storage_conditions: 'Dry storage, protected from rain'
    },
    availability: {
      monthly_availability_tonnes: 120,
      moq_kg: 1000,
      lead_time_days: 5
    },
    pricing: {
      price_min: 8,
      price_max: 12
    },
    certifications: ['NPOP Organic', 'FSSAI'],
    status: 'available',
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'],
    temple: {
      name: 'Thiruparankundram Temple',
      location: 'Madurai',
      district: 'Madurai'
    },
    sustainability: {
      waste_diverted_kg: 120000,
      co2_saved_kg: 6000,
      water_saved_liters: 24000
    }
  },
  {
    name: 'Marigold Yellow Dye Extract',
    category: 'natural_dye',
    description: 'Natural yellow-orange dye extracted from temple marigolds. Ideal for textile and fabric dyeing.',
    flower_composition: { Marigold: 100 },
    specifications: {
      moisture_content: 5,
      mesh_size: 'Liquid concentrate',
      purity: 92,
      shelf_life: '18 months',
      storage_conditions: 'Refrigerated storage at 4°C'
    },
    availability: {
      monthly_availability_tonnes: 5,
      moq_kg: 50,
      lead_time_days: 14
    },
    pricing: {
      price_min: 450,
      price_max: 600
    },
    certifications: ['GOTS', 'OEKO-TEX'],
    status: 'limited',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'],
    temple: {
      name: 'Alagar Kovil',
      location: 'Madurai',
      district: 'Madurai'
    },
    sustainability: {
      waste_diverted_kg: 5000,
      co2_saved_kg: 250,
      water_saved_liters: 1000
    }
  }
];

const seedImpactMetrics = {
  date: new Date(),
  period: 'monthly',
  waste_management: {
    flowers_collected_kg: 520,
    flowers_processed_kg: 495,
    waste_diverted_from_landfill_kg: 495
  },
  environmental_impact: {
    co2_emissions_avoided_kg: 1842,
    water_saved_liters: 19800,
    chemical_fertilizers_avoided_kg: 2475
  },
  social_impact: {
    women_employed: 12450,
    shg_units_active: 456,
    temples_onboarded: 2847,
    districts_active: 32,
    fair_wage_jobs_created: 8900
  },
  economic_impact: {
    revenue_generated_inr: 4250000,
    shg_earnings_inr: 2125000,
    cost_savings_for_temples_inr: 850000
  },
  product_breakdown: {
    incense_powder_kg: 180,
    compost_kg: 250,
    natural_dye_kg: 35,
    essential_oil_liters: 15,
    fresh_flowers_kg: 15
  },
  district_data: [
    { district_name: 'Thanjavur', temples_count: 485, flowers_collected_kg: 120, shg_units: 85, women_employed: 3200 },
    { district_name: 'Madurai', temples_count: 412, flowers_collected_kg: 145, shg_units: 92, women_employed: 3450 },
    { district_name: 'Tirunelveli', temples_count: 328, flowers_collected_kg: 98, shg_units: 68, women_employed: 2560 },
    { district_name: 'Salem', temples_count: 296, flowers_collected_kg: 87, shg_units: 61, women_employed: 1890 },
    { district_name: 'Trichy', temples_count: 275, flowers_collected_kg: 70, shg_units: 54, women_employed: 1350 }
  ],
  sdg_alignment: {
    sdg_5_gender_equality: {
      women_empowered: 12450,
      leadership_positions: 456,
      skill_training_programs: 89
    },
    sdg_8_decent_work: {
      fair_wage_jobs: 8900,
      safe_working_conditions: true,
      skill_development_hours: 15600
    },
    sdg_11_sustainable_cities: {
      waste_management_systems: 2847,
      green_spaces_created: 156,
      pollution_reduced_kg: 495000
    },
    sdg_12_responsible_consumption: {
      circular_economy_practices: 456,
      waste_recycling_rate: 95,
      sustainable_products_created: 12
    },
    sdg_13_climate_action: {
      carbon_footprint_reduced_kg: 1842,
      renewable_energy_used: true,
      climate_resilience_improved: true
    }
  }
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await RFQ.deleteMany({});
    await Order.deleteMany({});
    await ImpactMetric.deleteMany({});
    await Traceability.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Seed users
    const createdUsers = await User.create(seedUsers);
    console.log(`👥 Created ${createdUsers.length} users`);

    // Get SHG user for products
    const shgUser = createdUsers.find(u => u.role === 'shg');

    // Seed products
    const productsWithSHG = seedProducts.map(product => ({
      ...product,
      shg: shgUser._id
    }));
    const createdProducts = await Product.create(productsWithSHG);
    console.log(`📦 Created ${createdProducts.length} products`);

    // Seed impact metrics
    await ImpactMetric.create(seedImpactMetrics);
    console.log('📊 Created impact metrics');

    // Create sample traceability data
    const traceabilityData = {
      product: createdProducts[0]._id,
      temple_source: {
        temple_name: 'Sri Meenakshi Temple',
        location: {
          address: 'Meenakshi Temple, Madurai',
          district: 'Madurai',
          state: 'Tamil Nadu'
        },
        collection_details: {
          collection_date: new Date('2024-01-20'),
          collection_time: '6:30 AM',
          flower_types: ['Marigold', 'Rose', 'Jasmine'],
          estimated_quantity_kg: 85,
          condition: 'fresh',
          segregation_done: true
        }
      },
      shg_processing: {
        shg_name: 'Meenakshi SHG',
        shg_id: shgUser._id,
        processing_location: 'Madurai SHG Center',
        processing_methods: [
          { method: 'Drying', duration_hours: 48, equipment: 'Solar dryer' },
          { method: 'Grinding', duration_hours: 4, equipment: 'Industrial grinder' }
        ],
        workers_involved: 12,
        processing_date: new Date('2024-01-22')
      }
    };
    await Traceability.create(traceabilityData);
    console.log('🔍 Created traceability data');

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@templecycle.com / admin123');
    console.log('SHG: shg@templecycle.com / shg123');
    console.log('Buyer: buyer@templecycle.com / buyer123');
    console.log('CSR: csr@templecycle.com / csr123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

// Run seed if called directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/templecycle')
    .then(() => {
      console.log('🔗 Connected to MongoDB');
      seedDatabase();
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;
