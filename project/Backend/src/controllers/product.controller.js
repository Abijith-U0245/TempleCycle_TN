const Joi = require('joi');
const Product = require('../models/Product');
const { successResponse, errorResponse, validationErrorResponse } = require('../utils/response');
const inMemoryDB = require('../utils/inMemoryDB');

// Validation schemas
const productSchema = Joi.object({
  name: Joi.string().required().min(2).max(200),
  category: Joi.string().valid('incense_powder', 'compost', 'natural_dye', 'essential_oil', 'flower').required(),
  description: Joi.string().required().max(1000),
  flower_composition: Joi.object().pattern(Joi.string(), Joi.number().min(0).max(100)),
  specifications: Joi.object({
    moisture_content: Joi.number().min(0).max(100),
    mesh_size: Joi.string(),
    purity: Joi.number().min(0).max(100),
    shelf_life: Joi.string(),
    storage_conditions: Joi.string()
  }),
  availability: Joi.object({
    monthly_availability_tonnes: Joi.number().min(0),
    moq_kg: Joi.number().min(1),
    lead_time_days: Joi.number().min(1)
  }),
  pricing: Joi.object({
    price_min: Joi.number().min(0).required(),
    price_max: Joi.number().min(0).required()
  }).required(),
  certifications: Joi.array().items(Joi.string()),
  status: Joi.string().valid('available', 'limited', 'out_of_stock', 'coming_soon'),
  images: Joi.array().items(Joi.string().uri()),
  temple: Joi.object({
    name: Joi.string(),
    location: Joi.string(),
    district: Joi.string()
  })
});

/**
 * Get all products with filtering and search
 */
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      status = 'available',
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let products, total;

    if (global.useInMemoryDB) {
      // Use in-memory database
      const query = {};
      if (category && category !== 'all') query.category = category;
      if (status && status !== 'all') query.status = status;
      
      products = await inMemoryDB.findProducts(query, { page: parseInt(page), limit: parseInt(limit) });
      total = await inMemoryDB.countProducts(query);
    } else {
      // Use MongoDB
      const query = {};
      
      if (category && category !== 'all') {
        query.category = category;
      }
      
      if (status && status !== 'all') {
        query.status = status;
      }

      if (search) {
        query.$text = { $search: search };
      }

      if (minPrice || maxPrice) {
        query['pricing.price_min'] = {};
        if (minPrice) query['pricing.price_min'].$gte = parseFloat(minPrice);
        if (maxPrice) query['pricing.price_min'].$lte = parseFloat(maxPrice);
      }

      // Build sort
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Execute query
      products = await Product.find(query)
        .populate('shg', 'name organization phone')
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      total = await Product.countDocuments(query);
    }

    successResponse(res, {
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    }, 'Products retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get product by ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('shg', 'name organization phone address');

    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    successResponse(res, product, 'Product retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Create new product (SHG or Admin only)
 */
const createProduct = async (req, res) => {
  try {
    // Validate input
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return validationErrorResponse(res, error.details.map(d => d.message));
    }

    // Add SHG to product
    value.shg = req.user._id;

    const product = new Product(value);
    await product.save();

    await product.populate('shg', 'name organization phone');

    successResponse(res, product, 'Product created successfully', 201);

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Update product (Owner or Admin only)
 */
const updateProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return validationErrorResponse(res, error.details.map(d => d.message));
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    // Check ownership
    if (product.shg.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return errorResponse(res, 'You can only update your own products', 403);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: value },
      { new: true, runValidators: true }
    ).populate('shg', 'name organization phone');

    successResponse(res, updatedProduct, 'Product updated successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Delete product (Owner or Admin only)
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    // Check ownership
    if (product.shg.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return errorResponse(res, 'You can only delete your own products', 403);
    }

    await Product.findByIdAndDelete(req.params.id);

    successResponse(res, null, 'Product deleted successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get products by current user (SHG)
 */
const getMyProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const query = { shg: req.user._id };
    if (status) {
      query.status = status;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    successResponse(res, {
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    }, 'Your products retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
};
