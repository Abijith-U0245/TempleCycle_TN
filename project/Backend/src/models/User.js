const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'shg', 'buyer', 'csr'],
    default: 'buyer',
    required: true
  },
  phone: {
    type: String,
    required: function() { return this.role !== 'csr'; },
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number']
  },
  organization: {
    type: String,
    required: function() { return this.role === 'buyer' || this.role === 'shg'; },
    trim: true
  },
  address: {
    street: String,
    city: String,
    district: String,
    state: { type: String, default: 'Tamil Nadu' },
    pincode: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  profilePicture: String
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get user profile without sensitive data
userSchema.methods.getProfile = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
