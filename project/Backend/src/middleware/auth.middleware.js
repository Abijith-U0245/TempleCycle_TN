const { verifyToken, extractTokenFromHeader } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');
const User = require('../models/User');
const inMemoryDB = require('../utils/inMemoryDB');

/**
 * Authentication middleware - verifies JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      return errorResponse(res, 'Access token is required', 401);
    }

    const decoded = verifyToken(token);
    
    // Get user from database
    let user;
    
    if (global.useInMemoryDB) {
      user = await inMemoryDB.findUserById(decoded.userId);
    } else {
      user = await User.findById(decoded.userId).select('-password');
    }
    
    if (!user || !user.isActive) {
      return errorResponse(res, 'Invalid token or user not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid token', 401);
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication for optional routes
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth
};
