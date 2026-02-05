const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { shgOrAdmin, buyerOrAdmin, csrAccess } = require('../middleware/role.middleware');
const {
  createRFQ,
  getRFQs,
  getRFQById,
  submitQuote,
  updateRFQStatus,
  getMyRFQs
} = require('../controllers/rfq.controller');

const router = express.Router();

/**
 * @route   GET /api/rfq
 * @desc    Get all RFQs with filtering
 * @access  Private (Buyer, SHG, Admin, CSR)
 */
router.get('/', authenticate, csrAccess, getRFQs);

/**
 * @route   GET /api/rfq/my
 * @desc    Get current user's RFQs (Buyer)
 * @access  Private (Buyer, Admin)
 */
router.get('/my', authenticate, buyerOrAdmin, getMyRFQs);

/**
 * @route   GET /api/rfq/:id
 * @desc    Get RFQ by ID
 * @access  Private (Buyer, SHG, Admin, CSR)
 */
router.get('/:id', authenticate, csrAccess, getRFQById);

/**
 * @route   POST /api/rfq
 * @desc    Create new RFQ
 * @access  Private (Buyer, Admin)
 */
router.post('/', authenticate, buyerOrAdmin, createRFQ);

/**
 * @route   POST /api/rfq/:id/quote
 * @desc    Submit quote for RFQ
 * @access  Private (SHG, Admin)
 */
router.post('/:id/quote', authenticate, shgOrAdmin, submitQuote);

/**
 * @route   PUT /api/rfq/:id/status
 * @desc    Update RFQ status
 * @access  Private (Buyer, Admin)
 */
router.put('/:id/status', authenticate, buyerOrAdmin, updateRFQStatus);

module.exports = router;
