const mongoose = require('mongoose');

const impactMetricSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true
  },
  waste_management: {
    flowers_collected_kg: {
      type: Number,
      default: 0
    },
    flowers_processed_kg: {
      type: Number,
      default: 0
    },
    waste_diverted_from_landfill_kg: {
      type: Number,
      default: 0
    }
  },
  environmental_impact: {
    co2_emissions_avoided_kg: {
      type: Number,
      default: 0
    },
    water_saved_liters: {
      type: Number,
      default: 0
    },
    chemical_fertilizers_avoided_kg: {
      type: Number,
      default: 0
    }
  },
  social_impact: {
    women_employed: {
      type: Number,
      default: 0
    },
    shg_units_active: {
      type: Number,
      default: 0
    },
    temples_onboarded: {
      type: Number,
      default: 0
    },
    districts_active: {
      type: Number,
      default: 0
    },
    fair_wage_jobs_created: {
      type: Number,
      default: 0
    }
  },
  economic_impact: {
    revenue_generated_inr: {
      type: Number,
      default: 0
    },
    shg_earnings_inr: {
      type: Number,
      default: 0
    },
    cost_savings_for_temples_inr: {
      type: Number,
      default: 0
    }
  },
  product_breakdown: {
    incense_powder_kg: { type: Number, default: 0 },
    compost_kg: { type: Number, default: 0 },
    natural_dye_kg: { type: Number, default: 0 },
    essential_oil_liters: { type: Number, default: 0 },
    fresh_flowers_kg: { type: Number, default: 0 }
  },
  district_data: [{
    district_name: String,
    temples_count: Number,
    flowers_collected_kg: Number,
    shg_units: Number,
    women_employed: Number
  }],
  temple_data: [{
    temple_name: String,
    district: String,
    flowers_collected_kg: Number,
    collection_frequency: String,
    shg_assigned: String
  }],
  sdg_alignment: {
    sdg_5_gender_equality: {
      women_empowered: Number,
      leadership_positions: Number,
      skill_training_programs: Number
    },
    sdg_8_decent_work: {
      fair_wage_jobs: Number,
      safe_working_conditions: Boolean,
      skill_development_hours: Number
    },
    sdg_11_sustainable_cities: {
      waste_management_systems: Number,
      green_spaces_created: Number,
      pollution_reduced_kg: Number
    },
    sdg_12_responsible_consumption: {
      circular_economy_practices: Number,
      waste_recycling_rate: Number,
      sustainable_products_created: Number
    },
    sdg_13_climate_action: {
      carbon_footprint_reduced_kg: Number,
      renewable_energy_used: Boolean,
      climate_resilience_improved: Boolean
    }
  }
}, {
  timestamps: true
});

// Compound indexes for efficient querying
impactMetricSchema.index({ date: 1, period: 1 });
impactMetricSchema.index({ 'social_impact.women_employed': -1 });
impactMetricSchema.index({ 'environmental_impact.co2_emissions_avoided_kg': -1 });

module.exports = mongoose.model('ImpactMetric', impactMetricSchema);
