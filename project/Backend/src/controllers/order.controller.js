const Joi = require('joi');
const Order = require('../models/Order');
const RFQ = require('../models/RFQ');
const { successResponse, errorResponse, validationErrorResponse } = require('../utils/response');

// Validation schemas
const orderSchema = Joi.object({
  rfq: Joi.string().required(),
  orderDetails: Joi.object({
    quantity_kg: Joi.number().min(1).required(),
    unit_price: Joi.number().min(0).required(),
    total_amount: Joi.number().min(0).required()
  }).required(),
  delivery: Joi.object({
    delivery_address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      state: Joi.string().required(),
      pincode: Joi.string().required()
    }).required(),
    delivery_date: Joi.date().required(),
    delivery_method: Joi.string()
  }).required(),
  payment: Joi.object({
    payment_terms: Joi.string().required(),
    advance_percentage: Joi.number().min(0).max(100).default(0)
  })
});

/**
 * Create new order from RFQ
 */
const createOrder = async (req, res) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      return validationErrorResponse(res, error.details.map(d => d.message));
    }

    // Get RFQ
    const rfq = await RFQ.findById(value.rfq)
      .populate('buyer', 'name organization email')
      .populate('product', 'name category shg');

    if (!rfq) {
      return errorResponse(res, 'RFQ not found', 404);
    }

    // Check permissions
    if (req.user.role === 'buyer' && rfq.buyer._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    // Check if RFQ is accepted
    if (rfq.status !== 'accepted') {
      return errorResponse(res, 'RFQ must be accepted before creating order', 400);
    }

    // Create order
    const order = new Order({
      ...value,
      buyer: rfq.buyer._id,
      shg: rfq.product.shg,
      product: rfq.product._id
    });

    await order.save();

    // Update RFQ status
    rfq.status = 'closed';
    await rfq.save();

    await order.populate([
      { path: 'buyer', select: 'name organization email phone' },
      { path: 'shg', select: 'name organization phone' },
      { path: 'product', select: 'name category' }
    ]);

    successResponse(res, order, 'Order created successfully', 201);

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get all orders with filtering
 */
const getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      buyer,
      shg,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (status) {
      query.status = status;
    }

    // Filter based on user role
    if (req.user.role === 'buyer') {
      query.buyer = req.user._id;
    } else if (req.user.role === 'shg') {
      query.shg = req.user._id;
    } else if (buyer) {
      query.buyer = buyer;
    } else if (shg) {
      query.shg = shg;
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const orders = await Order.find(query)
      .populate('buyer', 'name organization email')
      .populate('shg', 'name organization phone')
      .populate('product', 'name category images')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Order.countDocuments(query);

    successResponse(res, {
      orders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    }, 'Orders retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get order by ID
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name organization email phone address')
      .populate('shg', 'name organization phone address')
      .populate('product', 'name description category images')
      .populate('timeline.updated_by', 'name role');

    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    // Check access permissions
    if (req.user.role === 'buyer' && order.buyer._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    if (req.user.role === 'shg' && order.shg._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    successResponse(res, order, 'Order retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Update order status
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { status, notes, tracking_number } = req.body;

    if (!['confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'completed'].includes(status)) {
      return errorResponse(res, 'Invalid status', 400);
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    // Check permissions
    if (req.user.role === 'buyer' && order.buyer.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    if (req.user.role === 'shg' && order.shg.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    // Update status
    order.status = status;

    // Update tracking number if provided
    if (tracking_number) {
      order.delivery.tracking_number = tracking_number;
    }

    // Add timeline entry
    order.timeline.push({
      status,
      message: notes || `Order status updated to ${status}`,
      updated_by: req.user._id
    });

    await order.save();

    successResponse(res, order, 'Order status updated successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Add payment record
 */
const addPayment = async (req, res) => {
  try {
    const { amount, payment_method, transaction_id, notes } = req.body;

    if (!amount || !payment_method) {
      return errorResponse(res, 'Amount and payment method are required', 400);
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    // Check permissions
    if (req.user.role !== 'admin' && order.buyer.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    // Add payment record
    order.payment.payment_history.push({
      amount,
      payment_date: new Date(),
      payment_method,
      transaction_id,
      notes
    });

    // Update payment totals
    const totalPaid = order.payment.payment_history.reduce((sum, payment) => sum + payment.amount, 0);
    order.payment.advance_paid = totalPaid;
    order.payment.balance_due = order.orderDetails.total_amount - totalPaid;

    // Update payment status
    if (totalPaid >= order.orderDetails.total_amount) {
      order.payment.payment_status = 'paid';
    } else if (totalPaid > 0) {
      order.payment.payment_status = 'partial';
    }

    await order.save();

    successResponse(res, order, 'Payment recorded successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Upload order documents
 */
const uploadDocument = async (req, res) => {
  try {
    const { document_type, document_url } = req.body;

    if (!document_type || !document_url) {
      return errorResponse(res, 'Document type and URL are required', 400);
    }

    const validTypes = ['invoice', 'packing_list', 'quality_certificate', 'transport_receipt', 'delivery_proof'];
    if (!validTypes.includes(document_type)) {
      return errorResponse(res, 'Invalid document type', 400);
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    // Check permissions
    if (req.user.role === 'shg' && order.shg.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Access denied', 403);
    }

    // Add document
    order.documents[document_type] = document_url;
    await order.save();

    successResponse(res, order, 'Document uploaded successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  addPayment,
  uploadDocument
};
