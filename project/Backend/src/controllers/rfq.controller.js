const Joi = require('joi');
const RFQ = require('../models/RFQ');
const Product = require('../models/Product');
const { successResponse, errorResponse, validationErrorResponse } = require('../utils/response');

// Validation schemas
const rfqSchema = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.object({
    requested_kg: Joi.number().min(1).required(),
    unit_price: Joi.number().min(0),
    total_value: Joi.number().min(0)
  }).required(),
  specifications: Joi.object({
    moisture_content_max: Joi.number().min(0).max(100),
    purity_min: Joi.number().min(0).max(100),
    mesh_size: Joi.string(),
    delivery_timeline: Joi.string(),
    payment_terms: Joi.string(),
    special_requirements: Joi.string()
  })
});

const quoteSchema = Joi.object({
  unit_price: Joi.number().min(0).required(),
  total_amount: Joi.number().min(0),
  lead_time_days: Joi.number().min(1),
  validity_days: Joi.number().min(1).default(30),
  message: Joi.string(),
  documents: Joi.array().items(Joi.string().uri())
});

/**
 * Create new RFQ (Buyer only)
 */
const createRFQ = async (req, res) => {
  try {
    // Validate input
    const { error, value } = rfqSchema.validate(req.body);
    if (error) {
      return validationErrorResponse(res, error.details.map(d => d.message));
    }

    // Check if product exists
    const product = await Product.findById(value.product);
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    // Add buyer to RFQ
    value.buyer = req.user._id;

    const rfq = new RFQ(value);
    await rfq.save();

    await rfq.populate([
      { path: 'buyer', select: 'name organization email phone' },
      { path: 'product', select: 'name category images' }
    ]);

    successResponse(res, rfq, 'RFQ created successfully', 201);

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get all RFQs with filtering
 */
const getRFQs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      buyer,
      product,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (status) {
      query.status = status;
    }

    if (buyer) {
      query.buyer = buyer;
    }

    if (product) {
      query.product = product;
    }

    // For SHG users, only show RFQs for relevant products
    if (req.user.role === 'shg') {
      // Get SHG's products to find relevant RFQs
      const shgProducts = await Product.find({ shg: req.user._id }).distinct('_id');
      query.product = { $in: shgProducts };
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const rfqs = await RFQ.find(query)
      .populate('buyer', 'name organization email phone')
      .populate('product', 'name category images shg')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await RFQ.countDocuments(query);

    successResponse(res, {
      rfqs,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    }, 'RFQs retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get RFQ by ID
 */
const getRFQById = async (req, res) => {
  try {
    const rfq = await RFQ.findById(req.params.id)
      .populate('buyer', 'name organization email phone address')
      .populate('product', 'name category description images shg')
      .populate('quotes.shg', 'name organization phone');

    if (!rfq) {
      return errorResponse(res, 'RFQ not found', 404);
    }

    // Check access permissions
    if (req.user.role === 'buyer' && rfq.buyer._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    if (req.user.role === 'shg') {
      // Check if SHG quotes for this product
      const shgProducts = await Product.find({ shg: req.user._id }).distinct('_id');
      if (!shgProducts.includes(rfq.product._id.toString())) {
        return errorResponse(res, 'Access denied', 403);
      }
    }

    successResponse(res, rfq, 'RFQ retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Submit quote for RFQ (SHG only)
 */
const submitQuote = async (req, res) => {
  try {
    const { error, value } = quoteSchema.validate(req.body);
    if (error) {
      return validationErrorResponse(res, error.details.map(d => d.message));
    }

    const rfq = await RFQ.findById(req.params.id);
    if (!rfq) {
      return errorResponse(res, 'RFQ not found', 404);
    }

    // Check if SHG can quote for this product
    const product = await Product.findById(rfq.product);
    if (!product || product.shg.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'You can only quote for your own products', 403);
    }

    // Check if RFQ is still open for quotes
    if (!['pending', 'under_review'].includes(rfq.status)) {
      return errorResponse(res, 'RFQ is not accepting quotes', 400);
    }

    // Check if SHG has already quoted
    const existingQuote = rfq.quotes.find(q => q.shg.toString() === req.user._id.toString());
    if (existingQuote) {
      return errorResponse(res, 'You have already submitted a quote for this RFQ', 400);
    }

    // Add quote
    value.shg = req.user._id;
    rfq.quotes.push(value);

    // Update RFQ status if needed
    if (rfq.status === 'pending') {
      rfq.status = 'under_review';
    }

    // Add timeline entry
    rfq.timeline.push({
      status: 'quote_submitted',
      message: `Quote submitted by ${req.user.name}`,
      updated_by: req.user._id
    });

    await rfq.save();
    await rfq.populate('quotes.shg', 'name organization phone');

    successResponse(res, rfq, 'Quote submitted successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Update RFQ status (Admin or Buyer only)
 */
const updateRFQStatus = async (req, res) => {
  try {
    const { status, quoteId, notes } = req.body;

    if (!['quoted', 'accepted', 'rejected', 'closed'].includes(status)) {
      return errorResponse(res, 'Invalid status', 400);
    }

    const rfq = await RFQ.findById(req.params.id);
    if (!rfq) {
      return errorResponse(res, 'RFQ not found', 404);
    }

    // Check permissions
    if (req.user.role === 'buyer' && rfq.buyer.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    // Update status
    rfq.status = status;

    // Add timeline entry
    rfq.timeline.push({
      status,
      message: notes || `RFQ status updated to ${status}`,
      updated_by: req.user._id
    });

    await rfq.save();

    successResponse(res, rfq, 'RFQ status updated successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get my RFQs (Buyer)
 */
const getMyRFQs = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const query = { buyer: req.user._id };
    if (status) {
      query.status = status;
    }

    const rfqs = await RFQ.find(query)
      .populate('product', 'name category images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await RFQ.countDocuments(query);

    successResponse(res, {
      rfqs,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    }, 'Your RFQs retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createRFQ,
  getRFQs,
  getRFQById,
  submitQuote,
  updateRFQStatus,
  getMyRFQs
};
