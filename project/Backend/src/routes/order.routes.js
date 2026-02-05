const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { shgOrAdmin, buyerOrAdmin, csrAccess } = require('../middleware/role.middleware');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  addPayment,
  uploadDocument
} = require('../controllers/order.controller');

const router = express.Router();

/**
 * @route   GET /api/orders
 * @desc    Get all orders with filtering
 * @access  Private (Buyer, SHG, Admin, CSR)
 */
router.get('/', authenticate, csrAccess, getOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private (Buyer, SHG, Admin, CSR)
 */
router.get('/:id', authenticate, csrAccess, getOrderById);

/**
 * @route   POST /api/orders
 * @desc    Create new order
 * @access  Private (Buyer, Admin)
 */
router.post('/', authenticate, buyerOrAdmin, createOrder);

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Update order status
 * @access  Private (Buyer, SHG, Admin)
 */
router.put('/:id/status', authenticate, updateOrderStatus);

/**
 * @route   POST /api/orders/:id/payment
 * @desc    Add payment record
 * @access  Private (Buyer, Admin)
 */
router.post('/:id/payment', authenticate, buyerOrAdmin, addPayment);

/**
 * @route   POST /api/orders/:id/documents
 * @desc    Upload order documents
 * @access  Private (SHG, Admin)
 */
router.post('/:id/documents', authenticate, shgOrAdmin, uploadDocument);

module.exports = router;
