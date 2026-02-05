const User = require('../models/User');
const Product = require('../models/Product');
const RFQ = require('../models/RFQ');
const Order = require('../models/Order');
const { successResponse, errorResponse } = require('../utils/response');
const inMemoryDB = require('../utils/inMemoryDB');

/**
 * Get admin dashboard data
 */
const getAdminDashboard = async (req, res) => {
  try {
    let dashboardData;

    if (global.useInMemoryDB) {
      // Use in-memory database
      dashboardData = await inMemoryDB.getDashboardData('admin', req.user._id);
    } else {
      // Use MongoDB
      // Get key metrics
      const [
        totalUsers,
        totalProducts,
        totalRFQs,
        totalOrders,
        activeSHGs,
        activeBuyers
      ] = await Promise.all([
        User.countDocuments({ isActive: true }),
        Product.countDocuments(),
        RFQ.countDocuments(),
        Order.countDocuments(),
        User.countDocuments({ role: 'shg', isActive: true }),
        User.countDocuments({ role: 'buyer', isActive: true })
      ]);

      // Get monthly data for charts
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const monthlyData = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            revenue: { $sum: '$orderDetails.total_amount' },
            orders: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }
        }
      ]);

      // Format monthly data
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const formattedMonthlyData = monthlyData.map(item => ({
        month: monthNames[item._id.month - 1],
        revenue: item.revenue,
        orders: item.orders
      }));

      // Get category distribution
      const categoryData = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]);

      const formattedCategoryData = categoryData.map(item => ({
        name: item._id.charAt(0).toUpperCase() + item._id.slice(1).replace('_', ' '),
        value: item.count
      }));

      // Get recent RFQs
      const recentRFQs = await RFQ.find()
        .populate('buyer', 'name organization')
        .populate('product', 'name')
        .sort({ createdAt: -1 })
        .limit(10)
        .select('rfqNumber buyer product quantity status createdAt');

      // Get recent orders
      const recentOrders = await Order.find()
        .populate('buyer', 'name organization')
        .populate('shg', 'name organization')
        .populate('product', 'name')
        .sort({ createdAt: -1 })
        .limit(10)
        .select('orderNumber buyer shg product status createdAt orderDetails.total_amount');

      // Get alerts
      const alerts = [];
      
      // Low stock alerts
      const lowStockProducts = await Product.find({
        'availability.monthly_availability_tonnes': { $lt: 10 },
        status: 'available'
      }).countDocuments();
      
      if (lowStockProducts > 0) {
        alerts.push({
          type: 'warning',
          message: `${lowStockProducts} products with low stock`,
          count: lowStockProducts
        });
      }

      // Pending RFQs
      const pendingRFQs = await RFQ.countDocuments({ status: 'pending' });
      if (pendingRFQs > 5) {
        alerts.push({
          type: 'info',
          message: `${pendingRFQs} RFQs pending review`,
          count: pendingRFQs
        });
      }

      dashboardData = {
        metrics: {
          totalUsers,
          totalProducts,
          totalRFQs,
          totalOrders,
          activeSHGs,
          activeBuyers
        },
        charts: {
          monthlyData: formattedMonthlyData,
          categoryData: formattedCategoryData
        },
        recent: {
          rfqs: recentRFQs,
          orders: recentOrders
        },
        alerts
      };
    }

    successResponse(res, dashboardData, 'Admin dashboard data retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get SHG dashboard data
 */
const getSHGDashboard = async (req, res) => {
  try {
    const shgId = req.user._id;

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      myProducts,
      myRFQs,
      myOrders,
      totalRevenue
    ] = await Promise.all([
      Product.countDocuments({ shg: shgId }),
      RFQ.countDocuments({ 
        product: { $in: await Product.find({ shg: shgId }).distinct('_id') }
      }),
      Order.countDocuments({ shg: shgId }),
      Order.aggregate([
        { $match: { shg: shgId, status: { $in: ['delivered', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$orderDetails.total_amount' } } }
      ])
    ]);

    // Get weekly data
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyData = await Order.aggregate([
      {
        $match: {
          shg: shgId,
          createdAt: { $gte: weekAgo }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$orderDetails.total_amount' }
        }
      },
      {
        $sort: { '_id.dayOfWeek': 1 }
      }
    ]);

    // Format weekly data
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formattedWeeklyData = weeklyData.map(item => ({
      day: dayNames[item._id.dayOfWeek - 1],
      orders: item.orders,
      revenue: item.revenue
    }));

    // Get recent orders
    const recentOrders = await Order.find({ shg: shgId })
      .populate('buyer', 'name organization')
      .populate('product', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get my products
    const myProductsList = await Product.find({ shg: shgId })
      .sort({ createdAt: -1 })
      .limit(10);

    // Get quality status (mock data for now)
    const qualityStatus = {
      moisture: { value: 7.5, target: 8, status: 'pass' },
      purity: { value: 98, target: 95, status: 'pass' },
      meshSize: { value: 100, target: 80, status: 'pass' }
    };

    // Get temple templates (mock data)
    const templates = [
      { temple: 'Sri Meenakshi Temple', kg: 85, time: '6:30 AM' },
      { temple: 'Thiruparankundram Temple', kg: 65, time: '7:15 AM' },
      { temple: 'Alagar Kovil', kg: 45, time: '8:00 AM' }
    ];

    const dashboardData = {
      stats: {
        products: myProducts,
        rfqs: myRFQs,
        orders: myOrders,
        revenue: totalRevenue[0]?.total || 0
      },
      charts: {
        weeklyData: formattedWeeklyData
      },
      recent: {
        orders: recentOrders,
        products: myProductsList
      },
      quality: qualityStatus,
      templates
    };

    successResponse(res, dashboardData, 'SHG dashboard data retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get buyer dashboard data
 */
const getBuyerDashboard = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const [
      myRFQs,
      myOrders,
      totalSpent
    ] = await Promise.all([
      RFQ.countDocuments({ buyer: buyerId }),
      Order.countDocuments({ buyer: buyerId }),
      Order.aggregate([
        { $match: { buyer: buyerId, status: { $in: ['delivered', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$orderDetails.total_amount' } } }
      ])
    ]);

    // Get recent RFQs
    const recentRFQs = await RFQ.find({ buyer: buyerId })
      .populate('product', 'name category images')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get recent orders
    const recentOrders = await Order.find({ buyer: buyerId })
      .populate('shg', 'name organization')
      .populate('product', 'name category images')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get RFQ status breakdown
    const rfqStatusBreakdown = await RFQ.aggregate([
      { $match: { buyer: buyerId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get order status breakdown
    const orderStatusBreakdown = await Order.aggregate([
      { $match: { buyer: buyerId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const dashboardData = {
      stats: {
        rfqs: myRFQs,
        orders: myOrders,
        totalSpent: totalSpent[0]?.total || 0
      },
      recent: {
        rfqs: recentRFQs,
        orders: recentOrders
      },
      breakdowns: {
        rfqStatus: rfqStatusBreakdown,
        orderStatus: orderStatusBreakdown
      }
    };

    successResponse(res, dashboardData, 'Buyer dashboard data retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getAdminDashboard,
  getSHGDashboard,
  getBuyerDashboard
};
