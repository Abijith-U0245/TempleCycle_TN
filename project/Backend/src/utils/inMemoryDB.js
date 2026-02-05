// In-memory database adapter for when MongoDB is not available

class InMemoryDB {
  constructor() {
    // Use global data store
    this.users = global.inMemoryData?.users || [];
    this.products = global.inMemoryData?.products || [];
    this.rfqs = global.inMemoryData?.rfqs || [];
    this.orders = global.inMemoryData?.orders || [];
    this.impactMetrics = global.inMemoryData?.impactMetrics || [];
    this.traceability = global.inMemoryData?.traceability || [];
  }

  // User operations
  async findUser(query) {
    const users = global.inMemoryData?.users || [];
    if (query.email) {
      return users.find(user => user.email === query.email);
    }
    if (query._id) {
      return users.find(user => user._id === query._id);
    }
    return null;
  }

  async findUserById(id, select = '') {
    const users = global.inMemoryData?.users || [];
    const user = users.find(user => user._id === id);
    if (select && select.includes('-password')) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return user;
  }

  async createUser(userData) {
    const user = {
      ...userData,
      _id: userData._id || `user_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  // Product operations
  async findProducts(query = {}, options = {}) {
    let products = [...(global.inMemoryData?.products || [])];
    
    // Apply filters
    if (query.category && query.category !== 'all') {
      products = products.filter(p => p.category === query.category);
    }
    if (query.status && query.status !== 'all') {
      products = products.filter(p => p.status === query.status);
    }
    if (query.shg) {
      products = products.filter(p => p.shg === query.shg);
    }
    
    // Apply pagination
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;
    
    return products.slice(skip, skip + limit);
  }

  async findProductById(id) {
    return this.products.find(p => p._id === id);
  }

  async createProduct(productData) {
    const product = {
      ...productData,
      _id: `product_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(product);
    return product;
  }

  async countProducts(query = {}) {
    let products = [...(global.inMemoryData?.products || [])];
    
    if (query.category && query.category !== 'all') {
      products = products.filter(p => p.category === query.category);
    }
    if (query.status && query.status !== 'all') {
      products = products.filter(p => p.status === query.status);
    }
    
    return products.length;
  }

  // RFQ operations
  async findRFQs(query = {}, options = {}) {
    let rfqs = [...this.rfqs];
    
    if (query.buyer) {
      rfqs = rfqs.filter(r => r.buyer === query.buyer);
    }
    if (query.status) {
      rfqs = rfqs.filter(r => r.status === query.status);
    }
    
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;
    
    return rfqs.slice(skip, skip + limit);
  }

  async createRFQ(rfqData) {
    const rfq = {
      ...rfqData,
      _id: `rfq_${Date.now()}`,
      rfqNumber: `RFQ-${String(this.rfqs.length + 1).padStart(3, '0')}`,
      status: 'pending',
      quotes: [],
      timeline: [{
        status: 'created',
        message: 'RFQ created',
        timestamp: new Date()
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.rfqs.push(rfq);
    return rfq;
  }

  // Order operations
  async createOrder(orderData) {
    const order = {
      ...orderData,
      _id: `order_${Date.now()}`,
      orderNumber: `ORD-${String(this.orders.length + 1).padStart(4, '0')}`,
      status: 'confirmed',
      timeline: [{
        status: 'created',
        message: 'Order created',
        timestamp: new Date()
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.push(order);
    return order;
  }

  // Dashboard data
  async getDashboardData(role, userId) {
    const users = global.inMemoryData?.users || [];
    const products = global.inMemoryData?.products || [];
    const rfqs = global.inMemoryData?.rfqs || [];
    const orders = global.inMemoryData?.orders || [];
  
    if (role === 'admin') {
      return {
        metrics: {
          totalUsers: users.length,
          totalProducts: products.length,
          totalRFQs: rfqs.length,
          totalOrders: orders.length,
          activeSHGs: users.filter(u => u.role === 'shg').length,
          activeBuyers: users.filter(u => u.role === 'buyer').length
        },
        charts: {
          monthlyData: [],
          categoryData: []
        },
        recent: {
          rfqs: rfqs.slice(-5),
          orders: orders.slice(-5)
        },
        alerts: []
      };
    }
  
    if (role === 'shg') {
      const myProducts = products.filter(p => p.shg === userId);
      const myRFQs = rfqs.filter(r => 
        myProducts.some(p => p._id === r.product)
      );
      const myOrders = orders.filter(o => o.shg === userId);
      
      return {
        stats: {
          products: myProducts.length,
          rfqs: myRFQs.length,
          orders: myOrders.length,
          revenue: 0
        },
        charts: { weeklyData: [] },
        recent: {
          orders: myOrders.slice(-5),
          products: myProducts.slice(-5)
        },
        quality: {
          moisture: { value: 7.5, target: 8, status: 'pass' },
          purity: { value: 98, target: 95, status: 'pass' }
        },
        templates: []
      };
    }
  
    if (role === 'buyer') {
      const myRFQs = rfqs.filter(r => r.buyer === userId);
      const myOrders = orders.filter(o => o.buyer === userId);
      
      return {
        stats: {
          rfqs: myRFQs.length,
          orders: myOrders.length,
          totalSpent: 0
        },
        recent: {
          rfqs: myRFQs.slice(-5),
          orders: myOrders.slice(-5)
        },
        breakdowns: {
          rfqStatus: [],
          orderStatus: []
        }
      };
    }
  
    return {};
  }

  // Impact metrics
  async getImpactMetrics() {
    return {
      summary: {
        wasteProcessed: 2847650,
        co2Avoided: 1842,
        womenEmployed: 12450,
        templesOnboarded: 2847,
        shgUnits: 456,
        districtsActive: 32
      },
      monthlyTrend: [],
      districtData: [],
      sdgAlignment: [],
      latestMetrics: null
    };
  }
}

module.exports = new InMemoryDB();
