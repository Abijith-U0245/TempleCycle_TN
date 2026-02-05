const mongoose = require('mongoose');

const traceabilitySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  batch_number: {
    type: String,
    required: true,
    unique: true
  },
  supply_chain: [{
    stage: {
      type: String,
      enum: ['collection', 'transportation', 'processing', 'quality_check', 'packaging', 'shipping', 'delivery'],
      required: true
    },
    location: {
      name: String,
      address: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    timestamp: {
      type: Date,
      required: true
    },
    handler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    details: {
      temperature: Number,
      humidity: Number,
      weight_kg: Number,
      quality_notes: String,
      equipment_used: String,
      processing_method: String
    },
    documents: [{
      type: {
        type: String,
        enum: ['photo', 'certificate', 'receipt', 'test_report', 'transport_document']
      },
      url: String,
      uploaded_at: { type: Date, default: Date.now },
      uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
    quality_metrics: {
      moisture_content: Number,
      purity_percentage: Number,
      particle_size: String,
      microbial_count: Number,
      heavy_metals: Map,
      organic_matter: Number
    }
  }],
  temple_source: {
    temple_name: {
      type: String,
      required: true
    },
    temple_id: String,
    location: {
      address: String,
      district: String,
      state: { type: String, default: 'Tamil Nadu' }
    },
    collection_details: {
      collection_date: { type: Date, required: true },
      collection_time: String,
      flower_types: [String],
      estimated_quantity_kg: Number,
      condition: {
        type: String,
        enum: ['fresh', 'slightly_wilted', 'wilted', 'mixed']
      },
      segregation_done: { type: Boolean, default: false }
    },
    temple_contact: {
      priest_name: String,
      contact_number: String,
      email: String
    }
  },
  shg_processing: {
    shg_name: String,
    shg_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    processing_location: String,
    processing_methods: [{
      method: String,
      duration_hours: Number,
      equipment: String,
      quality_checks: [String]
    }],
    workers_involved: Number,
    processing_date: Date,
    quality_standards_met: [String]
  },
  quality_assurance: {
    lab_tested: { type: Boolean, default: false },
    lab_name: String,
    test_date: Date,
    test_report_number: String,
    parameters_tested: [String],
    results: Map,
    certified_by: String,
    certification_valid_until: Date
  },
  sustainability_metrics: {
    carbon_footprint_kg: Number,
    water_usage_liters: Number,
    waste_generated_kg: Number,
    recycled_percentage: Number,
    energy_consumption_kwh: Number
  },
  qr_code: {
    url: String,
    generated_at: { type: Date, default: Date.now },
    scan_count: { type: Number, default: 0 }
  },
  blockchain_hash: String, // For future blockchain integration
  certifications: [{
    name: String,
    issued_by: String,
    issue_date: Date,
    expiry_date: Date,
    certificate_url: String,
    verification_code: String
  }]
}, {
  timestamps: true
});

// Auto-generate batch number
traceabilitySchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.batch_number = `TC-${dateStr}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Traceability', traceabilitySchema);
