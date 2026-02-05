const mongoose = require('mongoose');

const rfqSchema = new mongoose.Schema({
  rfqNumber: {
    type: String,
    required: true,
    unique: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    requested_kg: {
      type: Number,
      required: true,
      min: 1
    },
    unit_price: Number,
    total_value: Number
  },
  specifications: {
    moisture_content_max: Number,
    purity_min: Number,
    mesh_size: String,
    delivery_timeline: String,
    payment_terms: String,
    special_requirements: String
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'quoted', 'accepted', 'rejected', 'closed'],
    default: 'pending'
  },
  quotes: [{
    shg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    unit_price: {
      type: Number,
      required: true
    },
    total_amount: Number,
    lead_time_days: Number,
    validity_days: { type: Number, default: 30 },
    message: String,
    documents: [String],
    submitted_at: { type: Date, default: Date.now }
  }],
  timeline: [{
    status: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  negotiation: {
    is_negotiable: { type: Boolean, default: true },
    final_price: Number,
    final_quantity: Number,
    final_lead_time: Number
  }
}, {
  timestamps: true
});

// Auto-generate RFQ number
rfqSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.rfqNumber = `RFQ-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('RFQ', rfqSchema);
