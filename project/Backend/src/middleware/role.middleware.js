const { errorResponse } = require('../utils/response');

/**
 * Role-based access control middleware
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'Insufficient permissions', 403);
    }

    next();
  };
};

/**
 * Admin only middleware
 */
const adminOnly = authorize('admin');

/**
 * SHG or Admin middleware
 */
const shgOrAdmin = authorize('shg', 'admin');

/**
 * Buyer or Admin middleware
 */
const buyerOrAdmin = authorize('buyer', 'admin');

/**
 * CSR read-only access middleware
 */
const csrAccess = authorize('csr', 'admin');

/**
 * Check if user can access their own resources or is admin
 */
const ownResourceOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }

    // Admin can access everything
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user owns the resource
    const resourceUserId = req.params.userId || req.body[resourceUserIdField] || req.query[resourceUserIdField];
    
    if (req.user._id.toString() !== resourceUserId) {
      return errorResponse(res, 'Access denied: You can only access your own resources', 403);
    }

    next();
  };
};

module.exports = {
  authorize,
  adminOnly,
  shgOrAdmin,
  buyerOrAdmin,
  csrAccess,
  ownResourceOrAdmin
};
