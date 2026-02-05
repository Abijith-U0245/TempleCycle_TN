const Joi = require('joi');
const { generateToken } = require('../utils/jwt');
const { successResponse, errorResponse, validationErrorResponse } = require('../utils/response');
const inMemoryDB = require('../utils/inMemoryDB');

// Only import User model if not in in-memory mode
let User;
if (!global.useInMemoryDB) {
  User = require('../models/User');
}

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('admin', 'shg', 'buyer', 'csr').default('buyer'),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/),
  organization: Joi.string().when('role', {
    is: Joi.string().valid('buyer', 'shg'),
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    district: Joi.string(),
    state: Joi.string().default('Tamil Nadu'),
    pincode: Joi.string()
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return validationErrorResponse(res, error.details.map(d => d.message));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return errorResponse(res, 'User with this email already exists', 409);
    }

    // Create new user
    const user = new User(value);
    await user.save();

    // Generate token
    const token = generateToken({ userId: user._id, role: user.role });

    successResponse(res, {
      user: user.getProfile(),
      token
    }, 'User registered successfully', 201);

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return validationErrorResponse(res, error.details.map(d => d.message));
    }

    let user;

    // Try MongoDB first, fallback to in-memory
    if (global.useInMemoryDB) {
      user = await inMemoryDB.findUser({ email: value.email });
      
      if (!user) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      // Check password
      const bcrypt = require('bcryptjs');
      const isPasswordValid = await bcrypt.compare(value.password, user.password);
      
      if (!isPasswordValid) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      // Update last login
      user.lastLogin = new Date();
      
    } else {
      // Use MongoDB
      user = await User.findOne({ email: value.email }).select('+password');
      if (!user) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      // Check password
      const isPasswordValid = await user.comparePassword(value.password);
      if (!isPasswordValid) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      // Check if user is active
      if (!user.isActive) {
        return errorResponse(res, 'Account is deactivated', 401);
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();
    }

    // Check if user is active
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated', 401);
    }

    // Generate token
    const token = generateToken({ userId: user._id, role: user.role });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    successResponse(res, {
      user: userWithoutPassword,
      token
    }, 'Login successful');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Get current user profile
 */
const getMe = async (req, res) => {
  try {
    let user;
    
    if (global.useInMemoryDB) {
      user = await inMemoryDB.findUserById(req.user._id);
    } else {
      user = req.user;
    }
    
    successResponse(res, user, 'User profile retrieved successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res) => {
  try {
    const allowedUpdates = ['name', 'phone', 'organization', 'address', 'profilePicture'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    successResponse(res, user.getProfile(), 'Profile updated successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

/**
 * Change password
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(res, 'Current password and new password are required', 400);
    }

    if (newPassword.length < 6) {
      return errorResponse(res, 'New password must be at least 6 characters long', 400);
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    successResponse(res, null, 'Password changed successfully');

  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
};
