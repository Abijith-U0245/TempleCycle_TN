const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  rfq: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RFQ',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  orderDetails: {
    quantity_kg: {
      type: Number,
      required: true,
      min: 1
    },
    unit_price: {
      type: Number,
      required: true,
      min: 0
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: { type: String, default: 'INR' }
  },
  delivery: {
    delivery_address: {
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String
    },
    delivery_date: Date,
    delivery_method: String,
    transport_details: String,
    tracking_number: String
  },
  payment: {
    payment_terms: String,
    advance_percentage: { type: Number, default: 0 },
    advance_paid: { type: Number, default: 0 },
    balance_due: Number,
    payment_status: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'overdue'],
      default: 'pending'
    },
    payment_history: [{
      amount: Number,
      payment_date: Date,
      payment_method: String,
      transaction_id: String,
      notes: String
    }]
  },
  status: {
    type: String,
    enum: ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  timeline: [{
    status: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  documents: {
    invoice: String,
    packing_list: String,
    quality_certificate: String,
    transport_receipt: String,
    delivery_proof: String
  },
  quality_check: {
    moisture_content: Number,
    purity_percentage: Number,
    lab_test_date: Date,
    test_results: String,
    passed: Boolean
  },
  impact_metrics: {
    waste_processed_kg: Number,
    co2_saved_kg: Number,
    women_employed_days: Number
  }
}, {
  timestamps: true
});

// Auto-generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
