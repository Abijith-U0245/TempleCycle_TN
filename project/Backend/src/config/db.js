const mongoose = require('mongoose');
const logger = require('../utils/response').logger;

// In-memory data store for fallback
global.inMemoryData = {
  users: [],
  products: [],
  rfqs: [],
  orders: [],
  impactMetrics: [],
  traceability: []
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/templecycle', {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    global.useInMemoryDB = false;
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error.message);
    logger.info('🔄 Falling back to in-memory data mode');
    global.useInMemoryDB = true;
    
    // Load seed data for in-memory mode
    await loadSeedDataInMemory();
  }
};

const loadSeedDataInMemory = async () => {
  try {
    // Check if data is already loaded
    if (global.inMemoryData.users.length > 0) {
      logger.info('🌱 In-memory data already loaded');
      return;
    }

    const bcrypt = require('bcryptjs');
    
    // Create seed users
    const users = [
      {
        _id: 'admin_id',
        name: 'Admin User',
        email: 'admin@templecycle.com',
        password: await bcrypt.hash('admin123', 12),
        role: 'admin',
        phone: '9876543210',
        organization: 'TempleCycle TN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'shg_id',
        name: 'SHG Meenakshi',
        email: 'shg@templecycle.com',
        password: await bcrypt.hash('shg123', 12),
        role: 'shg',
        phone: '9876543211',
        organization: 'Meenakshi SHG',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'buyer_id',
        name: 'Buyer Company',
        email: 'buyer@templecycle.com',
        password: await bcrypt.hash('buyer123', 12),
        role: 'buyer',
        phone: '9876543212',
        organization: 'Sri Ganesh Agarbatti',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Create seed products
    const products = [
      {
        _id: 'product_1',
        name: 'Premium Incense-Grade Marigold Powder',
        category: 'incense_powder',
        description: 'Fine-ground marigold powder ideal for agarbatti manufacturing.',
        flower_composition: { Marigold: 85, Rose: 10, Jasmine: 5 },
        specifications: {
          moisture_content: 8,
          mesh_size: '80-100 mesh',
          purity: 98
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
        shg: 'shg_id',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    global.inMemoryData.users = users;
    global.inMemoryData.products = products;
    
    logger.info('🌱 In-memory seed data loaded successfully');
  } catch (error) {
    logger.error('❌ Error loading in-memory seed data:', error);
  }
};

module.exports = connectDB;
