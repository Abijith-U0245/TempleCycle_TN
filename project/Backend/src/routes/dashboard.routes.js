const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { adminOnly, shgOrAdmin, buyerOrAdmin } = require('../middleware/role.middleware');
const {
  getAdminDashboard,
  getSHGDashboard,
  getBuyerDashboard
} = require('../controllers/dashboard.controller');

const router = express.Router();

/**
 * @route   GET /api/dashboard/admin
 * @desc    Get admin dashboard data
 * @access  Private (Admin only)
 */
router.get('/admin', authenticate, adminOnly, getAdminDashboard);

/**
 * @route   GET /api/dashboard/shg
 * @desc    Get SHG dashboard data
 * @access  Private (SHG, Admin)
 */
router.get('/shg', authenticate, shgOrAdmin, getSHGDashboard);

/**
 * @route   GET /api/dashboard/buyer
 * @desc    Get buyer dashboard data
 * @access  Private (Buyer, Admin)
 */
router.get('/buyer', authenticate, buyerOrAdmin, getBuyerDashboard);

module.exports = router;
