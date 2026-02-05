const ImpactMetric = require('../models/ImpactMetric');
const Traceability = require('../models/Traceability');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Get impact metrics
 */
const getImpactMetrics = async (req, res) => {
  try {
    const { period = 'monthly', startDate, endDate } = req.query;

    // Build date filter
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      // Default to last 12 months
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      dateFilter.date = { $gte: twelveMonthsAgo };
    }

    // Get impact metrics
    const metrics = await ImpactMetric.find({
      ...dateFilter,
      period
    }).sort({ date: -1 });

    // Get latest metrics for summary
    const latestMetrics = metrics[0];

    // Calculate totals
    const totals = metrics.reduce((acc, metric) => ({
      wasteProcessed: acc.wasteProcessed + metric.waste_management.flowers_processed_kg,
      co2Avoided: acc.co2Avoided + metric.environmental_impact.co2_emissions_avoided_kg,
      womenEmployed: Math.max(acc.womenEmployed, metric.social_impact.women_employed),
      templesOnboarded: Math.max(acc.templesOnboarded, metric.social_impact.temples_onboarded),
      shgUnits: Math.max(acc.shgUnits, metric.social_impact.shg_units_active),
      districtsActive: Math.max(acc.districtsActive, metric.social_impact.districts_active)
    }), {
      wasteProcessed: 0,
      co2Avoided: 0,
      womenEmployed: 0,
      templesOnboarded: 0,
      shgUnits: 0,
      districtsActive: 0
    });

    // Format monthly trend data
    const monthlyTrend = metrics.map(metric => ({
      month: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      waste: Math.round(metric.waste_management.flowers_processed_kg / 1000), // Convert to tonnes
      jobs: metric.social_impact.women_employed
    }));

    // Get district-wise data
    const districtData = latestMetrics?.district_data || [];

    // Get SDG alignment data
    const sdgAlignment = latestMetrics ? [
      {
        goal: 'SDG 5',
        title: 'Gender Equality',
        description: `${latestMetrics.sdg_alignment.sdg_5_gender_equality.women_empowered.toLocaleString()}+ rural women employed`,
        icon: '👩‍🌾'
      },
      {
        goal: 'SDG 8',
        title: 'Decent Work',
        description: `${latestMetrics.sdg_alignment.sdg_8_decent_work.fair_wage_jobs.toLocaleString()} fair wage jobs`,
        icon: '💼'
      },
      {
        goal: 'SDG 11',
        title: 'Sustainable Cities',
        description: `${latestMetrics.sdg_alignment.sdg_11_sustainable_cities.waste_management_systems} waste management systems`,
        icon: '🏙️'
      },
      {
        goal: 'SDG 12',
        title: 'Responsible Consumption',
        description: `${latestMetrics.sdg_alignment.sdg_12_responsible_consumption.waste_recycling_rate}% waste recycling rate`,
        icon: '♻️'
      },
      {
        goal: 'SDG 13',
        title: 'Climate Action',
        description: `${latestMetrics.sdg_alignment.sdg_13_climate_action.carbon_footprint_reduced_kg.toLocaleString()} kg CO₂ reduced`,
        icon: '🌍'
      }
    ] : [];

    const impactData = {
      summary: totals,
      monthlyTrend,
      districtData,
      sdgAlignment,
      latestMetrics: latestMetrics || null
    };

    successResponse(res, impactData, 'Impact metrics retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get traceability data for a product
 */
const getProductTraceability = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find traceability records for the product
    const traceabilityData = await Traceability.find({ product: productId })
      .populate('product', 'name category images')
      .populate('supply_chain.handler', 'name organization')
      .populate('temple_source.temple_contact', 'name phone')
      .populate('shg_processing.shg_id', 'name organization')
      .sort({ createdAt: -1 });

    if (!traceabilityData || traceabilityData.length === 0) {
      return errorResponse(res, 'No traceability data found for this product', 404);
    }

    // Get the most recent batch
    const latestBatch = traceabilityData[0];

    // Format supply chain timeline
    const supplyChainTimeline = latestBatch.supply_chain.map(stage => ({
      stage: stage.stage,
      location: stage.location,
      timestamp: stage.timestamp,
      handler: stage.handler,
      details: stage.details,
      documents: stage.documents,
      quality_metrics: stage.quality_metrics
    }));

    // QR code data
    const qrCodeData = {
      batchNumber: latestBatch.batch_number,
      productName: latestBatch.product.name,
      templeSource: latestBatch.temple_source,
      shgProcessor: latestBatch.shg_processing,
      qualityAssurance: latestBatch.quality_assurance,
      qrUrl: latestBatch.qr_code.url,
      scanCount: latestBatch.qr_code.scan_count
    };

    const traceabilityResponse = {
      product: latestBatch.product,
      batchInfo: {
        batchNumber: latestBatch.batch_number,
        createdAt: latestBatch.createdAt,
        qrCode: qrCodeData
      },
      supplyChain: supplyChainTimeline,
      templeSource: latestBatch.temple_source,
      shgProcessing: latestBatch.shg_processing,
      qualityAssurance: latestBatch.quality_assurance,
      sustainability: latestBatch.sustainability_metrics,
      certifications: latestBatch.certifications,
      blockchainHash: latestBatch.blockchain_hash
    };

    successResponse(res, traceabilityResponse, 'Traceability data retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Update QR code scan count
 */
const updateQRScan = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    const traceability = await Traceability.findOne({ batch_number: batchNumber });
    
    if (!traceability) {
      return errorResponse(res, 'Invalid batch number', 404);
    }

    // Increment scan count
    traceability.qr_code.scan_count += 1;
    await traceability.save();

    // Return basic product info for QR scan
    const qrInfo = {
      batchNumber: traceability.batch_number,
      productName: traceability.product,
      templeSource: traceability.temple_source.temple_name,
      scanCount: traceability.qr_code.scan_count,
      lastScanned: new Date()
    };

    successResponse(res, qrInfo, 'QR scan recorded successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get impact summary for public API
 */
const getPublicImpact = async (req, res) => {
  try {
    // Get latest impact metrics
    const latestMetrics = await ImpactMetric.findOne({ period: 'monthly' })
      .sort({ date: -1 });

    if (!latestMetrics) {
      return successResponse(res, {
        wasteProcessed: 0,
        co2Avoided: 0,
        womenEmployed: 0,
        templesOnboarded: 0,
        shgUnits: 0
      }, 'Public impact data retrieved successfully');
    }

    const publicData = {
      wasteProcessed: latestMetrics.waste_management.flowers_processed_kg,
      co2Avoided: latestMetrics.environmental_impact.co2_emissions_avoided_kg,
      womenEmployed: latestMetrics.social_impact.women_employed,
      templesOnboarded: latestMetrics.social_impact.temples_onboarded,
      shgUnits: latestMetrics.social_impact.shg_units_active,
      districtsActive: latestMetrics.social_impact.districts_active,
      lastUpdated: latestMetrics.date
    };

    successResponse(res, publicData, 'Public impact data retrieved successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getImpactMetrics,
  getProductTraceability,
  updateQRScan,
  getPublicImpact
};
