const express = require('express');
const { authenticate, optionalAuth } = require('../middleware/auth.middleware');
const { shgOrAdmin, buyerOrAdmin, csrAccess } = require('../middleware/role.middleware');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/product.controller');

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering and search
 * @access  Public
 */
router.get('/', optionalAuth, getProducts);

/**
 * @route   GET /api/products/my
 * @desc    Get current user's products (SHG)
 * @access  Private (SHG, Admin)
 */
router.get('/my', authenticate, shgOrAdmin, getMyProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get('/:id', optionalAuth, getProductById);

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Private (SHG, Admin)
 */
router.post('/', authenticate, shgOrAdmin, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Private (Owner SHG, Admin)
 */
router.put('/:id', authenticate, shgOrAdmin, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private (Owner SHG, Admin)
 */
router.delete('/:id', authenticate, shgOrAdmin, deleteProduct);

module.exports = router;
