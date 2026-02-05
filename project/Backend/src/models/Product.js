const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['incense_powder', 'compost', 'natural_dye', 'essential_oil', 'flower']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  flower_composition: {
    type: Map,
    of: Number,
    default: new Map()
  },
  specifications: {
    moisture_content: {
      type: Number,
      min: 0,
      max: 100
    },
    mesh_size: String,
    purity: {
      type: Number,
      min: 0,
      max: 100
    },
    shelf_life: String, // in months
    storage_conditions: String
  },
  availability: {
    monthly_availability_tonnes: {
      type: Number,
      min: 0,
      default: 0
    },
    moq_kg: {
      type: Number,
      min: 1,
      default: 100
    },
    lead_time_days: {
      type: Number,
      min: 1,
      default: 7
    }
  },
  pricing: {
    price_min: {
      type: Number,
      min: 0,
      required: [true, 'Minimum price is required']
    },
    price_max: {
      type: Number,
      min: 0,
      required: [true, 'Maximum price is required']
    }
  },
  certifications: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['available', 'limited', 'out_of_stock', 'coming_soon'],
    default: 'available'
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  }],
  shg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  temple: {
    name: String,
    location: String,
    district: String
  },
  quality_metrics: {
    lab_tested: { type: Boolean, default: false },
    test_date: Date,
    test_results: Map
  },
  sustainability: {
    waste_diverted_kg: Number,
    co2_saved_kg: Number,
    water_saved_liters: Number
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ 'pricing.price_min': 1, 'pricing.price_max': 1 });

// Virtual for price range
productSchema.virtual('priceRange').get(function() {
  return `₹${this.pricing.price_min} - ₹${this.pricing.price_max}/kg`;
});

module.exports = mongoose.model('Product', productSchema);
