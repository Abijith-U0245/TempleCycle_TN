const express = require('express');
const { authenticate, optionalAuth } = require('../middleware/auth.middleware');
const { csrAccess } = require('../middleware/role.middleware');
const {
  getImpactMetrics,
  getProductTraceability,
  updateQRScan,
  getPublicImpact
} = require('../controllers/impact.controller');

const router = express.Router();

/**
 * @route   GET /api/impact/metrics
 * @desc    Get impact metrics
 * @access  Private (All roles)
 */
router.get('/metrics', authenticate, getImpactMetrics);

/**
 * @route   GET /api/impact/public
 * @desc    Get public impact data
 * @access  Public
 */
router.get('/public', optionalAuth, getPublicImpact);

/**
 * @route   GET /api/impact/traceability/:productId
 * @desc    Get traceability data for a product
 * @access  Private (All roles)
 */
router.get('/traceability/:productId', authenticate, csrAccess, getProductTraceability);

/**
 * @route   POST /api/impact/qr/:batchNumber
 * @desc    Update QR code scan count
 * @access  Public
 */
router.post('/qr/:batchNumber', updateQRScan);

module.exports = router;
